import crypto from "crypto";

type CloudinaryUploadResult = {
  secure_url: string;
  public_id: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
};

export function isCloudinaryConfigured() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );
}

function signUploadParams(params: Record<string, string | number | boolean>) {
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!apiSecret) throw new Error("CLOUDINARY_API_SECRET is not configured");

  const payload = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return crypto.createHash("sha1").update(`${payload}${apiSecret}`).digest("hex");
}

export async function uploadImageToCloudinary({
  buffer,
  filename,
  mimeType,
}: {
  buffer: Buffer;
  filename: string;
  mimeType: string;
}) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;

  if (!cloudName || !apiKey || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error("Cloudinary environment variables are not configured");
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = process.env.CLOUDINARY_UPLOAD_FOLDER || "wallmobi/wallpapers/uploads";
  const publicId = filename.replace(/\.[a-zA-Z0-9]+$/, "");
  const params = {
    folder,
    overwrite: false,
    public_id: publicId,
    timestamp,
  };

  const formData = new FormData();
  formData.append("file", `data:${mimeType};base64,${buffer.toString("base64")}`);
  formData.append("api_key", apiKey);
  formData.append("folder", folder);
  formData.append("overwrite", "false");
  formData.append("public_id", publicId);
  formData.append("timestamp", String(timestamp));
  formData.append("signature", signUploadParams(params));

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });

  const data = (await res.json()) as CloudinaryUploadResult & { error?: { message?: string } };
  if (!res.ok) {
    throw new Error(data.error?.message || "Cloudinary upload failed");
  }

  return data;
}
