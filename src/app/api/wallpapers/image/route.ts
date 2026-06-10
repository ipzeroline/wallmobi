import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { canViewOriginalImage } from "@/lib/watermark";
import { getWallpaperSource, maybeWatermarkImage, readWallpaperImage, resizeWallpaperImage } from "@/lib/wallpaper-image";
import { isSafeSlug, serverErrorResponse } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }
    if (!isSafeSlug(slug)) {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }
    const widthParam = searchParams.get("w");
    const requestedWidth = widthParam ? parseInt(widthParam, 10) : undefined;

    const src = await getWallpaperSource(slug);
    if (!src) {
      return NextResponse.json({ error: "Wallpaper not found" }, { status: 404 });
    }

    const image = await readWallpaperImage(src);
    if (!image) {
      return NextResponse.json({ error: "File not found on disk" }, { status: 404 });
    }

    const user = await getSessionUser();
    const resized = await resizeWallpaperImage(image.buffer, image.contentType, requestedWidth);
    const buffer = await maybeWatermarkImage(resized.buffer, resized.contentType, !canViewOriginalImage(user));

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": resized.contentType,
        "Cache-Control": user ? "private, no-store" : "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
        "X-Robots-Tag": "noindex",
      },
    });
  } catch (err: any) {
    console.error("Wallpaper image error:", err);
    return serverErrorResponse(err.message);
  }
}
