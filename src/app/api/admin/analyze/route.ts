import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { serverErrorResponse } from "@/lib/api-response";
import fs from "fs";
import path from "path";
import { categorySlugs } from "@/lib/site";
import pool from "@/lib/db";
import sharp from "sharp";
import crypto from "crypto";

const fallbackColors: Record<string, string> = {
  anime: "#ff8ab3", dragon: "#ff3b30", black: "#08080a", amoled: "#000000",
  aesthetic: "#b388ff", cyberpunk: "#ff007f", samurai: "#9f1239", oni: "#ff2d55",
  wolf: "#60a5fa", car: "#ff9500", nature: "#22c55e", space: "#5856d6",
  gaming: "#00f0ff", cute: "#ff80ab", dark: "#111111", fantasy: "#a855f7",
  japanese: "#d4af37", neon: "#39ff14", supercar: "#ef4444", luxury: "#d4af37",
};

const fallbackSubjects: Record<string, string[]> = {
  anime: ["Nostalgic Anime Sunset Skyline", "Cherry Blossom Anime City Lights", "Dreamy Lofi Anime Night", "Pastel Anime Cloudscape"],
  dragon: ["Crimson Fire Dragon Legend", "Golden Celestial Dragon", "Dark Eastern Dragon Silhouette", "Ancient Dragon Scale Art"],
  black: ["Matte Black Minimal Texture", "Carbon Black Geometric Pattern", "Obsidian Dark Abstract", "Monochrome Shadow Lines"],
  amoled: ["True Black Neon Edge", "Amoled Deep Space Glow", "Minimal Black Light Ring", "Neon Line Dark Display"],
  aesthetic: ["Pastel Sunset Dreamscape", "Soft Gradient Aesthetic Sky", "Retro Vaporwave Horizon", "Minimal Pastel Fluid Art"],
  cyberpunk: ["Neon Cyberpunk City Rain", "Futuristic Megacity Glow", "Cyber Hacker Room Lights", "Synthwave Neon Street"],
  samurai: ["Crimson Katana Samurai", "Shadow Ronin Cherry Blossom", "Ancient Samurai Armor", "Bushido Ink Stroke"],
  oni: ["Red Oni Demon Mask", "Cyber Oni Neon Mask", "Dark Oni Fire Spirit", "Japanese Demon Face"],
  wolf: ["Blue Moon Wolf Spirit", "Arctic Wolf Night", "Forest Alpha Wolf", "Celestial Wolf Shadow"],
  car: ["Night Highway Sports Car", "Neon Drift Car Lights", "Retro Racing Dashboard", "Street Tuner Car Glow"],
  nature: ["Misty Pine Forest", "Golden Ocean Wave", "Tropical Green Leaves", "Mountain Sunrise Landscape"],
  space: ["Deep Space Nebula", "Ringed Planet Galaxy", "Cosmic Portal Stars", "Amoled Supernova Glow"],
  gaming: ["RGB Gaming Setup", "Cyber Controller Glow", "Esports Neon Arena", "Retro Arcade Lights"],
  cute: ["Kawaii Pastel Character", "Cute Pink Cloud Pattern", "Sweet Strawberry Heart", "Dreamy Cute Galaxy"],
  dark: ["Dark Gothic Shadow", "Obsidian Metal Texture", "Mystic Dark Forest", "Black Tech Armor"],
  fantasy: ["Magic Crystal Cave", "Floating Castle Sky", "Elven Light Portal", "Wizard Spell Circle"],
  japanese: ["Mount Fuji Sakura", "Red Torii Sunset", "Zen Garden Wave", "Ukiyo-e Ocean Art"],
  neon: ["Abstract Neon Ribbon", "Cyber Neon Tunnel", "Glowing Geometric Ring", "Liquid Neon Flow"],
  supercar: ["Matte Black Supercar", "Carbon Hypercar Detail", "Racing Tail Light Speed", "Luxury Supercar Front"],
  luxury: ["Black Marble Gold Veins", "Premium Dark Silk", "Gold Art Deco Lines", "Platinum Luxury Texture"],
};

const filenameStopWords = new Set([
  "ai", "am", "api", "chatgpt", "dall", "dalle", "download", "generated", "generate",
  "gemini", "image", "img", "jpeg", "jpg", "midjourney", "openai", "photo", "picture",
  "pm", "png", "screenshot", "upload", "wallpaper", "webp",
  "jan", "january", "feb", "february", "mar", "march", "apr", "april", "may",
  "jun", "june", "jul", "july", "aug", "august", "sep", "sept", "september",
  "oct", "october", "nov", "november", "dec", "december",
]);

const titleTagStopWords = new Set([
  "and", "background", "download", "free", "for", "from", "home", "lock", "mobile",
  "phone", "screen", "the", "wallpaper", "with", "your",
]);

const categorySeoKeywords: Record<string, string[]> = {
  anime: ["anime-wallpaper"],
  cyberpunk: ["cyberpunk-wallpaper"],
  amoled: ["amoled-wallpaper"],
  black: ["black-wallpaper", "amoled-wallpaper"],
  dragon: ["dragon-wallpaper"],
  cute: ["cute-wallpaper"],
  gaming: ["gaming-wallpaper"],
  samurai: ["samurai-wallpaper"],
  wolf: ["wolf-wallpaper"],
  car: ["car-wallpaper"],
};

const deviceSeoKeywords = [
  "iphone wallpaper",
  "iphone-wallpaper",
  "iphone wallpaper 4k",
  "iphone-wallpaper-4k",
  "iphone wallpaper hd",
  "iphone-wallpaper-hd",
  "iphone 17 wallpaper",
  "iphone-17-wallpaper",
  "iphone 17 pro wallpaper",
  "iphone-17-pro-wallpaper",
  "iphone 17 pro max wallpaper",
  "iphone-17-pro-max-wallpaper",
  "iphone 16 wallpaper",
  "iphone-16-wallpaper",
  "iphone 16 pro wallpaper",
  "iphone-16-pro-wallpaper",
  "iphone 16 pro max wallpaper",
  "iphone-16-pro-max-wallpaper",
  "iphone 15 wallpaper",
  "iphone-15-wallpaper",
  "iphone 15 plus wallpaper",
  "iphone-15-plus-wallpaper",
  "iphone 15 pro wallpaper",
  "iphone-15-pro-wallpaper",
  "iphone 15 pro max wallpaper",
  "iphone-15-pro-max-wallpaper",
  "iphone 14 wallpaper",
  "iphone-14-wallpaper",
  "iphone 14 pro wallpaper",
  "iphone-14-pro-wallpaper",
  "iphone 14 pro max wallpaper",
  "iphone-14-pro-max-wallpaper",
  "iphone 13 wallpaper",
  "iphone-13-wallpaper",
  "iphone 13 pro max wallpaper",
  "iphone-13-pro-max-wallpaper",
  "samsung wallpaper",
  "samsung-wallpaper",
  "samsung galaxy wallpaper",
  "samsung-galaxy-wallpaper",
  "samsung s25 wallpaper",
  "samsung-s25-wallpaper",
  "samsung s25 ultra wallpaper",
  "samsung-s25-ultra-wallpaper",
  "samsung s24 wallpaper",
  "samsung-s24-wallpaper",
  "samsung s24 ultra wallpaper",
  "samsung-s24-ultra-wallpaper",
  "samsung s23 wallpaper",
  "samsung-s23-wallpaper",
  "samsung s23 ultra wallpaper",
  "samsung-s23-ultra-wallpaper",
  "samsung z fold wallpaper",
  "samsung-z-fold-wallpaper",
  "samsung z flip wallpaper",
  "samsung-z-flip-wallpaper",
  "samsung amoled wallpaper",
  "samsung-amoled-wallpaper",
  "xiaomi wallpaper",
  "xiaomi-wallpaper",
  "redmi wallpaper",
  "redmi-wallpaper",
  "xiaomi 15 wallpaper",
  "xiaomi-15-wallpaper",
  "xiaomi 14 wallpaper",
  "xiaomi-14-wallpaper",
  "redmi note wallpaper",
  "redmi-note-wallpaper",
  "hyperos wallpaper",
  "hyperos-wallpaper",
  "oppo wallpaper",
  "oppo-wallpaper",
  "oppo find x wallpaper",
  "oppo-find-x-wallpaper",
  "oppo reno wallpaper",
  "oppo-reno-wallpaper",
  "vivo wallpaper",
  "vivo-wallpaper",
  "vivo x wallpaper",
  "vivo-x-wallpaper",
  "vivo v series wallpaper",
  "vivo-v-series-wallpaper",
];

const priorityDeviceSeoKeywords = [
  "iphone wallpaper",
  "iphone wallpaper 4k",
  "iphone 17 pro max wallpaper",
  "iphone-16-wallpaper",
  "iphone-16-pro-max-wallpaper",
  "iphone 15 pro max wallpaper",
  "samsung wallpaper",
  "samsung galaxy wallpaper",
  "samsung s25 ultra wallpaper",
  "samsung-s25-ultra-wallpaper",
  "samsung amoled wallpaper",
  "xiaomi wallpaper",
  "oppo wallpaper",
  "vivo wallpaper",
];

const localizedDeviceSeoPhrases = {
  en: [
    "iphone wallpaper", "iphone wallpaper 4k", "iphone 17 pro max wallpaper",
    "samsung galaxy wallpaper", "samsung s25 ultra wallpaper", "samsung amoled wallpaper",
    "xiaomi wallpaper", "redmi note wallpaper", "oppo reno wallpaper", "vivo v series wallpaper",
  ],
  th: [
    "วอลเปเปอร์ iPhone", "วอลเปเปอร์ iPhone 17 Pro Max", "วอลเปเปอร์ iPhone 15 Pro Max",
    "วอลเปเปอร์ Samsung Galaxy", "วอลเปเปอร์ Samsung S25 Ultra", "วอลเปเปอร์ Samsung AMOLED",
    "วอลเปเปอร์ Xiaomi", "วอลเปเปอร์ Redmi Note", "วอลเปเปอร์ OPPO Reno", "วอลเปเปอร์ vivo V Series",
  ],
  vi: [
    "hình nền iPhone", "hình nền iPhone 17 Pro Max", "hình nền iPhone 15 Pro Max",
    "hình nền Samsung Galaxy", "hình nền Samsung S25 Ultra", "hình nền Samsung AMOLED",
    "hình nền Xiaomi", "hình nền Redmi Note", "hình nền OPPO Reno", "hình nền vivo V Series",
  ],
  my: [
    "iPhone ဖုန်းနောက်ခံပုံ", "iPhone 17 Pro Max နောက်ခံပုံ", "iPhone 15 Pro Max နောက်ခံပုံ",
    "Samsung Galaxy နောက်ခံပုံ", "Samsung S25 Ultra နောက်ခံပုံ", "Samsung AMOLED နောက်ခံပုံ",
    "Xiaomi နောက်ခံပုံ", "Redmi Note နောက်ခံပုံ", "OPPO Reno နောက်ခံပုံ", "vivo V Series နောက်ခံပုံ",
  ],
  lo: [
    "ວໍເປເປີ iPhone", "ວໍເປເປີ iPhone 17 Pro Max", "ວໍເປເປີ iPhone 15 Pro Max",
    "ວໍເປເປີ Samsung Galaxy", "ວໍເປເປີ Samsung S25 Ultra", "ວໍເປເປີ Samsung AMOLED",
    "ວໍເປເປີ Xiaomi", "ວໍເປເປີ Redmi Note", "ວໍເປເປີ OPPO Reno", "ວໍເປເປີ vivo V Series",
  ],
  km: [
    "ផ្ទាំងរូបភាព iPhone", "ផ្ទាំងរូបភាព iPhone 17 Pro Max", "ផ្ទាំងរូបភាព iPhone 15 Pro Max",
    "ផ្ទាំងរូបភាព Samsung Galaxy", "ផ្ទាំងរូបភាព Samsung S25 Ultra", "ផ្ទាំងរូបភាព Samsung AMOLED",
    "ផ្ទាំងរូបភាព Xiaomi", "ផ្ទាំងរូបភាព Redmi Note", "ផ្ទាំងរូបភាព OPPO Reno", "ផ្ទាំងរូបភាព vivo V Series",
  ],
};

type ExistingWallpaperMeta = {
  titles: string[];
  slugs: string[];
};

function pickFallbackSubject(category: string, seedText: string) {
  const subjects = fallbackSubjects[category] || [`${humanizeCategory(category)} Premium Art`];
  const seed = Array.from(seedText).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return subjects[seed % subjects.length];
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-")
    .slice(0, 90);
}

function titleCase(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function humanizeCategory(category: string) {
  return titleCase(category.replace(/-/g, " "));
}

function meaningfulFilenameTitle(filename: string, category: string) {
  const tokens = filename
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .filter((word) =>
      word.length > 2 &&
      word.length < 18 &&
      word !== category &&
      !filenameStopWords.has(word) &&
      !/^[a-f0-9]{6,}$/.test(word) &&
      !/^\d+$/.test(word)
    );

  if (tokens.length < 2) return "";
  return titleCase(tokens.join(" "));
}

function mimeTypeFromExt(ext: string) {
  if (ext === ".png") return "image/png";
  if (ext === ".gif") return "image/gif";
  if (ext === ".svg") return "image/svg+xml";
  if (ext === ".webp") return "image/webp";
  return "image/jpeg";
}

async function loadImageSource(src: string) {
  if (/^https?:\/\//i.test(src)) {
    const url = new URL(src);
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Remote image fetch failed with status ${res.status}`);
    }

    const pathname = url.pathname;
    const ext = path.extname(pathname).toLowerCase();
    const contentType = res.headers.get("content-type") || "";
    return {
      buffer: Buffer.from(await res.arrayBuffer()),
      ext,
      filename: path.basename(pathname, ext).toLowerCase() || "uploaded-wallpaper",
      originalName: path.basename(pathname) || "uploaded-wallpaper",
      mimeType: contentType.startsWith("image/") ? contentType : mimeTypeFromExt(ext),
    };
  }

  const relativeSrc = src.replace(/^\/+/, "");
  const filePath = path.join(process.cwd(), "public", relativeSrc);
  if (!fs.existsSync(filePath)) {
    throw new Error("File not found on server");
  }

  const ext = path.extname(filePath).toLowerCase();
  return {
    buffer: fs.readFileSync(filePath),
    ext,
    filename: path.basename(filePath, ext).toLowerCase(),
    originalName: path.basename(filePath),
    mimeType: mimeTypeFromExt(ext),
  };
}

async function getExistingWallpaperMeta(category: string): Promise<ExistingWallpaperMeta> {
  const [rows] = await pool.query(
    `SELECT w.slug, t.title
     FROM wallpapers w
     LEFT JOIN wallpaper_translations t ON t.wallpaper_id = w.id AND t.locale = 'en'
     WHERE w.category_slug = ?
     ORDER BY w.id DESC
     LIMIT 80`,
    [category]
  );

  return {
    titles: (rows as any[])
      .map((row) => String(row.title || "").trim())
      .filter(Boolean),
    slugs: (rows as any[])
      .map((row) => String(row.slug || "").trim())
      .filter(Boolean),
  };
}

function cleanTitle(value: string, category: string) {
  const base = titleCase(
    String(value || "")
      .replace(/\b(for|as)\s+(wallpaper|background|mobile|phone)\b/gi, " ")
      .replace(/\b(wallpaper|background|mobile|phone|free|download|image|photo)\b/gi, " ")
      .replace(/[^a-z0-9\s-]/gi, " ")
      .replace(/\s+/g, " ")
      .replace(/\b(for|as|to|of|and|with)$/gi, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
  const categoryName = humanizeCategory(category);
  const subject = base && base.length > 5 ? base : `${categoryName} Art`;
  const hasCategory = subject.toLowerCase().includes(categoryName.toLowerCase());
  const title = hasCategory
    ? `${subject} Phone Wallpaper`
    : `${subject} ${categoryName} Phone Wallpaper`;
  return title.slice(0, 86);
}

function buildFallbackDescriptions(title: string, category: string) {
  const categoryName = humanizeCategory(category);
  const primaryKeyword = categorySeoKeywords[category]?.[0] || `${category}-wallpaper`;
  return {
    en: `Download this free high-resolution ${title}, a ${primaryKeyword} style image for home screens and lock screens. Also suitable as ${localizedDeviceSeoPhrases.en.slice(0, 3).join(", ")}.`,
    th: `ดาวน์โหลด ${title} วอลเปเปอร์มือถือฟรี ความละเอียดสูง สไตล์ ${categoryName} เหมาะกับหน้าจอโฮม หน้าจอล็อก และ${localizedDeviceSeoPhrases.th.slice(0, 3).join(", ")}`,
    my: `${title} ကို high-resolution ${categoryName} wallpaper အဖြစ် အခမဲ့ဒေါင်းလုဒ်လုပ်ပါ။ ${localizedDeviceSeoPhrases.my.slice(0, 3).join(", ")} အတွက်လည်း သင့်တော်သည်။`,
    lo: `ດາວໂຫຼດ ${title} ວໍເປເປີມືຖືຟຣີ ຄວາມລະອຽດສູງ ສະໄຕລ໌ ${categoryName} ເໝາະກັບໜ້າຈໍລັອກ ແລະ${localizedDeviceSeoPhrases.lo.slice(0, 3).join(", ")}.`,
    km: `ទាញយក ${title} ជាផ្ទាំងរូបភាពទូរស័ព្ទឥតគិតថ្លៃ គុណភាពខ្ពស់ រចនាប័ទ្ម ${categoryName} សម្រាប់អេក្រង់ចាក់សោ និង${localizedDeviceSeoPhrases.km.slice(0, 3).join(", ")}។`,
    vi: `Tải miễn phí ${title}, hình nền ${categoryName} độ phân giải cao cho màn hình chính và khóa, phù hợp với ${localizedDeviceSeoPhrases.vi.slice(0, 3).join(", ")}.`,
  };
}

function normalizeAnalysis(data: any, fallbackTitle: string, fallbackCategory: string, fallbackColor: string, existing: ExistingWallpaperMeta) {
  const category = fallbackCategory;
  const title = cleanTitle(data?.title || fallbackTitle, category);
  const duplicateTitle = existing.titles.some((existingTitle) => existingTitle.toLowerCase() === title.toLowerCase());
  if (duplicateTitle) {
    throw new Error(`AI generated a duplicate title: ${title}. Please analyze again or upload a different image.`);
  }

  const subjectSlug = slugify(data?.slug || title || fallbackTitle)
    .replace(new RegExp(`^${category}-?`), "")
    .replace(/^wallpaper-?/, "")
    .replace(/-wallpaper-for-mobile$/, "")
    .replace(/-for-mobile$/, "")
    .replace(/-phone-wallpaper$/, "")
    .replace(/-mobile-wallpaper$/, "");
  const baseSlug = `${category}-wallpaper-${subjectSlug || "mobile-background"}`.slice(0, 110);
  let finalSlug = `${baseSlug}-${crypto.randomBytes(3).toString("hex")}`;
  const existingSlugs = new Set(existing.slugs);
  while (existingSlugs.has(finalSlug)) {
    finalSlug = `${baseSlug}-${crypto.randomBytes(4).toString("hex")}`;
  }
  const descriptions = {
    ...buildFallbackDescriptions(title, category),
    ...(data?.descriptions && typeof data.descriptions === "object" ? data.descriptions : {}),
  };
  const tags = Array.isArray(data?.tags)
    ? data.tags.map((tag: unknown) => String(tag).toLowerCase().trim()).filter(Boolean)
    : [];
  const categoryKeywords = categorySeoKeywords[category] || [`${category}-wallpaper`];
  const titleTags = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((word) =>
      word.length > 2 &&
      word.length < 18 &&
      !/^\d+$/.test(word) &&
      !titleTagStopWords.has(word)
    );

  return {
    category_slug: category,
    title,
    slug: finalSlug,
    color: /^#[0-9a-f]{6}$/i.test(data?.color || "") ? data.color : fallbackColor,
    descriptions,
    tags: Array.from(new Set([
      category,
      ...categoryKeywords,
      ...titleTags,
      ...priorityDeviceSeoKeywords,
      ...tags,
      `${category} wallpaper`,
      `${category} phone wallpaper`,
      `${category} mobile wallpaper`,
      "vertical wallpaper",
      "portrait wallpaper",
      "mobile wallpaper",
      "phone wallpaper",
      "iphone wallpaper",
      "samsung wallpaper",
      "android wallpaper",
      "lock screen",
      "home screen",
      "high resolution",
    ])).slice(0, 24),
  };
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user || (user.role !== "super_admin" && user.role !== "staff")) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const { src, category_slug } = await req.json();
    if (!src) {
      return NextResponse.json({ error: "Image source URL required" }, { status: 400 });
    }

    const imageSource = await loadImageSource(src);
    const buffer = imageSource.buffer;
    const base64Data = buffer.toString("base64");
    const imageMeta = await sharp(buffer).metadata().catch(() => ({ width: 1080, height: 2340 }));
    const dominant = await sharp(buffer)
      .resize(64, 64, { fit: "inside" })
      .stats()
      .then((stats) => stats.dominant)
      .catch(() => null);

    const ext = imageSource.ext;
    const mimeType = imageSource.mimeType;

    const apiKey = process.env.GEMINI_API_KEY;
    const filename = imageSource.filename;
    let detectedCategory = categorySlugs.includes(category_slug) ? category_slug : "aesthetic";
    for (const slug of categorySlugs) {
      if (!category_slug && filename.includes(slug)) {
        detectedCategory = slug;
        break;
      }
    }
    const meaningfulFilename = meaningfulFilenameTitle(filename, detectedCategory);
    const fallbackTitle = meaningfulFilename || pickFallbackSubject(detectedCategory, filename);
    const fallbackColor = dominant
      ? `#${[dominant.r, dominant.g, dominant.b].map((value) => Math.max(0, Math.min(255, Math.round(value))).toString(16).padStart(2, "0")).join("")}`
      : fallbackColors[detectedCategory] || "#ff9500";
    const existingMeta = await getExistingWallpaperMeta(detectedCategory);

    if (!apiKey) {
      return NextResponse.json(
        { error: "AI analysis is required before saving, but GEMINI_API_KEY is not configured." },
        { status: 503 }
      );
    }

    // Call Google Gemini API
    const geminiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";
    const prompt = `You are an expert SEO editor for a mobile wallpaper website.

Analyze this uploaded wallpaper image and return ONLY a valid JSON object. No markdown, no backticks.

Image metadata:
- Original filename: ${imageSource.originalName}
- Dimensions: ${imageMeta.width || 1080}x${imageMeta.height || 2340}
- Admin-selected category: ${detectedCategory}
- Existing titles you MUST NOT repeat: ${existingMeta.titles.slice(0, 30).join(" | ") || "none"}
- Existing slugs you MUST NOT repeat or closely copy: ${existingMeta.slugs.slice(0, 30).join(" | ") || "none"}

Required JSON shape:
{
  "category_slug": "${detectedCategory}",
  "title": "natural English SEO title, 40-78 characters, must match the selected category and visible image subject",
  "slug": "short lowercase SEO URL slug in English, descriptive subject only; final system will prefix category-wallpaper",
  "color": "#rrggbb dominant color",
  "descriptions": {
    "en": "140-180 chars. Mention free high-resolution phone wallpaper, home screen, lock screen, and the visible subject/style.",
    "th": "natural Thai SEO description, 140-190 chars, mention วอลเปเปอร์มือถือฟรี ความละเอียดสูง หน้าจอโฮม หน้าจอล็อก",
    "my": "natural Burmese SEO description",
    "lo": "natural Lao SEO description",
    "km": "natural Khmer SEO description",
    "vi": "natural Vietnamese SEO description"
  },
  "tags": ["18-24 lowercase English tags mixing subject, style, category, color, mood, mobile wallpaper, lock screen"]
}

Rules:
- Use the admin-selected category unless the image is obviously impossible for that category.
- Individual wallpaper titles should use this pattern: visible subject + category keyword + "Phone Wallpaper".
- Do NOT end every title with "for Mobile". Use "Anime Phone Wallpaper", "Cyberpunk Phone Wallpaper", "AMOLED Phone Wallpaper", etc. according to the selected category.
- Device keywords are for tags/descriptions and landing pages, not forced into every title unless the image is clearly device-specific.
- Apply these SEO keyword families naturally:
  - Category keywords: ${(categorySeoKeywords[detectedCategory] || [`${detectedCategory}-wallpaper`]).join(", ")}
  - Priority device keywords for tags/descriptions when natural: ${priorityDeviceSeoKeywords.join(", ")}
  - Wider device keyword pool for related tags: ${deviceSeoKeywords.slice(0, 40).join(", ")}
- Use localized device SEO phrases in each matching description language. Do not paste English keywords into every language unless the device name itself is English:
  - en: ${localizedDeviceSeoPhrases.en.join(", ")}
  - th: ${localizedDeviceSeoPhrases.th.join(", ")}
  - vi: ${localizedDeviceSeoPhrases.vi.join(", ")}
  - my: ${localizedDeviceSeoPhrases.my.join(", ")}
  - lo: ${localizedDeviceSeoPhrases.lo.join(", ")}
  - km: ${localizedDeviceSeoPhrases.km.join(", ")}
- Each localized description should include 1-3 localized device phrases only when the sentence remains natural.
- Title and slug must be unique, not repeated, and must describe the visible subject in this exact image.
- Never use generic fallback titles like "Dreamy Lofi Anime Night", "Pastel Anime Cloudscape", or any title that could fit many images.
- Titles must be attractive and human-readable, suitable for Google search.
- Do not claim 8K unless the image is at least 4320px wide or 7680px tall. If lower, say high-resolution.
- Avoid generic titles like "Beautiful Wallpaper" or "Cool Background".
- Tags must be specific and plentiful without being spammy.`;

    try {
      const response = await fetch(geminiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                {
                  inlineData: {
                    mimeType: mimeType,
                    data: base64Data,
                  },
                },
              ],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
          },
        }),
      });

      if (!response.ok) {
        return NextResponse.json(
          { error: "AI analysis failed. Please check GEMINI_API_KEY or try again." },
          { status: 502 }
        );
      }

      const result = await response.json();
      const textResponse = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!textResponse) {
        return NextResponse.json(
          { error: "AI did not return image metadata. Please try again." },
          { status: 502 }
        );
      }

      const parsed = JSON.parse(textResponse.trim());
      return NextResponse.json({
        success: true,
        isAiAnalyzed: true,
        data: {
          ...normalizeAnalysis(parsed, fallbackTitle, detectedCategory, fallbackColor, existingMeta),
          width: imageMeta.width || 1080,
          height: imageMeta.height || 2340,
        },
      });
    } catch (aiError: any) {
      console.error("AI wallpaper analysis failed.", aiError);
      return NextResponse.json(
        { error: aiError?.message || "AI analysis failed. Please try again." },
        { status: 502 }
      );
    }

  } catch (err: any) {
    console.error("Admin analyze error:", err);
    return serverErrorResponse(err.message);
  }
}
