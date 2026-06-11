import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { isSafeSlug, serverErrorResponse } from "@/lib/api-response";

export async function GET(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const locale = searchParams.get("locale") || "en";

    const [rows] = await pool.query(
      `SELECT f.wallpaper_slug as slug, w.category_slug as category,
              COALESCE(t.title, t_en.title, 'Untitled') as title
       FROM user_favorites f
       JOIN wallpapers w ON w.slug = f.wallpaper_slug
       LEFT JOIN wallpaper_translations t ON t.wallpaper_id = w.id AND t.locale = ?
       LEFT JOIN wallpaper_translations t_en ON t_en.wallpaper_id = w.id AND t_en.locale = 'en'
       WHERE f.user_id = ?
       ORDER BY f.favorited_at DESC`,
      [locale, user.id]
    );

    return NextResponse.json({ success: true, favorites: rows });
  } catch (err: any) {
    console.error("Favorites list error:", err);
    return serverErrorResponse(err.message);
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await req.json();
    if (!slug || !isSafeSlug(slug)) {
      return NextResponse.json({ error: "Wallpaper slug is required" }, { status: 400 });
    }

    await pool.query(
      "INSERT IGNORE INTO user_favorites (user_id, wallpaper_slug) VALUES (?, ?)",
      [user.id, slug]
    );

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Favorite add error:", err);
    return serverErrorResponse(err.message);
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    if (!slug || !isSafeSlug(slug)) {
      return NextResponse.json({ error: "Wallpaper slug is required" }, { status: 400 });
    }

    await pool.query(
      "DELETE FROM user_favorites WHERE user_id = ? AND wallpaper_slug = ?",
      [user.id, slug]
    );

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Favorite delete error:", err);
    return serverErrorResponse(err.message);
  }
}
