import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import pool from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import sharp from "sharp";

function watermarkSvg(svgContent: string, text: string): string {
  const closingSvgIndex = svgContent.lastIndexOf("</svg>");
  if (closingSvgIndex === -1) return svgContent;

  const watermarkElement = `
    <g style="pointer-events:none;">
      <style>
        .svg-watermark {
          fill: rgba(128, 128, 128, 0.25);
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 56px;
          font-weight: bold;
        }
      </style>
      <text x="50%" y="48%" text-anchor="middle" dominant-baseline="middle" transform="rotate(-30, 200, 200)" class="svg-watermark">${text}</text>
      <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" font-size="24" fill="rgba(128, 128, 128, 0.18)">FREE PREVIEW - WALLMOBI.COM</text>
    </g>
  `;
  
  return svgContent.slice(0, closingSvgIndex) + watermarkElement + svgContent.slice(closingSvgIndex);
}

async function watermarkBinary(buffer: Buffer, text: string): Promise<Buffer> {
  const image = sharp(buffer);
  const metadata = await image.metadata();
  const width = metadata.width || 1080;
  const height = metadata.height || 1920;

  const svgOverlay = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <style>
        .watermark {
          fill: rgba(255, 255, 255, 0.22);
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: ${Math.floor(width * 0.065)}px;
          font-weight: bold;
          text-anchor: middle;
          dominant-baseline: middle;
        }
        .watermark-sub {
          fill: rgba(255, 255, 255, 0.15);
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: ${Math.floor(width * 0.035)}px;
          text-anchor: middle;
          dominant-baseline: middle;
        }
      </style>
      <g transform="rotate(-35, ${width / 2}, ${height / 2})">
        <text x="${width / 2}" y="${height / 2}" class="watermark">${text}</text>
        <text x="${width / 2}" y="${height / 2 + Math.floor(width * 0.08)}" class="watermark-sub">FREE PREVIEW - WALLMOBI.COM</text>
      </g>
    </svg>
  `;

  return image
    .composite([
      {
        input: Buffer.from(svgOverlay),
        top: 0,
        left: 0,
      },
    ])
    .toBuffer();
}

export async function GET(req: Request) {
  try {
    // 1. Check user authentication
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isPremium = user.role === "premium" || user.role === "super_admin" || user.role === "staff";

    // 2. Get the slug from query parameters
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    // 3. Find the wallpaper in the database to get its `src`
    const [rows] = await pool.query(
      "SELECT src FROM wallpapers WHERE slug = ? LIMIT 1",
      [slug]
    );

    const wallpapers = rows as any[];
    if (wallpapers.length === 0) {
      return NextResponse.json({ error: "Wallpaper not found" }, { status: 404 });
    }

    const { src } = wallpapers[0];

    // 4. Log the download in user_downloads and increment downloads_count
    await pool.query(
      "UPDATE wallpapers SET downloads_count = downloads_count + 1 WHERE slug = ?",
      [slug]
    );

    await pool.query(
      "INSERT INTO user_downloads (user_id, wallpaper_slug) VALUES (?, ?)",
      [user.id, slug]
    );

    // 5. Serve the file (either local file or external Cloudinary URL)
    const filename = src.split("/").pop() || `${slug}.png`;
    const isLocal = src.startsWith("/");

    if (isLocal) {
      const filePath = path.join(process.cwd(), "public", src);
      if (!fs.existsSync(filePath)) {
        return NextResponse.json({ error: "File not found on disk" }, { status: 404 });
      }

      let fileBuffer: any = fs.readFileSync(filePath);
      const isSvg = src.endsWith(".svg");
      const contentType = isSvg ? "image/svg+xml" : "image/png";

      if (!isPremium) {
        if (isSvg) {
          const svgText = fileBuffer.toString("utf-8");
          fileBuffer = Buffer.from(watermarkSvg(svgText, "WALLMOBI.COM"));
        } else {
          fileBuffer = await watermarkBinary(fileBuffer, "WALLMOBI.COM");
        }
      }

      return new NextResponse(fileBuffer, {
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": `attachment; filename="${filename}"`,
        },
      });
    } else {
      // Remote URL (Cloudinary)
      const res = await fetch(src);
      if (!res.ok) {
        return NextResponse.json({ error: "Failed to fetch remote image" }, { status: 502 });
      }

      const contentType = res.headers.get("content-type") || "image/png";
      const blob = await res.blob();
      const arrayBuffer = await blob.arrayBuffer();
      let buffer: any = Buffer.from(arrayBuffer);

      if (!isPremium) {
        if (contentType.includes("svg")) {
          const svgText = buffer.toString("utf-8");
          buffer = Buffer.from(watermarkSvg(svgText, "WALLMOBI.COM"));
        } else {
          buffer = await watermarkBinary(buffer, "WALLMOBI.COM");
        }
      }

      return new NextResponse(buffer, {
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": `attachment; filename="${filename}"`,
        },
      });
    }
  } catch (err: any) {
    console.error("Secure download error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
