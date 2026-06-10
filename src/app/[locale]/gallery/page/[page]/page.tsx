import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { site } from "@/lib/site";
import { getDbWallpapersPage } from "@/lib/db-wallpapers";
import { GALLERY_PAGE_SIZE, galleryFaqs, gallerySeoCopy, galleryTopicLinks } from "@/lib/gallery-seo";
import GalleryGrid from "@/components/GalleryGrid";

export const revalidate = 300;

type Params = { locale: string; page: string };

function parsePage(value: string) {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : null;
}

function galleryPagePath(page: number) {
  return page <= 1 ? "/gallery" : `/gallery/page/${page}`;
}

export async function generateStaticParams() {
  const firstPage = await getDbWallpapersPage("en", 1, GALLERY_PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(firstPage.total / GALLERY_PAGE_SIZE));
  const params: Params[] = [];

  for (const locale of locales) {
    for (let page = 2; page <= totalPages; page += 1) {
      params.push({ locale, page: String(page) });
    }
  }

  return params;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, page: pageParam } = await params;
  const pageNumber = parsePage(pageParam);
  if (!isLocale(locale) || !pageNumber || pageNumber < 2) return {};

  const copy = gallerySeoCopy[locale];
  const pageTitle =
    locale === "th"
      ? `${copy.title} หน้า ${pageNumber}`
      : `${copy.title} - Page ${pageNumber}`;
  const pageDescription =
    locale === "th"
      ? `${copy.description} หน้า ${pageNumber} รวมรูปวอลเปเปอร์มือถือเพิ่มเติมจาก WallMobi`
      : `${copy.description} Page ${pageNumber} with more WallMobi phone wallpapers.`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: `/${locale}${galleryPagePath(pageNumber)}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `${site.url}/${locale}${galleryPagePath(pageNumber)}`,
      siteName: site.name,
      type: "website",
    },
    twitter: { card: "summary_large_image", title: pageTitle, description: pageDescription, creator: site.twitter },
  };
}

export default async function GalleryPaginatedPage({ params }: { params: Promise<Params> }) {
  const { locale, page: pageParam } = await params;
  const pageNumber = parsePage(pageParam);

  if (!isLocale(locale) || !pageNumber) notFound();
  if (pageNumber === 1) redirect(`/${locale}/gallery`);

  const l = locale as Locale;
  const dict = getDictionary(l);
  const copy = gallerySeoCopy[l];
  const page = await getDbWallpapersPage(l, pageNumber, GALLERY_PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(page.total / page.limit));

  if (pageNumber > totalPages || page.wallpapers.length === 0) notFound();

  const pageUrl = `${site.url}/${l}${galleryPagePath(pageNumber)}`;
  const prevPath = galleryPagePath(pageNumber - 1);
  const nextPath = page.hasMore ? galleryPagePath(pageNumber + 1) : null;
  const h1 = l === "th" ? `${copy.title} หน้า ${pageNumber}` : `${copy.title} - Page ${pageNumber}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#collection`,
        url: pageUrl,
        name: h1,
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
          position: (pageNumber - 1) * page.limit + index + 1,
          url: `${site.url}/${l}/${wp.category}-wallpapers/${wp.slug}`,
          name: wp.title,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: dict.category.home, item: `${site.url}/${l}` },
          { "@type": "ListItem", position: 2, name: dict.category.gallery, item: `${site.url}/${l}/gallery` },
          { "@type": "ListItem", position: 3, name: h1, item: pageUrl },
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

      <nav className="crumb" aria-label="Breadcrumb">
        <Link href={`/${l}`}>{dict.category.home}</Link><i>/</i>
        <Link href={`/${l}/gallery`}>{dict.category.gallery}</Link><i>/</i>
        <span style={{ color: "var(--text-2)" }}>{pageNumber}</span>
      </nav>

      <div className="section-head">
        <p className="eyebrow">{dict.gallery.eyebrow}</p>
        <h1 className="h2">{h1}</h1>
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

      <nav aria-label="Gallery pagination" className="center mt-lg" style={{ display: "flex", justifyContent: "center", gap: ".75rem", flexWrap: "wrap" }}>
        <Link href={`/${l}${prevPath}`} className="btn btn-soft">
          {l === "th" ? "หน้าก่อนหน้า" : "Previous"}
        </Link>
        {nextPath && (
          <Link href={`/${l}${nextPath}`} className="btn btn-soft">
            {l === "th" ? "หน้าถัดไป" : "Next"}
          </Link>
        )}
      </nav>

      <div style={{ maxWidth: "820px", margin: "4rem auto 0", paddingTop: "2rem", borderTop: "1px solid var(--line)" }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 600, marginBottom: ".8rem" }}>{copy.guideTitle}</h2>
        <p style={{ color: "var(--text-2)", fontSize: ".98rem", lineHeight: 1.65, margin: 0 }}>{copy.guideText}</p>
      </div>
    </section>
  );
}
