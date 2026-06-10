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
  const c = dict.categories[category] as any;
  return {
    title: c.seoTitle || c.name,
    description: c.seoText || c.blurb,
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

  const jsonLdList: any[] = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: dict.category.home, item: `${site.url}/${l}` },
        { "@type": "ListItem", position: 2, name: dict.category.gallery, item: `${site.url}/${l}/gallery` },
        { "@type": "ListItem", position: 3, name: c.name, item: `${site.url}/${l}/category/${category}` },
      ],
    }
  ];

  const categoryWithSeo = c as any;
  if (categoryWithSeo.faqs && categoryWithSeo.faqs.length > 0) {
    jsonLdList.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: categoryWithSeo.faqs.map((faq: any) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    });
  }

  return (
    <section className="container section">
      {jsonLdList.map((ld, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ))}
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
          {categoryWithSeo.seoTitle || dict.seo.categoryFooterTitle.replace("{category}", c.name)}
        </h2>
        <p style={{ color: "var(--text-2)", lineHeight: "1.65", fontSize: "0.98rem" }}>
          {categoryWithSeo.seoText || dict.seo.categoryFooterText.replace("{category}", c.name)}
        </p>

        {/* Category FAQs for SEO Rich Snippets */}
        {categoryWithSeo.faqs && categoryWithSeo.faqs.length > 0 && (
          <div style={{ marginTop: "3rem", borderTop: "1px solid var(--line)", paddingTop: "2rem" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1.2rem" }}>
              {l === "th" ? "คำถามที่พบบ่อย (FAQ)" : "Frequently Asked Questions (FAQ)"}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {categoryWithSeo.faqs.map((faq: any, idx: number) => (
                <div key={idx} style={{ background: "var(--bg-alt)", padding: "1.25rem 1.5rem", borderRadius: "14px", border: "1px solid var(--line)" }}>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--text-1)", margin: "0 0 0.5rem 0" }}>{faq.q}</h4>
                  <p style={{ fontSize: "0.95rem", color: "var(--text-2)", margin: 0, lineHeight: "1.55" }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
