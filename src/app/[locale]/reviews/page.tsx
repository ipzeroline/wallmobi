import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { getApprovedReviews, isReviewLocale, type ReviewLocale } from "@/lib/reviews";
import { site } from "@/lib/site";
import ReviewForm from "./ReviewForm";

const content = {
  en: {
    eyebrow: "WallMobi reviews",
    title: "WallMobi reviews from real members",
    description:
      "Read member reviews for WallMobi, a free mobile wallpaper site with original downloads for signed-in members.",
    intro:
      "These reviews come from registered WallMobi members who use the site to find phone-ready wallpapers and original downloads.",
    empty: "No member reviews yet.",
    reviewsTitle: "Member reviews",
    home: "Home",
    crumb: "Reviews",
    seoTitle: "WallMobi Reviews: Is WallMobi Good for Free Mobile Wallpapers?",
    seoBody:
      "WallMobi focuses on phone-ready wallpapers, clean browsing, and original downloads for free members. The review page helps new users compare real experiences before creating an account.",
  },
  th: {
    eyebrow: "รีวิว WallMobi",
    title: "รีวิว WallMobi จากสมาชิกจริง",
    description:
      "อ่านรีวิว WallMobi เว็บดาวน์โหลดวอลเปเปอร์มือถือฟรี สมาชิกสามารถดาวน์โหลดไฟล์ต้นฉบับแบบไม่มีลายน้ำได้",
    intro:
      "รีวิวในหน้านี้มาจากสมาชิก WallMobi ที่ใช้งานจริงเพื่อค้นหาวอลเปเปอร์มือถือและดาวน์โหลดไฟล์ต้นฉบับ",
    empty: "ยังไม่มีรีวิวจากสมาชิก",
    reviewsTitle: "รีวิวจากสมาชิก",
    home: "หน้าแรก",
    crumb: "รีวิว",
    seoTitle: "WallMobi ดีไหม สำหรับดาวน์โหลดวอลเปเปอร์มือถือฟรี",
    seoBody:
      "WallMobi เน้นวอลเปเปอร์ที่พร้อมใช้บนมือถือ เลือกดูง่าย และสมาชิกฟรีสามารถดาวน์โหลดไฟล์ต้นฉบับได้ หน้ารีวิวช่วยให้ผู้ใช้ใหม่เห็นประสบการณ์จริงก่อนสมัครสมาชิก",
  },
};

function alternates(locale: ReviewLocale) {
  return {
    canonical: `/${locale}/reviews`,
    languages: {
      en: "/en/reviews",
      th: "/th/reviews",
      "x-default": "/en/reviews",
    },
  };
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "th" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isReviewLocale(locale)) return {};
  const t = content[locale];

  return {
    title: t.title,
    description: t.description,
    alternates: alternates(locale),
    openGraph: {
      type: "website",
      title: t.title,
      description: t.description,
      url: `/${locale}/reviews`,
    },
  };
}

export default async function ReviewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isReviewLocale(locale)) notFound();

  const l = locale as ReviewLocale;
  const t = content[l];
  const [reviews, user] = await Promise.all([getApprovedReviews(l), getSessionUser()]);
  const averageRating = reviews.length
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${site.url}/${l}/reviews#webpage`,
        url: `${site.url}/${l}/reviews`,
        name: t.title,
        description: t.description,
        inLanguage: l,
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: t.home, item: `${site.url}/${l}` },
            { "@type": "ListItem", position: 2, name: t.crumb, item: `${site.url}/${l}/reviews` },
          ],
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${site.url}/#app`,
        name: site.name,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "iOS, Android",
        url: site.url,
        ...(averageRating
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: Number(averageRating.toFixed(2)),
                reviewCount: reviews.length,
                bestRating: 5,
                worstRating: 1,
              },
              review: reviews.slice(0, 20).map((review) => ({
                "@type": "Review",
                name: review.title,
                reviewBody: review.body,
                reviewRating: {
                  "@type": "Rating",
                  ratingValue: review.rating,
                  bestRating: 5,
                  worstRating: 1,
                },
                author: { "@type": "Person", name: review.reviewerName },
                datePublished: review.createdAt,
              })),
            }
          : {}),
      },
    ],
  };

  return (
    <article className="container section" style={{ maxWidth: "980px", marginInline: "auto" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="crumb" aria-label="Breadcrumb" style={{ marginBottom: "2rem" }}>
        <Link href={`/${l}`}>{t.home}</Link><i>/</i>
        <span style={{ color: "var(--text-2)" }}>{t.crumb}</span>
      </nav>

      <header style={{ display: "grid", gap: "1rem", marginBottom: "2.5rem" }}>
        <p className="eyebrow" style={{ color: "var(--accent)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.12em", margin: 0 }}>
          {t.eyebrow}
        </p>
        <h1 className="h1" style={{ maxWidth: "760px", margin: 0, fontSize: "clamp(2rem, 5vw, 3.2rem)", lineHeight: 1.08 }}>
          {t.title}
        </h1>
        <p className="lede" style={{ maxWidth: "720px", color: "var(--text-2)", lineHeight: 1.65, margin: 0 }}>
          {t.intro}
        </p>
        {averageRating && (
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", color: "var(--text-2)", fontWeight: 700 }}>
            <span>{averageRating.toFixed(1)} / 5</span>
          </div>
        )}
      </header>

      <section style={{ borderTop: "1px solid var(--line)", paddingTop: "2rem", marginBottom: "2rem" }}>
        <h2 style={{ margin: "0 0 0.75rem", fontSize: "1.45rem" }}>{t.seoTitle}</h2>
        <p style={{ margin: 0, color: "var(--text-2)", lineHeight: 1.7 }}>{t.seoBody}</p>
      </section>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "1.5rem", alignItems: "start" }}>
        <section style={{ display: "grid", gap: "1rem" }}>
          <h2 style={{ margin: 0, fontSize: "1.35rem" }}>{t.reviewsTitle}</h2>
          {reviews.length === 0 ? (
            <div style={{ border: "1px solid var(--line)", borderRadius: "16px", padding: "1.5rem", color: "var(--text-3)", background: "var(--bg-alt)" }}>
              {t.empty}
            </div>
          ) : (
            reviews.map((review) => (
              <article key={review.id} style={{ border: "1px solid var(--line)", borderRadius: "16px", padding: "1.35rem", background: "var(--bg-alt)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", marginBottom: "0.75rem", alignItems: "start" }}>
                  <div>
                    <h3 style={{ margin: "0 0 0.35rem", fontSize: "1.05rem" }}>{review.title}</h3>
                    <p style={{ margin: 0, color: "var(--text-3)", fontSize: "0.88rem" }}>{review.reviewerName}</p>
                  </div>
                  <strong style={{ color: "var(--accent)", whiteSpace: "nowrap" }}>{review.rating} / 5</strong>
                </div>
                <p style={{ margin: 0, color: "var(--text-2)", lineHeight: 1.65, whiteSpace: "pre-line" }}>{review.body}</p>
              </article>
            ))
          )}
        </section>

        <ReviewForm locale={l} user={user ? { name: user.name, email: user.email } : null} />
      </div>
    </article>
  );
}
