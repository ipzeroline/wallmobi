// Central place for site-wide metadata. Change the URL before deploying.
export const site = {
  name: "WallMobi",
  // Set NEXT_PUBLIC_SITE_URL to the real production origin (no trailing slash).
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://wallmobi.com").replace(/\/$/, ""),
  twitter: "@wallmobi",
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
