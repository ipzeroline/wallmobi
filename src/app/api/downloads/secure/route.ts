import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { canViewOriginalImage } from "@/lib/watermark";
import { getWallpaperSource, maybeWatermarkImage, readWallpaperImage } from "@/lib/wallpaper-image";
import { isSafeSlug, serverErrorResponse } from "@/lib/api-response";

export async function GET(req: Request) {
  try {
    // 1. Check user authentication. Guests receive a watermarked file; members receive the original.
    const user = await getSessionUser();

    // 2. Get the slug from query parameters
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }
    if (!isSafeSlug(slug)) {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }

    // 3. Find the wallpaper in the database to get its `src`
    const src = await getWallpaperSource(slug);
    if (!src) {
      return NextResponse.json({ error: "Wallpaper not found" }, { status: 404 });
    }

    // 4. Log the download in user_downloads and increment downloads_count
    await pool.query(
      "UPDATE wallpapers SET downloads_count = downloads_count + 1 WHERE slug = ?",
      [slug]
    );

    if (user) {
      await pool.query(
        "INSERT INTO user_downloads (user_id, wallpaper_slug) VALUES (?, ?)",
        [user.id, slug]
      );
    }

    // 5. Serve the file (either local file or external Cloudinary URL)
    const image = await readWallpaperImage(src);
    if (!image) {
      return NextResponse.json({ error: "File not found on disk" }, { status: 404 });
    }

    const fileBuffer = await maybeWatermarkImage(image.buffer, image.contentType, !canViewOriginalImage(user));

    return new NextResponse(new Uint8Array(fileBuffer), {
      headers: {
        "Content-Type": image.contentType,
        "Content-Disposition": `attachment; filename="${image.filename}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (err: any) {
    console.error("Secure download error:", err);
    return serverErrorResponse(err.message);
  }
}
