import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import pool from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    // 1. Check user authentication
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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

      const fileBuffer = fs.readFileSync(filePath);
      const contentType = src.endsWith(".svg") ? "image/svg+xml" : "image/png";

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
      const buffer = Buffer.from(arrayBuffer);

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
