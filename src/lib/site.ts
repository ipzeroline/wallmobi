const productionUrl = "https://wallmobi.com";

function normalizeSiteUrl(rawUrl: string | undefined) {
  if (!rawUrl) return productionUrl;

  try {
    const parsed = new URL(rawUrl);
    const isLocalHost = ["localhost", "127.0.0.1", "::1"].includes(parsed.hostname);
    const isHttp = parsed.protocol === "http:" || parsed.protocol === "https:";

    if (!isHttp) return productionUrl;
    if (process.env.NODE_ENV === "production" && isLocalHost) return productionUrl;

    return parsed.origin.replace(/\/$/, "");
  } catch {
    return productionUrl;
  }
}

// Central place for site-wide metadata. Change the URL before deploying.
export const site = {
  name: "WallMobi",
  // Set NEXT_PUBLIC_SITE_URL to the real production origin (no trailing slash).
  url: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  twitter: "@wallmobi",
  tiktok: "https://www.tiktok.com/@wallmobi",
  author: "WallMobi Studio",
  founded: "2026",
} as const;

// Category names + blurbs are localized in src/i18n/dictionaries.
export const categorySlugs = [
  "anime",
  "dragon",
  "black",
  "amoled",
  "aesthetic",
  "cyberpunk",
  "samurai",
  "oni",
  "wolf",
  "car",
  "nature",
  "space",
  "gaming",
  "cute",
  "dark",
  "fantasy",
  "japanese",
  "neon",
  "supercar",
  "luxury",
  "minimal",
] as const;

export type CategorySlug = (typeof categorySlugs)[number];
