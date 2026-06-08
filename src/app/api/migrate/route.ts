import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { wallpapers } from "@/lib/wallpapers";
import { categorySlugs } from "@/lib/site";
import en from "@/i18n/dictionaries/en";
import th from "@/i18n/dictionaries/th";
import my from "@/i18n/dictionaries/my";
import lo from "@/i18n/dictionaries/lo";
import km from "@/i18n/dictionaries/km";
import vi from "@/i18n/dictionaries/vi";

const dicts = { en, th, my, lo, km, vi };
const SWATCH: Record<string, string> = {
  anime: "#ff9500",
  dragon: "#ff3b30",
  black: "#1c1c1e",
  amoled: "#000000",
  aesthetic: "#b388ff",
  cyberpunk: "#ff007f",
  samurai: "#ff3b30",
  oni: "#ff2d55",
  wolf: "#007aff",
  car: "#ff9500",
  nature: "#4cd964",
  space: "#5856d6",
  gaming: "#ff2d55",
  cute: "#ff8a80",
  dark: "#1c1c1e",
  fantasy: "#ffcc00",
  japanese: "#d4af37",
  neon: "#39ff14",
  supercar: "#ff3b30",
  luxury: "#d4af37",
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const clear = searchParams.get("clear") === "true";

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    if (clear) {
      // Clear all wallpaper files and records
      await connection.query("DELETE FROM user_downloads");
      await connection.query("DELETE FROM user_favorites");
      await connection.query("DELETE FROM wallpapers");

      const fs = await import("fs");
      const path = await import("path");

      // Clear generated SVGs
      const generatedDir = path.join(process.cwd(), "public", "wallpapers", "generated");
      if (fs.existsSync(generatedDir)) {
        const files = fs.readdirSync(generatedDir);
        for (const file of files) {
          if (file.endsWith(".svg")) {
            fs.unlinkSync(path.join(generatedDir, file));
          }
        }
      }

      // Clear manually uploaded files
      const uploadsDir = path.join(process.cwd(), "public", "wallpapers", "uploads");
      if (fs.existsSync(uploadsDir)) {
        const files = fs.readdirSync(uploadsDir);
        for (const file of files) {
          try {
            const filePath = path.join(uploadsDir, file);
            if (fs.statSync(filePath).isFile()) {
              fs.unlinkSync(filePath);
            }
          } catch (e) {
            console.error("Failed to delete upload file:", file, e);
          }
        }
      }

      await connection.commit();
      return NextResponse.json({ success: true, message: "All wallpapers cleared successfully" });
    }

    // 1. Create tables
    await connection.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(100) UNIQUE NOT NULL,
        swatch_color VARCHAR(20) NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS category_translations (
        category_id INT NOT NULL,
        locale VARCHAR(5) NOT NULL,
        name VARCHAR(255) NOT NULL,
        blurb TEXT NOT NULL,
        PRIMARY KEY (category_id, locale),
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS wallpapers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        category_slug VARCHAR(100) NOT NULL,
        color VARCHAR(20) NOT NULL,
        src VARCHAR(255) NOT NULL,
        width INT NOT NULL,
        height INT NOT NULL,
        downloads_count INT DEFAULT 0,
        published_at DATE NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS wallpaper_translations (
        wallpaper_id INT NOT NULL,
        locale VARCHAR(5) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        PRIMARY KEY (wallpaper_id, locale),
        FOREIGN KEY (wallpaper_id) REFERENCES wallpapers(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS wallpaper_tags (
        wallpaper_id INT NOT NULL,
        tag VARCHAR(100) NOT NULL,
        PRIMARY KEY (wallpaper_id, tag),
        FOREIGN KEY (wallpaper_id) REFERENCES wallpapers(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL DEFAULT 'member',
        current_session_token VARCHAR(255) NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS rate_limit_attempts (
        ip VARCHAR(45) NOT NULL,
        action VARCHAR(50) NOT NULL,
        attempt_count INT DEFAULT 1,
        last_attempt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (ip, action)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS user_downloads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        wallpaper_slug VARCHAR(255) NOT NULL,
        downloaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS user_favorites (
        user_id INT NOT NULL,
        wallpaper_slug VARCHAR(255) NOT NULL,
        favorited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (user_id, wallpaper_slug),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 2. Seed categories
    for (const slug of categorySlugs) {
      const swatch = SWATCH[slug] || null;
      await connection.query(
        `INSERT INTO categories (slug, swatch_color) VALUES (?, ?) ON DUPLICATE KEY UPDATE swatch_color = VALUES(swatch_color)`,
        [slug, swatch]
      );
      
      const [catRows] = await connection.query(`SELECT id FROM categories WHERE slug = ?`, [slug]);
      const catId = (catRows as any)[0].id;

      for (const [locale, dict] of Object.entries(dicts)) {
        const catInfo = (dict as any).categories[slug];
        if (catInfo) {
          await connection.query(
            `INSERT INTO category_translations (category_id, locale, name, blurb) VALUES (?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE name = VALUES(name), blurb = VALUES(blurb)`,
            [catId, locale, catInfo.name, catInfo.blurb]
          );
        }
      }
    }

    // 3. Seed wallpapers
    for (const wp of wallpapers) {
      await connection.query(
        `INSERT INTO wallpapers (slug, category_slug, color, src, width, height, downloads_count, published_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE category_slug = VALUES(category_slug), color = VALUES(color), src = VALUES(src),
                                 width = VALUES(width), height = VALUES(height), downloads_count = VALUES(downloads_count),
                                 published_at = VALUES(published_at)`,
        [wp.slug, wp.category, wp.color, wp.src, wp.width, wp.height, wp.downloads, wp.published]
      );

      const [wpRows] = await connection.query(`SELECT id FROM wallpapers WHERE slug = ?`, [wp.slug]);
      const wpId = (wpRows as any)[0].id;

      // Seed translations
      for (const [locale, descText] of Object.entries(wp.desc)) {
        await connection.query(
          `INSERT INTO wallpaper_translations (wallpaper_id, locale, title, description)
           VALUES (?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description)`,
          [wpId, locale, wp.title, descText]
        );
      }

      // Seed tags
      for (const tag of wp.tags) {
        await connection.query(
          `INSERT IGNORE INTO wallpaper_tags (wallpaper_id, tag) VALUES (?, ?)`,
          [wpId, tag]
        );
      }
    }

    await connection.commit();
    return NextResponse.json({ success: true, message: "Database tables created and seeded successfully" });
  } catch (err: any) {
    await connection.rollback();
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  } finally {
    connection.release();
  }
}
