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
    title: "WallMobi Reviews: Free Mobile Wallpapers and Original Downloads",
    description:
      "WallMobi reviews, member feedback, and a practical guide to using WallMobi for free mobile wallpapers, lock screen backgrounds, and original downloads.",
    intro:
      "Use this page to understand what WallMobi offers before signing up: phone-ready wallpaper collections, free browsing, member downloads without watermark, and real feedback from signed-in users.",
    empty: "No member reviews yet.",
    reviewsTitle: "Member reviews",
    home: "Home",
    crumb: "Reviews",
    seoTitle: "WallMobi Reviews: Is WallMobi Good for Free Mobile Wallpapers?",
    seoBody:
      "WallMobi is built for people who want mobile wallpapers that look clean on home screens, lock screens, and modern phone displays. Guests can browse wallpaper ideas freely, while free members can download original files without the WallMobi watermark.",
    trustTitle: "Why users choose WallMobi",
    trustItems: [
      "Mobile-first wallpaper sizes for iPhone and Android screens.",
      "Free account option for original downloads without watermark.",
      "Organized categories such as anime, nature, dark, amoled, cyberpunk, cute, luxury, and minimal wallpapers.",
      "Localized browsing in English and Thai for easier discovery.",
    ],
    guideTitle: "Who is WallMobi best for?",
    guideBody:
      "WallMobi is useful for users who change phone wallpapers often, want lock screen backgrounds that fit vertical displays, or prefer browsing by style instead of searching through random image results.",
    faqTitle: "WallMobi review FAQ",
    faqs: [
      {
        q: "Is WallMobi free to use?",
        a: "Yes. Guests can browse and preview wallpapers for free, and signed-in members can download original files without watermark.",
      },
      {
        q: "Do I need an account to write a review?",
        a: "Yes. Reviews are limited to signed-in members so feedback is connected to real accounts.",
      },
      {
        q: "What kind of wallpapers are available on WallMobi?",
        a: "WallMobi includes phone wallpapers across styles such as anime, nature, amoled, dark, cyberpunk, cute, luxury, minimal, gaming, fantasy, and more.",
      },
    ],
    ctaTitle: "Try WallMobi before writing a review",
    ctaBody: "Browse the gallery, download wallpapers as a member, then share what worked well for your phone setup.",
    galleryLink: "Browse wallpapers",
    accountLink: "Create free account",
  },
  th: {
    eyebrow: "รีวิว WallMobi",
    title: "รีวิว WallMobi ดีไหม สำหรับดาวน์โหลดวอลเปเปอร์มือถือฟรี",
    description:
      "รีวิว WallMobi ข้อมูลจากสมาชิก และคำแนะนำสำหรับคนที่กำลังหาเว็บดาวน์โหลดวอลเปเปอร์มือถือฟรี ภาพล็อกสกรีน และไฟล์ต้นฉบับไม่มีลายน้ำ",
    intro:
      "หน้านี้ช่วยให้คุณตัดสินใจก่อนสมัครสมาชิก WallMobi ว่าเหมาะกับการหาวอลเปเปอร์มือถือไหม ทั้งการเลือกดูฟรี หมวดหมู่ที่ชัดเจน และการดาวน์โหลดไฟล์ต้นฉบับสำหรับสมาชิก",
    empty: "ยังไม่มีรีวิวจากสมาชิก",
    reviewsTitle: "รีวิวจากสมาชิก",
    home: "หน้าแรก",
    crumb: "รีวิว",
    seoTitle: "WallMobi ดีไหม สำหรับดาวน์โหลดวอลเปเปอร์มือถือฟรี",
    seoBody:
      "WallMobi เหมาะกับผู้ใช้ที่ต้องการวอลเปเปอร์มือถือแนวตั้งสำหรับหน้าจอโฮมและหน้าจอล็อก สามารถเลือกดูภาพได้ฟรี และสมาชิกฟรีสามารถดาวน์โหลดไฟล์ต้นฉบับแบบไม่มีลายน้ำได้",
    trustTitle: "จุดเด่นที่ทำให้ WallMobi น่าใช้",
    trustItems: [
      "วอลเปเปอร์ออกแบบสำหรับหน้าจอมือถือ iPhone และ Android",
      "สมัครสมาชิกฟรีเพื่อดาวน์โหลดไฟล์ต้นฉบับไม่มีลายน้ำ",
      "มีหมวดหมู่ชัดเจน เช่น อนิเมะ ธรรมชาติ ดาร์ก AMOLED ไซเบอร์พังก์ น่ารัก หรูหรา และมินิมอล",
      "รองรับภาษาไทยและอังกฤษ ช่วยให้ค้นหาวอลเปเปอร์ได้ง่ายขึ้น",
    ],
    guideTitle: "WallMobi เหมาะกับใคร?",
    guideBody:
      "WallMobi เหมาะกับคนที่เปลี่ยนวอลเปเปอร์มือถือบ่อย ต้องการภาพแนวตั้งที่พอดีกับหน้าจอ หรืออยากเลือกวอลเปเปอร์ตามสไตล์แทนการค้นหารูปแบบกระจัดกระจายจากหลายแหล่ง",
    faqTitle: "คำถามที่พบบ่อยเกี่ยวกับรีวิว WallMobi",
    faqs: [
      {
        q: "WallMobi ใช้งานฟรีไหม?",
        a: "ใช้งานฟรี ผู้ใช้ทั่วไปสามารถเลือกดูและพรีวิววอลเปเปอร์ได้ ส่วนสมาชิกสามารถดาวน์โหลดไฟล์ต้นฉบับแบบไม่มีลายน้ำ",
      },
      {
        q: "ต้องสมัครสมาชิกก่อนถึงจะเขียนรีวิวได้ไหม?",
        a: "ใช่ ระบบเปิดให้สมาชิกที่เข้าสู่ระบบแล้วเขียนรีวิว เพื่อให้ความคิดเห็นมาจากบัญชีผู้ใช้จริง",
      },
      {
        q: "WallMobi มีวอลเปเปอร์แนวไหนบ้าง?",
        a: "มีหลายแนว เช่น อนิเมะ ธรรมชาติ AMOLED ดาร์ก ไซเบอร์พังก์ น่ารัก หรูหรา มินิมอล เกม แฟนตาซี และหมวดอื่น ๆ",
      },
    ],
    ctaTitle: "ลองใช้ WallMobi ก่อนเขียนรีวิว",
    ctaBody: "เลือกดูแกลเลอรี ดาวน์โหลดวอลเปเปอร์ในฐานะสมาชิก แล้วแชร์ประสบการณ์ว่าเหมาะกับหน้าจอมือถือของคุณแค่ไหน",
    galleryLink: "ดูวอลเปเปอร์",
    accountLink: "สมัครสมาชิกฟรี",
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
        "@type": "FAQPage",
        "@id": `${site.url}/${l}/reviews#faq`,
        mainEntity: t.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${site.url}/#app`,
        name: site.name,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "iOS, Android",
        url: site.url,
        ...(reviews.length
          ? {
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
      </header>

      <section style={{ borderTop: "1px solid var(--line)", paddingTop: "2rem", marginBottom: "2rem" }}>
        <h2 style={{ margin: "0 0 0.75rem", fontSize: "1.45rem" }}>{t.seoTitle}</h2>
        <p style={{ margin: 0, color: "var(--text-2)", lineHeight: 1.7 }}>{t.seoBody}</p>
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        <div style={{ border: "1px solid var(--line)", background: "var(--bg-alt)", borderRadius: "16px", padding: "1.4rem" }}>
          <h2 style={{ margin: "0 0 1rem", fontSize: "1.25rem" }}>{t.trustTitle}</h2>
          <ul style={{ margin: 0, paddingLeft: "1.1rem", color: "var(--text-2)", lineHeight: 1.65 }}>
            {t.trustItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div style={{ border: "1px solid var(--line)", background: "var(--bg-alt)", borderRadius: "16px", padding: "1.4rem" }}>
          <h2 style={{ margin: "0 0 0.75rem", fontSize: "1.25rem" }}>{t.guideTitle}</h2>
          <p style={{ margin: 0, color: "var(--text-2)", lineHeight: 1.7 }}>{t.guideBody}</p>
        </div>
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

      <section style={{ borderTop: "1px solid var(--line)", paddingTop: "2rem", marginTop: "2.5rem" }}>
        <h2 style={{ margin: "0 0 1rem", fontSize: "1.35rem" }}>{t.faqTitle}</h2>
        <div style={{ display: "grid", gap: "1rem" }}>
          {t.faqs.map((faq) => (
            <details key={faq.q} style={{ border: "1px solid var(--line)", borderRadius: "14px", background: "var(--bg-alt)", padding: "1rem 1.1rem" }}>
              <summary style={{ cursor: "pointer", fontWeight: 800, color: "var(--text-1)" }}>{faq.q}</summary>
              <p style={{ margin: "0.8rem 0 0", color: "var(--text-2)", lineHeight: 1.65 }}>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section style={{ border: "1px solid var(--line)", background: "var(--bg-alt)", borderRadius: "16px", padding: "1.5rem", marginTop: "2rem" }}>
        <h2 style={{ margin: "0 0 0.6rem", fontSize: "1.3rem" }}>{t.ctaTitle}</h2>
        <p style={{ margin: "0 0 1.1rem", color: "var(--text-2)", lineHeight: 1.65 }}>{t.ctaBody}</p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link href={`/${l}/gallery`} className="btn btn-primary" style={{ padding: "0.75rem 1rem", borderRadius: "10px" }}>
            {t.galleryLink}
          </Link>
          <Link href={`/${l}/member#register`} className="btn btn-soft" style={{ padding: "0.75rem 1rem", borderRadius: "10px" }}>
            {t.accountLink}
          </Link>
        </div>
      </section>
    </article>
  );
}
