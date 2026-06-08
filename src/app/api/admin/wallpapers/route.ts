import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user || (user.role !== "super_admin" && user.role !== "staff")) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const locale = searchParams.get("locale") || "en";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20", 10) || 20));
    const offset = (page - 1) * limit;
    const category = searchParams.get("category") || "all";
    const query = (searchParams.get("q") || "").trim();

    const where: string[] = [];
    const params: any[] = [locale];

    if (category !== "all") {
      where.push("w.category_slug = ?");
      params.push(category);
    }

    if (query) {
      where.push(`(
        w.slug LIKE ? OR
        COALESCE(t.title, ten.title, '') LIKE ?
      )`);
      params.push(`%${query}%`, `%${query}%`);
    }

    const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

    const [rows] = await pool.query(
      `SELECT w.id, w.slug, w.category_slug, w.color, w.src, w.downloads_count, w.published_at, 
              COALESCE(t.title, ten.title) as title
       FROM wallpapers w
       LEFT JOIN wallpaper_translations t ON t.wallpaper_id = w.id AND t.locale = ?
       LEFT JOIN wallpaper_translations ten ON ten.wallpaper_id = w.id AND ten.locale = 'en'
       ${whereSql}
       ORDER BY w.id DESC
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    const [countRows] = await pool.query(
      `SELECT COUNT(*) as total
       FROM wallpapers w
       LEFT JOIN wallpaper_translations t ON t.wallpaper_id = w.id AND t.locale = ?
       LEFT JOIN wallpaper_translations ten ON ten.wallpaper_id = w.id AND ten.locale = 'en'
       ${whereSql}`,
      params
    );
    const total = Number((countRows as any[])[0]?.total || 0);

    return NextResponse.json({
      wallpapers: rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user || (user.role !== "super_admin" && user.role !== "staff")) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const body = await req.json();
    const { category_slug, count } = body;

    // Check if it is an automated wallpaper generation request
    if (count && category_slug) {
      const parsedCount = parseInt(count, 10);
      if (isNaN(parsedCount) || parsedCount <= 0 || parsedCount > 50) {
        return NextResponse.json({ error: "Count must be between 1 and 50" }, { status: 400 });
      }

      const connection = await pool.getConnection();
      try {
        await connection.beginTransaction();
        const { generateWallpapers } = await import("@/lib/generator");
        const result = await generateWallpapers(connection, category_slug, parsedCount);
        await connection.commit();
        return NextResponse.json({ success: true, count: result.createdCount });
      } catch (err: any) {
        await connection.rollback();
        return NextResponse.json({ error: err.message }, { status: 400 });
      } finally {
        connection.release();
      }
    }

    // Otherwise, fall back to manual single wallpaper creation
    const { slug, color, src, width, height, title, descriptions, tags } = body;

    if (!slug || !category_slug || !color || !src || !title || !descriptions) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // Check if wallpaper exists
      const [existing] = await connection.query("SELECT id FROM wallpapers WHERE slug = ?", [slug]);
      if ((existing as any).length > 0) {
        throw new Error("Wallpaper with this slug already exists");
      }
      const [existingTitle] = await connection.query(
        "SELECT wallpaper_id FROM wallpaper_translations WHERE LOWER(title) = LOWER(?) LIMIT 1",
        [title]
      );
      if ((existingTitle as any).length > 0) {
        throw new Error("Wallpaper with this title already exists");
      }

      // Insert wallpaper
      const widthVal = width || 1080;
      const heightVal = height || 2340;
      const pubDate = new Date().toISOString().split("T")[0];

      const [wpResult] = await connection.query(
        `INSERT INTO wallpapers (slug, category_slug, color, src, width, height, published_at) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [slug, category_slug, color, src, widthVal, heightVal, pubDate]
      );
      const wpId = (wpResult as any).insertId;

      // Insert translations for all supported locales: en, th, my, lo, km, vi
      const locales = ["en", "th", "my", "lo", "km", "vi"];
      for (const loc of locales) {
        const descText = descriptions[loc] || descriptions["en"] || "High resolution wallpaper";
        const titleText = title; // Use same title across locales for consistency
        await connection.query(
          `INSERT INTO wallpaper_translations (wallpaper_id, locale, title, description) VALUES (?, ?, ?, ?)`,
          [wpId, loc, titleText, descText]
        );
      }

      // Insert tags
      if (tags && Array.isArray(tags)) {
        for (const tag of tags) {
          if (tag.trim()) {
            await connection.query(
              `INSERT IGNORE INTO wallpaper_tags (wallpaper_id, tag) VALUES (?, ?)`,
              [wpId, tag.trim()]
            );
          }
        }
      }

      await connection.commit();
      return NextResponse.json({ success: true });
    } catch (err: any) {
      await connection.rollback();
      return NextResponse.json({ error: err.message }, { status: 400 });
    } finally {
      connection.release();
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user || (user.role !== "super_admin" && user.role !== "staff")) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Wallpaper ID required" }, { status: 400 });
    }

    await pool.query("DELETE FROM wallpapers WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
