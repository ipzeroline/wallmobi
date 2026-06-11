import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import path from "path";
import crypto from "crypto";
import sharp from "sharp";
import { isCloudinaryConfigured, uploadImageToCloudinary } from "@/lib/cloudinary";
import { serverErrorResponse } from "@/lib/api-response";

function mimeTypeFromExt(ext: string) {
  if (ext === ".png") return "image/png";
  if (ext === ".gif") return "image/gif";
  if (ext === ".webp") return "image/webp";
  return "image/jpeg";
}

const maxUploadBytes = Math.max(1024 * 1024, parseInt(process.env.ADMIN_UPLOAD_MAX_BYTES || String(15 * 1024 * 1024), 10) || 15 * 1024 * 1024);

export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user || (user.role !== "super_admin" && user.role !== "staff")) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    if (file.size > maxUploadBytes) {
      return NextResponse.json({ error: "Uploaded file is too large" }, { status: 413 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const ext = path.extname(file.name).toLowerCase() || ".png";
    const allowedExts = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

    if (!allowedExts.has(ext)) {
      return NextResponse.json({ error: "Unsupported image type" }, { status: 400 });
    }

    let metadata: Partial<sharp.Metadata> = {};
    try {
      metadata = await sharp(buffer, { animated: ext === ".gif" }).metadata();
    } catch {
      return NextResponse.json({ error: "Uploaded file is not a valid image" }, { status: 400 });
    }

    if (!isCloudinaryConfigured()) {
      return NextResponse.json(
        { error: "CDN upload is not configured. Please set Cloudinary environment variables before uploading images." },
        { status: 503 }
      );
    }

    // Clean up filename and make it unique
    const originalName = file.name;
    const randomHex = crypto.randomBytes(4).toString("hex");
    const nameWithoutExt = path.basename(originalName, ext)
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-") // sanitize
      .replace(/-+/g, "-");
    
    const filename = `${nameWithoutExt}-${randomHex}${ext}`;

    const uploaded = await uploadImageToCloudinary({
      buffer,
      filename,
      mimeType: mimeTypeFromExt(ext),
    });

    return NextResponse.json({
      success: true,
      url: uploaded.secure_url,
      filename,
      ext,
      storage: "cloudinary",
      cloudinaryPublicId: uploaded.public_id,
      width: metadata.width || 1080,
      height: metadata.height || 2340,
      format: metadata.format || ext.replace(".", ""),
    });
  } catch (err: any) {
    console.error("Admin upload error:", err);
    return serverErrorResponse(err.message);
  }
}
