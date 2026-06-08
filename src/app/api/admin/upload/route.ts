import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import sharp from "sharp";

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

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const ext = path.extname(file.name).toLowerCase() || ".png";
    const allowedExts = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"]);

    if (!allowedExts.has(ext)) {
      return NextResponse.json({ error: "Unsupported image type" }, { status: 400 });
    }

    let metadata: Partial<sharp.Metadata> = {};
    try {
      metadata = await sharp(buffer, { animated: ext === ".gif" }).metadata();
    } catch {
      return NextResponse.json({ error: "Uploaded file is not a valid image" }, { status: 400 });
    }

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), "public", "wallpapers", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Clean up filename and make it unique
    const originalName = file.name;
    const randomHex = crypto.randomBytes(4).toString("hex");
    const nameWithoutExt = path.basename(originalName, ext)
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-") // sanitize
      .replace(/-+/g, "-");
    
    const filename = `${nameWithoutExt}-${randomHex}${ext}`;
    const filePath = path.join(uploadDir, filename);

    // Save file to public/wallpapers/uploads/
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/wallpapers/uploads/${filename}`;
    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      ext,
      width: metadata.width || 1080,
      height: metadata.height || 2340,
      format: metadata.format || ext.replace(".", ""),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
