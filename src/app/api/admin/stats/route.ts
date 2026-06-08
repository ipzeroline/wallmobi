import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user || (user.role !== "super_admin" && user.role !== "staff")) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const [wpCount] = await pool.query("SELECT COUNT(*) as count FROM wallpapers");
    const [userCount] = await pool.query("SELECT COUNT(*) as count FROM users");
    const [dlCount] = await pool.query("SELECT COUNT(*) as count FROM user_downloads");
    const [favCount] = await pool.query("SELECT COUNT(*) as count FROM user_favorites");

    const [topDownloaded] = await pool.query(
      "SELECT slug, downloads_count, src FROM wallpapers ORDER BY downloads_count DESC LIMIT 5"
    );

    return NextResponse.json({
      stats: {
        totalWallpapers: (wpCount as any)[0].count,
        totalUsers: (userCount as any)[0].count,
        totalDownloads: (dlCount as any)[0].count,
        totalFavorites: (favCount as any)[0].count,
      },
      topDownloaded,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
