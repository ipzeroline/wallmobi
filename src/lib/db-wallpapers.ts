import pool from "./db";
import { type Locale } from "@/i18n/config";
import { type Wallpaper } from "./wallpapers";

export async function getDbWallpapers(locale: Locale): Promise<Wallpaper[]> {
  try {
    const [rows] = await pool.query(
      `SELECT w.id, w.slug, w.category_slug as category, w.color, w.src, w.width, w.height, w.downloads_count as downloads, DATE_FORMAT(w.published_at, '%Y-%m-%d') as published,
              COALESCE(t.title, t_en.title, 'Untitled') as title,
              COALESCE(t.description, t_en.description, '') as description,
              GROUP_CONCAT(tg.tag) as tags_string
       FROM wallpapers w
       LEFT JOIN wallpaper_translations t ON t.wallpaper_id = w.id AND t.locale = ?
       LEFT JOIN wallpaper_translations t_en ON t_en.wallpaper_id = w.id AND t_en.locale = 'en'
       LEFT JOIN wallpaper_tags tg ON tg.wallpaper_id = w.id
       GROUP BY w.id
       ORDER BY w.published_at DESC, w.id DESC`,
      [locale]
    );

    return (rows as any[]).map((r) => ({
      slug: r.slug,
      title: r.title,
      category: r.category as any,
      color: r.color,
      src: r.src,
      width: r.width,
      height: r.height,
      downloads: r.downloads,
      published: r.published,
      tags: r.tags_string ? r.tags_string.split(",") : [],
      desc: {
        [locale]: r.description
      } as any
    }));
  } catch (err) {
    console.error("Error fetching db wallpapers:", err);
    return [];
  }
}

export async function getDbTrending(locale: Locale, limit = 6): Promise<Wallpaper[]> {
  try {
    const [rows] = await pool.query(
      `SELECT w.id, w.slug, w.category_slug as category, w.color, w.src, w.width, w.height, w.downloads_count as downloads, DATE_FORMAT(w.published_at, '%Y-%m-%d') as published,
              COALESCE(t.title, t_en.title, 'Untitled') as title,
              COALESCE(t.description, t_en.description, '') as description,
              GROUP_CONCAT(tg.tag) as tags_string
       FROM wallpapers w
       LEFT JOIN wallpaper_translations t ON t.wallpaper_id = w.id AND t.locale = ?
       LEFT JOIN wallpaper_translations t_en ON t_en.wallpaper_id = w.id AND t_en.locale = 'en'
       LEFT JOIN wallpaper_tags tg ON tg.wallpaper_id = w.id
       GROUP BY w.id
       ORDER BY w.downloads_count DESC, w.id DESC
       LIMIT ?`,
      [locale, limit]
    );

    return (rows as any[]).map((r) => ({
      slug: r.slug,
      title: r.title,
      category: r.category as any,
      color: r.color,
      src: r.src,
      width: r.width,
      height: r.height,
      downloads: r.downloads,
      published: r.published,
      tags: r.tags_string ? r.tags_string.split(",") : [],
      desc: {
        [locale]: r.description
      } as any
    }));
  } catch (err) {
    console.error("Error fetching db trending:", err);
    return [];
  }
}

export async function getDbWallpaper(slug: string, locale: Locale): Promise<Wallpaper | null> {
  try {
    const [rows] = await pool.query(
      `SELECT w.id, w.slug, w.category_slug as category, w.color, w.src, w.width, w.height, w.downloads_count as downloads, DATE_FORMAT(w.published_at, '%Y-%m-%d') as published,
              COALESCE(t.title, t_en.title, 'Untitled') as title,
              COALESCE(t.description, t_en.description, '') as description,
              GROUP_CONCAT(tg.tag) as tags_string
       FROM wallpapers w
       LEFT JOIN wallpaper_translations t ON t.wallpaper_id = w.id AND t.locale = ?
       LEFT JOIN wallpaper_translations t_en ON t_en.wallpaper_id = w.id AND t_en.locale = 'en'
       LEFT JOIN wallpaper_tags tg ON tg.wallpaper_id = w.id
       WHERE w.slug = ?
       GROUP BY w.id
       LIMIT 1`,
      [locale, slug]
    );

    const arr = rows as any[];
    if (arr.length === 0) return null;
    const r = arr[0];
    return {
      slug: r.slug,
      title: r.title,
      category: r.category as any,
      color: r.color,
      src: r.src,
      width: r.width,
      height: r.height,
      downloads: r.downloads,
      published: r.published,
      tags: r.tags_string ? r.tags_string.split(",") : [],
      desc: {
        [locale]: r.description
      } as any
    };
  } catch (err) {
    console.error("Error fetching db wallpaper:", err);
    return null;
  }
}

export async function getDbByCategory(category: string, locale: Locale): Promise<Wallpaper[]> {
  try {
    const [rows] = await pool.query(
      `SELECT w.id, w.slug, w.category_slug as category, w.color, w.src, w.width, w.height, w.downloads_count as downloads, DATE_FORMAT(w.published_at, '%Y-%m-%d') as published,
              COALESCE(t.title, t_en.title, 'Untitled') as title,
              COALESCE(t.description, t_en.description, '') as description,
              GROUP_CONCAT(tg.tag) as tags_string
       FROM wallpapers w
       LEFT JOIN wallpaper_translations t ON t.wallpaper_id = w.id AND t.locale = ?
       LEFT JOIN wallpaper_translations t_en ON t_en.wallpaper_id = w.id AND t_en.locale = 'en'
       LEFT JOIN wallpaper_tags tg ON tg.wallpaper_id = w.id
       WHERE w.category_slug = ?
       GROUP BY w.id
       ORDER BY w.published_at DESC, w.id DESC`,
      [locale, category]
    );

    return (rows as any[]).map((r) => ({
      slug: r.slug,
      title: r.title,
      category: r.category as any,
      color: r.color,
      src: r.src,
      width: r.width,
      height: r.height,
      downloads: r.downloads,
      published: r.published,
      tags: r.tags_string ? r.tags_string.split(",") : [],
      desc: {
        [locale]: r.description
      } as any
    }));
  } catch (err) {
    console.error("Error fetching db by category:", err);
    return [];
  }
}

export async function getDbRelated(slug: string, category: string, locale: Locale, limit = 3): Promise<Wallpaper[]> {
  try {
    const [rows] = await pool.query(
      `SELECT w.id, w.slug, w.category_slug as category, w.color, w.src, w.width, w.height, w.downloads_count as downloads, DATE_FORMAT(w.published_at, '%Y-%m-%d') as published,
              COALESCE(t.title, t_en.title, 'Untitled') as title,
              COALESCE(t.description, t_en.description, '') as description,
              GROUP_CONCAT(tg.tag) as tags_string
       FROM wallpapers w
       LEFT JOIN wallpaper_translations t ON t.wallpaper_id = w.id AND t.locale = ?
       LEFT JOIN wallpaper_translations t_en ON t_en.wallpaper_id = w.id AND t_en.locale = 'en'
       LEFT JOIN wallpaper_tags tg ON tg.wallpaper_id = w.id
       WHERE w.category_slug = ? AND w.slug != ?
       GROUP BY w.id
       ORDER BY w.downloads_count DESC, w.id DESC
       LIMIT ?`,
      [locale, category, slug, limit]
    );

    return (rows as any[]).map((r) => ({
      slug: r.slug,
      title: r.title,
      category: r.category as any,
      color: r.color,
      src: r.src,
      width: r.width,
      height: r.height,
      downloads: r.downloads,
      published: r.published,
      tags: r.tags_string ? r.tags_string.split(",") : [],
      desc: {
        [locale]: r.description
      } as any
    }));
  } catch (err) {
    console.error("Error fetching db related:", err);
    return [];
  }
}

export async function getDbWallpapersFiltered(
  filter: { category?: string; tag?: string; deviceRatio?: "portrait" | "tablet" | "all" },
  locale: Locale
): Promise<Wallpaper[]> {
  const all = await getDbWallpapers(locale);
  let list = [...all];
  if (filter.category) {
    list = list.filter((w) => w.category === filter.category);
  }
  if (filter.tag) {
    const t = filter.tag.toLowerCase();
    list = list.filter((w) => w.tags.some((tag) => tag.toLowerCase() === t));
  }
  if (filter.deviceRatio === "portrait") {
    list = list.filter((w) => w.height > w.width);
  }
  return list;
}
