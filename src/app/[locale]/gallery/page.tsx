import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { alternates } from "@/lib/seo";
import { getDbWallpapers } from "@/lib/db-wallpapers";
import WallpaperCard from "@/components/WallpaperCard";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.gallery.title,
    description: dict.meta.description,
    alternates: alternates(locale, "/gallery"),
  };
}

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);
  const all = await getDbWallpapers(l);

  // Fisher-Yates Shuffle algorithm to randomize the wallpapers order
  const shuffled = [...all];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return (
    <section className="container section">
      <div className="section-head">
        <p className="eyebrow">{dict.gallery.eyebrow}</p>
        <h1 className="h2">{dict.gallery.title}</h1>
      </div>
      <div className="grid">
        {shuffled.map((wp, i) => (
          <WallpaperCard key={wp.slug} wp={wp} locale={l} dict={dict} priority={i < 5} />
        ))}
      </div>
    </section>
  );
}
