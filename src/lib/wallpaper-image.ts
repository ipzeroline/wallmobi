import fs from "fs";
import path from "path";
import sharp from "sharp";
import pool from "@/lib/db";
import { watermarkBinary, watermarkSvg } from "@/lib/watermark";
import { imageExtension, imageMimeType } from "@/lib/wallpaper-url";

const sourceCacheTtlMs = Math.max(1000, parseInt(process.env.WALLPAPER_SOURCE_CACHE_TTL_MS || "300000", 10) || 300000);
const sourceCacheMaxEntries = Math.max(100, parseInt(process.env.WALLPAPER_SOURCE_CACHE_MAX || "5000", 10) || 5000);
const sourceCache = new Map<string, { src?: string; expiresAt: number }>();

export async function getWallpaperSource(slug: string) {
  const now = Date.now();
  const cached = sourceCache.get(slug);
  if (cached && cached.expiresAt > now) {
    return cached.src;
  }

  const [rows] = await pool.query("SELECT src FROM wallpapers WHERE slug = ? LIMIT 1", [slug]);
  const wallpaper = (rows as any[])[0];
  const src = wallpaper?.src as string | undefined;

  if (sourceCache.size >= sourceCacheMaxEntries) {
    const oldestKey = sourceCache.keys().next().value;
    if (oldestKey) sourceCache.delete(oldestKey);
  }
  sourceCache.set(slug, { src, expiresAt: now + sourceCacheTtlMs });

  return src;
}

export async function readWallpaperImage(src: string) {
  const filename = src.split("/").pop() || `wallpaper${imageExtension(src)}`;

  if (src.startsWith("/")) {
    const normalizedSrc = path.posix.normalize(src);
    if (!normalizedSrc.startsWith("/wallpapers/")) {
      throw new Error("Invalid wallpaper source");
    }

    const filePath = path.join(process.cwd(), "public", normalizedSrc);
    const publicRoot = path.join(process.cwd(), "public", "wallpapers");
    const resolvedPath = path.resolve(filePath);
    if (!resolvedPath.startsWith(path.resolve(publicRoot))) {
      throw new Error("Invalid wallpaper path");
    }

    if (!fs.existsSync(resolvedPath)) {
      return null;
    }

    return {
      buffer: fs.readFileSync(resolvedPath),
      filename,
      contentType: imageMimeType(src),
    };
  }

  const res = await fetch(src);
  if (!res.ok) {
    throw new Error("Failed to fetch remote image");
  }

  const arrayBuffer = await res.arrayBuffer();
  return {
    buffer: Buffer.from(arrayBuffer),
    filename,
    contentType: res.headers.get("content-type") || imageMimeType(src),
  };
}

export async function maybeWatermarkImage(buffer: Buffer, contentType: string, shouldWatermark: boolean) {
  if (!shouldWatermark) return buffer;
  if (contentType.includes("svg")) {
    return Buffer.from(watermarkSvg(buffer.toString("utf-8"), "WALLMOBI.COM"));
  }
  return watermarkBinary(buffer, "WALLMOBI.COM");
}

export async function resizeWallpaperImage(buffer: Buffer, contentType: string, width?: number) {
  if (!width || contentType.includes("svg")) return { buffer, contentType };
  const safeWidth = Math.min(2160, Math.max(120, Math.round(width)));

  const resized = await sharp(buffer, { animated: contentType.includes("gif") })
    .resize({ width: safeWidth, withoutEnlargement: true })
    .webp({ quality: 82, effort: 4 })
    .toBuffer();

  return { buffer: resized, contentType: "image/webp" };
}
