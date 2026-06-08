import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const locale = searchParams.get("locale") || "en";

    const [rows] = await pool.query(
      `SELECT d.wallpaper_slug as slug, d.downloaded_at as date, w.src, w.category_slug as category,
              COALESCE(t.title, t_en.title, 'Untitled') as title
       FROM user_downloads d
       JOIN wallpapers w ON w.slug = d.wallpaper_slug
       LEFT JOIN wallpaper_translations t ON t.wallpaper_id = w.id AND t.locale = ?
       LEFT JOIN wallpaper_translations t_en ON t_en.wallpaper_id = w.id AND t_en.locale = 'en'
       WHERE d.user_id = ?
       ORDER BY d.downloaded_at DESC`,
      [locale, user.id]
    );

    return NextResponse.json({ success: true, downloads: rows });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { slug } = await req.json();
    if (!slug) {
      return NextResponse.json({ error: "Wallpaper slug is required" }, { status: 400 });
    }

    // 1. Increment total downloads count in database
    await pool.query(
      "UPDATE wallpapers SET downloads_count = downloads_count + 1 WHERE slug = ?",
      [slug]
    );

    // 2. If user is authenticated, log in user_downloads history
    const user = await getSessionUser();
    if (user) {
      await pool.query(
        "INSERT INTO user_downloads (user_id, wallpaper_slug) VALUES (?, ?)",
        [user.id, slug]
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
