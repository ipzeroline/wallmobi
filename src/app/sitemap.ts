import type { MetadataRoute } from "next";
import { site, categorySlugs } from "@/lib/site";
import { getDbWallpapers } from "@/lib/db-wallpapers";
import { blogPosts } from "@/lib/blog";
import { locales, defaultLocale, localeHtmlLang } from "@/i18n/config";
import { seoLandingPages } from "@/lib/seo-landing-pages";
import { GALLERY_PAGE_SIZE } from "@/lib/gallery-seo";

type RouteDef = { path: string; freq: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number; last?: Date };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dbWps = await getDbWallpapers("en");
  const now = new Date();
  const galleryPages = Math.max(1, Math.ceil(dbWps.length / GALLERY_PAGE_SIZE));

  const routes: RouteDef[] = [
    { path: "", freq: "daily", priority: 1 },
    { path: "/gallery", freq: "daily", priority: 0.9 },
    ...Array.from({ length: Math.max(0, galleryPages - 1) }, (_, index) => ({
      path: `/gallery/page/${index + 2}`,
      freq: "daily" as const,
      priority: 0.75,
    })),
    { path: "/about", freq: "monthly", priority: 0.4 },
    { path: "/license", freq: "yearly", priority: 0.3 },
    { path: "/blog", freq: "daily", priority: 0.8 },
    { path: "/contact", freq: "monthly" as const, priority: 0.5 },
    ...categorySlugs.map((c) => ({ path: `/category/${c}`, freq: "weekly" as const, priority: 0.7 })),
    ...seoLandingPages.map((p) => ({ path: `/${p.slug}`, freq: "weekly" as const, priority: 0.85 })),
    ...dbWps.map((w) => ({
      path: `/${w.category}-wallpapers/${w.slug}`,
      freq: "monthly" as const,
      priority: 0.8,
      last: new Date(w.published),
    })),
    ...blogPosts.map((p) => ({
      path: `/blog/${p.slug}`,
      freq: "monthly" as const,
      priority: 0.8,
      last: new Date(p.published),
    })),
  ];

  const entries: MetadataRoute.Sitemap = [];
  for (const r of routes) {
    const languages: Record<string, string> = {};
    for (const l of locales) languages[localeHtmlLang[l]] = `${site.url}/${l}${r.path}`;
    languages["x-default"] = `${site.url}/${defaultLocale}${r.path}`;
    for (const l of locales) {
      entries.push({
        url: `${site.url}/${l}${r.path}`,
        lastModified: r.last ?? now,
        changeFrequency: r.freq,
        priority: r.priority,
        alternates: { languages },
      });
    }
  }
  const reviewLanguages = {
    en: `${site.url}/en/reviews`,
    th: `${site.url}/th/reviews`,
    "x-default": `${site.url}/en/reviews`,
  };
  for (const l of ["en", "th"] as const) {
    entries.push({
      url: `${site.url}/${l}/reviews`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: { languages: reviewLanguages },
    });
  }
  return entries;
}
