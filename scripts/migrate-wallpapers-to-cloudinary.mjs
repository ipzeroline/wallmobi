import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import mysql from "mysql2/promise";

const root = process.cwd();
const apply = process.argv.includes("--apply");

function loadEnvFile(file) {
  if (!fs.existsSync(file)) return;
  const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const index = trimmed.indexOf("=");
    const key = trimmed.slice(0, index).trim();
    const value = trimmed
      .slice(index + 1)
      .trim()
      .replace(/^["']|["']$/g, "")
      .replace(/\\([\\$`"'])/g, "$1");
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile(path.join(root, ".env.local"));

const required = [
  "DB_HOST",
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

const missing = required.filter((key) => !process.env[key]);
if (missing.length) {
  console.error(`Missing environment variables: ${missing.join(", ")}`);
  process.exit(1);
}

function mimeTypeFromExt(ext) {
  if (ext === ".png") return "image/png";
  if (ext === ".gif") return "image/gif";
  if (ext === ".svg") return "image/svg+xml";
  if (ext === ".webp") return "image/webp";
  return "image/jpeg";
}

function signUploadParams(params) {
  const payload = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return crypto
    .createHash("sha1")
    .update(`${payload}${process.env.CLOUDINARY_API_SECRET}`)
    .digest("hex");
}

async function uploadLocalFile(src, slug) {
  const relativeSrc = src.replace(/^\/+/, "");
  const filePath = path.join(root, "public", relativeSrc);
  if (!fs.existsSync(filePath)) {
    return { skipped: true, reason: "missing local file" };
  }

  const ext = path.extname(filePath).toLowerCase();
  const buffer = fs.readFileSync(filePath);
  const timestamp = Math.floor(Date.now() / 1000);
  const folder = process.env.CLOUDINARY_UPLOAD_FOLDER || "wallmobi/wallpapers/uploads";
  const publicId = `${slug}-${crypto.randomBytes(3).toString("hex")}`;
  const params = {
    folder,
    overwrite: false,
    public_id: publicId,
    timestamp,
  };

  const formData = new FormData();
  formData.append("file", `data:${mimeTypeFromExt(ext)};base64,${buffer.toString("base64")}`);
  formData.append("api_key", process.env.CLOUDINARY_API_KEY);
  formData.append("folder", folder);
  formData.append("overwrite", "false");
  formData.append("public_id", publicId);
  formData.append("timestamp", String(timestamp));
  formData.append("signature", signUploadParams(params));

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error?.message || "Cloudinary upload failed");
  }

  return { secureUrl: data.secure_url, publicId: data.public_id };
}

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT || 3306),
});

try {
  const [rows] = await connection.query(
    "SELECT id, slug, src FROM wallpapers WHERE src NOT LIKE 'http://%' AND src NOT LIKE 'https://%' ORDER BY id ASC"
  );

  console.log(`Mode: ${apply ? "apply" : "dry-run"}`);
  console.log(`Local wallpapers found: ${rows.length}`);

  let uploaded = 0;
  let skipped = 0;
  for (const row of rows) {
    const label = `#${row.id} ${row.slug}`;
    if (!apply) {
      console.log(`[dry-run] ${label}: ${row.src}`);
      continue;
    }

    try {
      const result = await uploadLocalFile(row.src, row.slug);
      if (result.skipped) {
        skipped += 1;
        console.log(`[skip] ${label}: ${result.reason}`);
        continue;
      }

      await connection.query("UPDATE wallpapers SET src = ? WHERE id = ? AND src = ?", [
        result.secureUrl,
        row.id,
        row.src,
      ]);
      uploaded += 1;
      console.log(`[ok] ${label}: ${result.secureUrl}`);
    } catch (error) {
      skipped += 1;
      console.error(`[error] ${label}: ${error.message}`);
    }
  }

  console.log(`Done. Uploaded: ${uploaded}. Skipped/errors: ${skipped}.`);
  if (!apply) {
    console.log("Run with --apply to upload and update DB. Local files will not be deleted.");
  }
} finally {
  await connection.end();
}
