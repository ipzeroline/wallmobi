import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { alternates } from "@/lib/seo";
import { site, categorySlugs, type CategorySlug } from "@/lib/site";
import { getDbByCategory } from "@/lib/db-wallpapers";
import { wallpaperImageUrl } from "@/lib/wallpaper-url";
import WallpaperCard from "@/components/WallpaperCard";

export function generateStaticParams() {
  return categorySlugs.map((category) => ({ category }));
}

function valid(c: string): c is CategorySlug {
  return (categorySlugs as readonly string[]).includes(c);
}

type CategorySeoCopy = {
  title: string;
  description: string;
  intro: string;
  guideTitle: string;
  guideText: string;
  topicsTitle: string;
  topics: { label: string; href: string }[];
  faqs: { q: string; a: string }[];
  keywords: string[];
  ogImage?: string;
};

function categorySeoCopy(locale: Locale, category: CategorySlug, c: { name: string; blurb: string; seoTitle?: string; seoText?: string; faqs?: { q: string; a: string }[] }): CategorySeoCopy {
  const generic = {
    title: c.seoTitle || c.name,
    description: c.seoText || c.blurb,
    intro: c.blurb,
    guideTitle: c.seoTitle || `${c.name} สำหรับมือถือ`,
    guideText: c.seoText || c.blurb,
    topicsTitle: locale === "th" ? "หมวดที่เกี่ยวข้อง" : "Related categories",
    topics: [
      { label: locale === "th" ? "แกลเลอรีทั้งหมด" : "Full gallery", href: "/gallery" },
      { label: locale === "th" ? "บทความวอลเปเปอร์" : "Wallpaper blog", href: "/blog" },
      { label: locale === "th" ? "วอลเปเปอร์มินิมอล" : "Minimal wallpapers", href: "/category/minimal" },
    ],
    faqs: c.faqs || [],
    keywords: [
      c.name,
      `${category} wallpaper`,
      `${category} phone wallpaper`,
      "mobile wallpaper",
      "phone wallpaper",
      "lock screen wallpaper",
    ],
  };

  if (category !== "anime") return generic;

  if (locale === "th") {
    return {
      title: "วอลเปเปอร์อนิเมะ 4K สำหรับมือถือ ดาวน์โหลดฟรี | iPhone และ Android",
      description:
        "รวมวอลเปเปอร์อนิเมะสำหรับมือถือ ภาพแนวอบอุ่น น่ารัก ญี่ปุ่น แฟนตาซี และฉากท้องฟ้าแบบอนิเมะ ปรับขนาดให้เหมาะกับหน้าจอล็อก iPhone และ Android ดาวน์โหลดฟรี",
      intro:
        "คัดสรรวอลเปเปอร์อนิเมะสำหรับมือถือโดยเน้นภาพแนวตั้งที่เหมาะกับหน้าจอล็อกและหน้าจอโฮม ทั้งโทนอบอุ่น ท้องฟ้าสีสวย ตัวละครสไตล์อนิเมะ เมืองญี่ปุ่น และบรรยากาศแฟนตาซีที่ดูสบายตา",
      guideTitle: "วิธีเลือกวอลเปเปอร์อนิเมะให้สวยบนหน้าจอมือถือ",
      guideText:
        "วอลเปเปอร์อนิเมะที่เหมาะกับมือถือควรมีจุดโฟกัสชัด ไม่วางรายละเอียดสำคัญทับตำแหน่งนาฬิกาหรือไอคอน และมีคอนทราสต์พอดีเพื่อให้อ่านการแจ้งเตือนได้ง่าย คอลเลกชันนี้ออกแบบสำหรับหน้าจอแนวตั้ง เหมาะกับ iPhone, Samsung Galaxy และมือถือ Android รุ่นใหม่ โดยมีทั้งสไตล์น่ารัก มินิมอล แฟนตาซี และภาพบรรยากาศญี่ปุ่น",
      topicsTitle: "ค้นหาวอลเปเปอร์สไตล์ใกล้เคียง",
      topics: [
        { label: "วอลเปเปอร์ญี่ปุ่น", href: "/category/japanese" },
        { label: "วอลเปเปอร์น่ารัก", href: "/category/cute" },
        { label: "วอลเปเปอร์แฟนตาซี", href: "/category/fantasy" },
        { label: "บทความเทรนด์ AI Wallpaper", href: "/blog/rise-of-ai-wallpaper-art" },
      ],
      faqs: [
        {
          q: "วอลเปเปอร์อนิเมะในหน้านี้ใช้กับ iPhone และ Android ได้ไหม?",
          a: "ใช้ได้ครับ รูปในหมวดวอลเปเปอร์อนิเมะถูกจัดวางให้เหมาะกับหน้าจอมือถือแนวตั้ง จึงใช้ได้ทั้ง iPhone, Samsung Galaxy และมือถือ Android ส่วนใหญ่",
        },
        {
          q: "ควรเลือกวอลเปเปอร์อนิเมะแบบไหนสำหรับหน้าจอล็อก?",
          a: "ควรเลือกภาพที่มีพื้นที่ว่างบริเวณด้านบนพอสำหรับนาฬิกา มีจุดโฟกัสอยู่ช่วงกลางหรือล่างของภาพ และสีไม่รบกวนข้อความแจ้งเตือน",
        },
        {
          q: "ดาวน์โหลดวอลเปเปอร์อนิเมะฟรีหรือไม่?",
          a: "ดาวน์โหลดได้ฟรี ผู้เยี่ยมชมจะเห็นไฟล์พร้อมลายน้ำ ส่วนสมาชิกที่เข้าสู่ระบบจะได้ไฟล์ต้นฉบับแบบไม่มีลายน้ำตามระบบสมาชิกของ WallMobi",
        },
      ],
      keywords: [
        "วอลเปเปอร์อนิเมะ",
        "วอลเปเปอร์อนิเมะมือถือ",
        "วอลเปเปอร์อนิเมะ 4K",
        "วอลเปเปอร์ anime",
        "พื้นหลังมือถืออนิเมะ",
        "วอลเปเปอร์ญี่ปุ่น",
        "anime wallpaper",
        "anime phone wallpaper",
        "anime lock screen",
      ],
      ogImage: "/blog/category_anime_og.png",
    };
  }

  return {
    title: "Anime Wallpapers for Mobile: Free 4K Phone Backgrounds",
    description:
      "Browse free anime wallpapers for mobile phones, including cozy illustrations, Japanese scenery, cute characters, fantasy moods and lock screen friendly vertical designs.",
    intro:
      "Discover anime wallpapers designed for mobile lock screens and home screens, with vertical compositions, balanced colors and artwork that works well behind clocks, widgets and app icons.",
    guideTitle: "How to choose an anime wallpaper for your phone",
    guideText:
      "A good anime phone wallpaper keeps the main subject clear, avoids placing important detail under the clock area and uses enough contrast for notifications. This collection focuses on portrait layouts for iPhone, Samsung Galaxy and modern Android screens.",
    topicsTitle: "Related wallpaper styles",
    topics: [
      { label: "Japanese wallpapers", href: "/category/japanese" },
      { label: "Cute wallpapers", href: "/category/cute" },
      { label: "Fantasy wallpapers", href: "/category/fantasy" },
      { label: "AI wallpaper trends", href: "/blog/rise-of-ai-wallpaper-art" },
    ],
    faqs: [
      {
        q: "Can I use these anime wallpapers on iPhone and Android?",
        a: "Yes. The anime wallpapers are arranged for vertical mobile screens and work well on iPhone, Samsung Galaxy and most Android devices.",
      },
      {
        q: "What makes an anime wallpaper good for a lock screen?",
        a: "Choose artwork with enough empty space near the clock, a clear focal point and colors that keep notifications readable.",
      },
      {
        q: "Are the anime wallpapers free to download?",
        a: "Yes. Guests can download watermarked files for free, and signed-in members can download original files without the watermark.",
      },
    ],
    keywords: [
      "anime wallpapers",
      "anime phone wallpaper",
      "anime wallpaper 4K",
      "anime lock screen",
      "mobile wallpaper",
      "Japanese wallpaper",
      "cute anime wallpaper",
    ],
    ogImage: "/blog/category_anime_og.png",
  };
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
  const copy = categorySeoCopy(locale, category, c);
  const items = await getDbByCategory(category, locale);
  const first = items[0];
  const imageUrl = copy.ogImage
    ? `${site.url}${copy.ogImage}`
    : first
      ? `${site.url}${wallpaperImageUrl(first.slug, { width: 1200 })}`
      : undefined;
  const imageSize = copy.ogImage
    ? { width: 1200, height: 630 }
    : first
      ? { width: first.width, height: first.height }
      : { width: 1200, height: 630 };

  return {
    title: copy.title,
    description: copy.description,
    keywords: copy.keywords,
    alternates: alternates(locale, `/category/${category}`),
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: `${site.url}/${locale}/category/${category}`,
      siteName: site.name,
      type: "website",
      images: imageUrl ? [{ url: imageUrl, width: imageSize.width, height: imageSize.height, alt: copy.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      creator: site.twitter,
      images: imageUrl ? [imageUrl] : undefined,
    },
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
  const copy = categorySeoCopy(l, category, c as any);
  const pageUrl = `${site.url}/${l}/category/${category}`;
  const pageImage = copy.ogImage ? `${site.url}${copy.ogImage}` : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: copy.title,
        description: copy.description,
        inLanguage: l,
        isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
        about: { "@type": "Thing", name: c.name },
        primaryImageOfPage: pageImage
          ? { "@type": "ImageObject", url: pageImage, width: 1200, height: 630 }
          : undefined,
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#wallpapers`,
        name: copy.title,
        numberOfItems: items.length,
        itemListElement: items.slice(0, 24).map((wp, index) => ({
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
          { "@type": "ListItem", position: 2, name: dict.category.gallery, item: `${site.url}/${l}/gallery` },
          { "@type": "ListItem", position: 3, name: c.name, item: pageUrl },
        ],
      },
      ...(copy.faqs.length > 0 ? [{
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: copy.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
      }] : []),
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
        <h1 className="h2">{copy.title}</h1>
        <p className="lede" style={{ marginTop: ".5rem", maxWidth: "820px" }}>{copy.intro}</p>
        <p className="tiny" style={{ marginTop: ".6rem" }}>{items.length} {dict.category.count}</p>
      </div>

      <nav aria-label={copy.topicsTitle} style={{ margin: "1.5rem 0 2rem" }}>
        <p className="eyebrow" style={{ marginBottom: ".75rem" }}>{copy.topicsTitle}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: ".65rem" }}>
          {copy.topics.map((topic) => (
            <Link key={topic.href} href={`/${l}${topic.href}`} className="tag" style={{ textDecoration: "none" }}>
              {topic.label}
            </Link>
          ))}
        </div>
      </nav>

      <div className="grid">
        {items.map((wp, i) => (
          <WallpaperCard key={wp.slug} wp={wp} locale={l} dict={dict} priority={i < 5} />
        ))}
      </div>

      {/* Category SEO Article */}
      <div style={{ maxWidth: "800px", margin: "4rem auto 0", padding: "2rem 0 0", borderTop: "1px solid var(--line)" }}>
        <h2 style={{ fontSize: "1.45rem", fontWeight: 600, marginBottom: "0.8rem" }}>
          {copy.guideTitle}
        </h2>
        <p style={{ color: "var(--text-2)", lineHeight: "1.65", fontSize: "0.98rem" }}>
          {copy.guideText}
        </p>

        {/* Category FAQs for SEO Rich Snippets */}
        {copy.faqs.length > 0 && (
          <div style={{ marginTop: "3rem", borderTop: "1px solid var(--line)", paddingTop: "2rem" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1.2rem" }}>
              {l === "th" ? "คำถามที่พบบ่อย (FAQ)" : "Frequently Asked Questions (FAQ)"}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {copy.faqs.map((faq, idx) => (
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
