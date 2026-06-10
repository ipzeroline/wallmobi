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

function mapWallpaperRow(r: any, locale: Locale): Wallpaper {
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
}

export async function getDbWallpapersPage(locale: Locale, page = 1, limit = 24): Promise<{ wallpapers: Wallpaper[]; total: number; page: number; limit: number; hasMore: boolean }> {
  const safePage = Math.max(1, page);
  const safeLimit = Math.min(48, Math.max(1, limit));
  const offset = (safePage - 1) * safeLimit;

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
       ORDER BY w.published_at DESC, w.id DESC
       LIMIT ? OFFSET ?`,
      [locale, safeLimit, offset]
    );

    const [countRows] = await pool.query("SELECT COUNT(*) as total FROM wallpapers");
    const total = Number((countRows as any[])[0]?.total || 0);

    return {
      wallpapers: (rows as any[]).map((r) => mapWallpaperRow(r, locale)),
      total,
      page: safePage,
      limit: safeLimit,
      hasMore: offset + (rows as any[]).length < total,
    };
  } catch (err) {
    console.error("Error fetching db wallpapers page:", err);
    return { wallpapers: [], total: 0, page: safePage, limit: safeLimit, hasMore: false };
  }
}

export async function getDbTrending(locale: Locale, limit = 6): Promise<Wallpaper[]> {
  try {
    const [rows] = await pool.query(
      `SELECT w.id, w.slug, w.category_slug as category, w.color, w.src, w.width, w.height, w.downloads_count as downloads, DATE_FORMAT(w.published_at, '%Y-%m-%d') as published,
              COALESCE(t.title, t_en.title, 'Untitled') as title,
              COALESCE(t.description, t_en.description, '') as description,
              GROUP_CONCAT(DISTINCT tg.tag) as tags_string,
              COALESCE(dl.recent_downloads, 0) as recent_downloads,
              COALESCE(fav.recent_favorites, 0) as recent_favorites,
              (
                COALESCE(dl.recent_downloads, 0) * 5 +
                COALESCE(fav.recent_favorites, 0) * 3 +
                LEAST(w.downloads_count, 1000) * 0.02 +
                GREATEST(0, 14 - DATEDIFF(CURDATE(), DATE(w.published_at))) * 0.5
              ) as trending_score
       FROM wallpapers w
       LEFT JOIN (
         SELECT wallpaper_slug, COUNT(*) as recent_downloads
         FROM user_downloads
         WHERE downloaded_at >= DATE_SUB(NOW(), INTERVAL 14 DAY)
         GROUP BY wallpaper_slug
       ) dl ON dl.wallpaper_slug = w.slug
       LEFT JOIN (
         SELECT wallpaper_slug, COUNT(*) as recent_favorites
         FROM user_favorites
         WHERE favorited_at >= DATE_SUB(NOW(), INTERVAL 14 DAY)
         GROUP BY wallpaper_slug
       ) fav ON fav.wallpaper_slug = w.slug
       LEFT JOIN wallpaper_translations t ON t.wallpaper_id = w.id AND t.locale = ?
       LEFT JOIN wallpaper_translations t_en ON t_en.wallpaper_id = w.id AND t_en.locale = 'en'
       LEFT JOIN wallpaper_tags tg ON tg.wallpaper_id = w.id
       GROUP BY w.id
       ORDER BY trending_score DESC, w.published_at DESC, w.id DESC
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

export async function getDbByCategories(categories: string[], locale: Locale, limit = 4): Promise<Wallpaper[]> {
  const safeCategories = categories
    .map((category) => category.trim())
    .filter((category) => /^[a-z0-9-]+$/.test(category));

  if (safeCategories.length === 0) return [];

  try {
    const placeholders = safeCategories.map(() => "?").join(", ");
    const [rows] = await pool.query(
      `SELECT w.id, w.slug, w.category_slug as category, w.color, w.src, w.width, w.height, w.downloads_count as downloads, DATE_FORMAT(w.published_at, '%Y-%m-%d') as published,
              COALESCE(t.title, t_en.title, 'Untitled') as title,
              COALESCE(t.description, t_en.description, '') as description,
              GROUP_CONCAT(tg.tag) as tags_string
       FROM wallpapers w
       LEFT JOIN wallpaper_translations t ON t.wallpaper_id = w.id AND t.locale = ?
       LEFT JOIN wallpaper_translations t_en ON t_en.wallpaper_id = w.id AND t_en.locale = 'en'
       LEFT JOIN wallpaper_tags tg ON tg.wallpaper_id = w.id
       WHERE w.category_slug IN (${placeholders})
       GROUP BY w.id
       ORDER BY FIELD(w.category_slug, ${placeholders}), w.downloads_count DESC, w.published_at DESC, w.id DESC
       LIMIT ?`,
      [locale, ...safeCategories, ...safeCategories, Math.min(12, Math.max(1, limit))]
    );

    return (rows as any[]).map((r) => mapWallpaperRow(r, locale));
  } catch (err) {
    console.error("Error fetching db wallpapers by categories:", err);
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
