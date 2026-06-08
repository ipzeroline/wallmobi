import { notFound } from "next/navigation";
import Link from "next/link";
import { isLocale, type Locale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { site } from "@/lib/site";
import { alternates } from "@/lib/seo";
import { getDbWallpapersFiltered } from "@/lib/db-wallpapers";
import { seoLandingPages } from "@/lib/seo-landing-pages";
import WallpaperCard from "@/components/WallpaperCard";
import type { Metadata } from "next";

interface Params {
  locale: string;
  category: string;
}

export function generateStaticParams() {
  const paramsList: Params[] = [];
  for (const page of seoLandingPages) {
    for (const locale of locales) {
      paramsList.push({ locale, category: page.slug });
    }
  }
  return paramsList;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  if (!isLocale(locale)) return {};

  const pageDef = seoLandingPages.find((p) => p.slug === category);
  if (!pageDef) return {};

  const title = pageDef.title[locale] || pageDef.title.en;
  const description = pageDef.description[locale] || pageDef.description.en;

  return {
    title,
    description,
    alternates: alternates(locale, `/${category}`),
    openGraph: {
      title,
      description,
      url: `/${locale}/${category}`,
      type: "website",
    },
  };
}

export default async function SeoLandingPage({ params }: { params: Promise<Params> }) {
  const { locale, category } = await params;
  if (!isLocale(locale)) notFound();

  const pageDef = seoLandingPages.find((p) => p.slug === category);
  if (!pageDef) notFound();

  const l = locale as Locale;
  const dict = getDictionary(l);

  // Filter wallpapers matching the keyword rules
  const matchedWallpapers = await getDbWallpapersFiltered(pageDef.filter, l);

  const pageUrl = `${site.url}/${l}/${category}`;

  // Rich Schema: CollectionPage & ItemList schemas for search bots
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": pageDef.title[l],
        "description": pageDef.description[l],
        "isPartOf": { "@id": `${site.url}/${l}/#website` },
        "about": {
          "@type": "Thing",
          "name": pageDef.h1[l],
        },
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#itemlist`,
        "name": pageDef.h1[l],
        "numberOfItems": Math.min(matchedWallpapers.length, 20),
        "itemListElement": matchedWallpapers.slice(0, 20).map((wp, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "url": `${site.url}/${l}/${wp.category}-wallpapers/${wp.slug}`,
        })),
      },
    ],
  };

  return (
    <section className="container section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="crumb" aria-label="Breadcrumb">
        <Link href={`/${l}`}>{dict.category.home}</Link><i>/</i>
        <span style={{ color: "var(--text-2)" }}>{pageDef.h1[l]}</span>
      </nav>

      <div className="section-head" style={{ marginTop: "1.5rem" }}>
        <h1 className="h2">{pageDef.h1[l]}</h1>
        <p className="lede" style={{ marginTop: ".5rem", maxWidth: "800px" }}>
          {pageDef.intro[l]}
        </p>
      </div>

      {matchedWallpapers.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "4rem 2rem",
            border: "1px dashed var(--line)",
            borderRadius: "18px",
            background: "rgba(0, 0, 0, 0.01)",
            marginTop: "2rem",
          }}
        >
          <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "1rem" }}>🖼️</span>
          <p style={{ color: "var(--text-2)", fontSize: "1.05rem" }}>
            {l === "th"
              ? "กำลังเตรียมรูปภาพสำหรับคอลเลกชันนี้ โปรดกลับมาตรวจสอบใหม่ภายหลัง"
              : "Wallpapers for this collection are being curated. Please check back soon."}
          </p>
        </div>
      ) : (
        <div className="grid" style={{ marginTop: "2rem" }}>
          {matchedWallpapers.map((wp) => (
            <WallpaperCard key={wp.slug} wp={wp} locale={l} dict={dict} />
          ))}
        </div>
      )}
    </section>
  );
}
