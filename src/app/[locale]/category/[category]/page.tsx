import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { alternates } from "@/lib/seo";
import { site, categorySlugs, type CategorySlug } from "@/lib/site";
import { getDbByCategory } from "@/lib/db-wallpapers";
import WallpaperCard from "@/components/WallpaperCard";

export function generateStaticParams() {
  return categorySlugs.map((category) => ({ category }));
}

function valid(c: string): c is CategorySlug {
  return (categorySlugs as readonly string[]).includes(c);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  if (!isLocale(locale) || !valid(category)) return {};
  const dict = getDictionary(locale);
  const c = dict.categories[category];
  return {
    title: c.name,
    description: c.blurb,
    alternates: alternates(locale, `/category/${category}`),
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  if (!isLocale(locale) || !valid(category)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);
  const c = dict.categories[category];
  const items = await getDbByCategory(category, l);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: dict.category.home, item: `${site.url}/${l}` },
      { "@type": "ListItem", position: 2, name: dict.category.gallery, item: `${site.url}/${l}/gallery` },
      { "@type": "ListItem", position: 3, name: c.name, item: `${site.url}/${l}/category/${category}` },
    ],
  };

  return (
    <section className="container section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="crumb" aria-label="Breadcrumb">
        <Link href={`/${l}`}>{dict.category.home}</Link><i>/</i>
        <Link href={`/${l}/gallery`}>{dict.category.gallery}</Link><i>/</i>
        <span style={{ color: "var(--text-2)" }}>{c.name}</span>
      </nav>
      <div className="section-head" style={{ marginTop: "1.5rem" }}>
        <h1 className="h2">{c.name}</h1>
        <p className="lede" style={{ marginTop: ".5rem" }}>{c.blurb}</p>
        <p className="tiny" style={{ marginTop: ".6rem" }}>{items.length} {dict.category.count}</p>
      </div>
      <div className="grid">
        {items.map((wp, i) => (
          <WallpaperCard key={wp.slug} wp={wp} locale={l} dict={dict} priority={i < 5} />
        ))}
      </div>

      {/* Category SEO Article */}
      <div style={{ maxWidth: "800px", margin: "4rem auto 0", padding: "2rem 0 0", borderTop: "1px solid var(--line)" }}>
        <h2 style={{ fontSize: "1.45rem", fontWeight: 600, marginBottom: "0.8rem" }}>
          {dict.seo.categoryFooterTitle.replace("{category}", c.name)}
        </h2>
        <p style={{ color: "var(--text-2)", lineHeight: "1.65", fontSize: "0.98rem" }}>
          {dict.seo.categoryFooterText.replace("{category}", c.name)}
        </p>
      </div>
    </section>
  );
}
