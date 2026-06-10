import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { alternates } from "@/lib/seo";
import { getDbWallpapersPage } from "@/lib/db-wallpapers";
import GalleryGrid from "@/components/GalleryGrid";
import { site } from "@/lib/site";
import { GALLERY_PAGE_SIZE, galleryFaqs, gallerySeoCopy, galleryTopicLinks } from "@/lib/gallery-seo";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = gallerySeoCopy[locale];
  return {
    title: copy.title,
    description: copy.description,
    alternates: alternates(locale, "/gallery"),
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: `${site.url}/${locale}/gallery`,
      siteName: site.name,
      type: "website",
    },
    twitter: { card: "summary_large_image", title: copy.title, description: copy.description, creator: site.twitter },
  };
}

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);
  const page = await getDbWallpapersPage(l, 1, GALLERY_PAGE_SIZE);
  const copy = gallerySeoCopy[l];
  const pageUrl = `${site.url}/${l}/gallery`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#collection`,
        url: pageUrl,
        name: copy.title,
        description: copy.description,
        inLanguage: l,
        isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
        mainEntity: { "@id": `${pageUrl}#itemlist` },
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#itemlist`,
        numberOfItems: page.total,
        itemListElement: page.wallpapers.map((wp, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${site.url}/${l}/${wp.category}-wallpapers/${wp.slug}`,
          name: wp.title,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: dict.category.home, item: `${site.url}/${l}` },
          { "@type": "ListItem", position: 2, name: dict.category.gallery, item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: galleryFaqs[l].map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };

  return (
    <section className="container section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="section-head">
        <p className="eyebrow">{dict.gallery.eyebrow}</p>
        <h1 className="h2">{dict.gallery.title}</h1>
      </div>
      <p style={{ color: "var(--text-2)", maxWidth: "720px", lineHeight: 1.65, margin: "-1rem 0 2rem" }}>
        {copy.intro}
      </p>

      <nav aria-label={copy.topicsTitle} style={{ margin: "0 0 2rem" }}>
        <p className="eyebrow" style={{ marginBottom: ".75rem" }}>{copy.topicsTitle}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: ".65rem" }}>
          {galleryTopicLinks[l].map((topic) => (
            <Link key={topic.href} href={`/${l}${topic.href}`} className="tag" style={{ textDecoration: "none" }}>
              {topic.label}
            </Link>
          ))}
        </div>
      </nav>

      <GalleryGrid
        wallpapers={page.wallpapers}
        locale={l}
        dict={dict}
        initialHasMore={page.hasMore}
        initialPage={page.page}
        pageSize={page.limit}
      />

      <div style={{ maxWidth: "820px", margin: "4rem auto 0", paddingTop: "2rem", borderTop: "1px solid var(--line)" }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 600, marginBottom: ".8rem" }}>{copy.guideTitle}</h2>
        <p style={{ color: "var(--text-2)", fontSize: ".98rem", lineHeight: 1.65, margin: 0 }}>{copy.guideText}</p>
      </div>

      <div id="faq-section" style={{ maxWidth: "820px", margin: "3rem auto 0", paddingTop: "2rem", borderTop: "1px solid var(--line)" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1.2rem" }}>{copy.faqTitle}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {galleryFaqs[l].map((faq, idx) => (
            <div key={idx} style={{ background: "var(--bg-alt)", padding: "1.25rem 1.5rem", borderRadius: "14px", border: "1px solid var(--line)" }}>
              <h3 style={{ fontSize: "1.02rem", fontWeight: 600, color: "var(--text-1)", margin: "0 0 .5rem" }}>{faq.q}</h3>
              <p style={{ fontSize: ".95rem", color: "var(--text-2)", margin: 0, lineHeight: 1.55 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
