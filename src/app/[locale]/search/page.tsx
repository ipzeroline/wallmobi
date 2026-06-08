import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { alternates } from "@/lib/seo";
import { getDbWallpapers } from "@/lib/db-wallpapers";
import SearchClient from "@/components/SearchClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.search.title,
    description: dict.meta.description,
    alternates: alternates(locale, "/search"),
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);
  const all = await getDbWallpapers(l);

  return (
    <section className="container section">
      <div className="section-head">
        <p className="eyebrow">{dict.nav.search}</p>
        <h1 className="h2">{dict.search.title}</h1>
      </div>
      <Suspense fallback={null}>
        <SearchClient items={all} locale={l} dict={dict} />
      </Suspense>
    </section>
  );
}
