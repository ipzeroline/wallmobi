import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { alternates } from "@/lib/seo";
import { site } from "@/lib/site";
import { getBlogPost, blogPosts } from "@/lib/blog";
import { getDbByCategories } from "@/lib/db-wallpapers";
import WallpaperCard from "@/components/WallpaperCard";
import BlogActions from "@/components/BlogActions";
import BlogViewCounter from "@/components/BlogViewCounter";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPost(slug);
  if (!isLocale(locale) || !post) return {};

  const title = post.title[locale];
  const desc = post.excerpt[locale];
  const previewImage = post.ogImage ?? post.coverImage;
  const image = previewImage ? `${site.url}${previewImage}` : undefined;
  const imageSize = post.ogImage
    ? { width: 1200, height: 630 }
    : { width: 800, height: 400 };
  const keywords = blogSeoKeywords(slug, locale, post.tags);

  return {
    title,
    description: desc,
    keywords,
    authors: [{ name: post.author }],
    category: "Mobile wallpapers",
    alternates: alternates(locale, `/blog/${slug}`),
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    openGraph: {
      title,
      description: desc,
      url: `${site.url}/${locale}/blog/${slug}`,
      siteName: site.name,
      type: "article",
      publishedTime: post.published,
      modifiedTime: post.updated ?? post.published,
      authors: [post.author],
      tags: post.tags,
      images: image ? [
        {
          url: image,
          width: imageSize.width,
          height: imageSize.height,
          alt: title,
        }
      ] : [],
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      creator: site.twitter,
      images: image ? [image] : undefined,
    },
  };
}

function blogSeoKeywords(slug: string, locale: Locale, tags: string[]) {
  const defaults = [
    "phone wallpaper",
    "mobile wallpaper",
    "lock screen wallpaper",
    "free wallpaper",
    ...tags,
  ];

  const bySlug: Record<string, Partial<Record<Locale, string[]>>> = {
    "thai-typography-quotes-inspiration": {
      th: [
        "วอลเปเปอร์คำคมภาษาไทย",
        "วอลเปเปอร์ตัวอักษรไทย",
        "วอลเปเปอร์คำคมให้กำลังใจ",
        "พื้นหลังมือถือคำคม",
        "วอลเปเปอร์มินิมอลภาษาไทย",
        "ภาพพื้นหลังมือถือภาษาไทย",
      ],
      en: [
        "Thai typography wallpaper",
        "Thai quote wallpaper",
        "minimal quote wallpaper",
        "inspirational lock screen",
        "Thai lettering wallpaper",
      ],
    },
  };

  return [...(bySlug[slug]?.[locale] ?? []), ...defaults];
}

function countArticleWords(text: string, locale: Locale) {
  if (locale === "en") return text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(text.replace(/\s+/g, "").length / 5));
}

// Custom parser to render markdown style links [text](/url) dynamically into localized Link elements
function renderTextWithLinks(text: string, locale: Locale) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const [_, linkText, url] = match;
    const matchIndex = match.index;

    if (matchIndex > lastIndex) {
      parts.push(text.substring(lastIndex, matchIndex));
    }

    let finalUrl = url;
    if (url.startsWith("/")) {
      finalUrl = `/${locale}${url}`;
    }

    parts.push(
      <Link
        key={matchIndex}
        href={finalUrl}
        className="prose-link"
      >
        {linkText}
      </Link>
    );

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getBlogPost(slug);
  if (!isLocale(locale) || !post) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);

  // Contextual wallpaper suggestions matching the blog topic
  const categorySuggestions: Record<string, string[]> = {
    "how-to-customize-phone-wallpaper": ["amoled", "dark"],
    "rise-of-ai-wallpaper-art": ["cyberpunk", "fantasy"],
    "choosing-the-right-wallpaper-color-for-eyes": ["nature", "space"],
    "svg-vs-png-mobile-wallpapers": ["aesthetic", "neon"],
    "thai-typography-quotes-inspiration": ["minimal", "aesthetic"],
  };

  const suggestedCats = categorySuggestions[slug] ?? ["aesthetic"];
  const recommendedWallpapers = await getDbByCategories(suggestedCats, l, 4);

  // Calculate dynamic reading time
  const totalText = post.content
    .map((sec) => {
      if (sec.type === "paragraph" || sec.type === "quote") {
        return sec.text[l] || "";
      }
      if (sec.type === "list") {
        return sec.items.map((item) => item[l] || "").join(" ");
      }
      return "";
    })
    .join(" ");
  
  const charCount = totalText.length;
  const readTime = l === "en" 
    ? Math.max(1, Math.ceil(totalText.split(/\s+/).length / 200)) 
    : Math.max(1, Math.ceil(charCount / 300));
  const wordCount = countArticleWords(totalText, l);

  // Extract h2 and h3 headings for Table of Contents
  const headings = post.content
    .map((sec, i) =>
      sec.type === "heading"
        ? {
            text: sec.text[l],
            id: `section-${i}`,
            level: sec.level,
          }
        : null
    )
    .filter((h): h is { text: string; id: string; level: 2 | 3 } => h !== null);

  const pageUrl = `${site.url}/${l}/blog/${slug}`;
  const previewImage = post.ogImage ?? post.coverImage;

  // Structured Data (JSON-LD) with BlogPosting, BreadcrumbList, and FAQPage (if applicable)
  const jsonLd: any = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${pageUrl}#post`,
        headline: post.title[l],
        description: post.excerpt[l],
        image: previewImage ? `${site.url}${previewImage}` : undefined,
        datePublished: post.published,
        dateModified: post.updated ?? post.published,
        author: { "@type": "Person", name: post.author },
        publisher: { 
          "@type": "Organization", 
          name: site.name, 
          url: site.url,
          logo: {
            "@type": "ImageObject",
            url: `${site.url}/icon.png`
          }
        },
        mainEntityOfPage: pageUrl,
        inLanguage: l,
        isAccessibleForFree: true,
        articleSection: post.tags[0] ?? "mobile wallpapers",
        keywords: blogSeoKeywords(slug, l, post.tags).join(", "),
        wordCount,
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: post.title[l],
        description: post.excerpt[l],
        inLanguage: l,
        isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
        primaryImageOfPage: previewImage
          ? { "@type": "ImageObject", url: `${site.url}${previewImage}`, width: 1200, height: 630 }
          : undefined,
        datePublished: post.published,
        dateModified: post.updated ?? post.published,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: dict.category.home, item: `${site.url}/${l}` },
          { "@type": "ListItem", position: 2, name: dict.nav.blog, item: `${site.url}/${l}/blog` },
          { "@type": "ListItem", position: 3, name: post.title[l], item: pageUrl },
        ],
      },
    ],
  };

  if (post.faqs && post.faqs.length > 0) {
    jsonLd["@graph"].push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      "mainEntity": post.faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question[l],
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer[l]
        }
      }))
    });
  }

  return (
    <section className="container section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="crumb" aria-label="Breadcrumb">
        <Link href={`/${l}`}>{dict.category.home}</Link><i>/</i>
        <Link href={`/${l}/blog`}>{dict.nav.blog}</Link><i>/</i>
        <span style={{ color: "var(--text-2)" }}>{post.title[l]}</span>
      </nav>

      <article style={{ maxWidth: "700px", margin: "2rem auto 0" }}>
        <header style={{ marginBottom: "2rem", borderBottom: "1px solid var(--line)", paddingBottom: "1.5rem" }}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "0.8rem" }}>
            {post.tags.map((tag) => (
              <span key={tag} className="tag">
                #{tag}
              </span>
            ))}
          </div>
          <h1 style={{ fontSize: "2.25rem", fontWeight: 700, lineHeight: "1.25", color: "var(--text-1)", letterSpacing: "-0.5px" }}>
            {post.title[l]}
          </h1>
          <div style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px", fontSize: "0.9rem", color: "var(--text-3)" }}>
            <span>{post.author}</span>
            <span>•</span>
            <span>
              {new Date(post.published).toLocaleDateString(l === "en" ? "en-US" : l, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span>•</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
              ⏱️ {readTime} {l === "th" ? "นาทีในการอ่าน" : "min read"}
            </span>
            <span>•</span>
            <BlogViewCounter slug={slug} locale={l} />
          </div>
        </header>

        {post.coverImage && (
          <div style={{ width: "100%", height: "320px", borderRadius: "18px", overflow: "hidden", border: "1px solid var(--line)", marginBottom: "2rem", background: "var(--bg-alt)" }}>
            <img src={post.coverImage} alt={post.title[l]} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}

        {/* SEO: Key Takeaways Panel */}
        {post.takeaways && post.takeaways.length > 0 && (
          <div
            style={{
              borderLeft: "4px solid var(--accent)",
              background: "rgba(0, 113, 227, 0.04)",
              borderRadius: "0 14px 14px 0",
              padding: "1.25rem 1.5rem",
              marginBottom: "2rem",
            }}
          >
            <h4
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "var(--accent)",
                marginBottom: "0.75rem",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: 0,
              }}
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {l === "th" ? "สรุปประเด็นสำคัญ (Key Takeaways)" : "Key Takeaways"}
            </h4>
            <ul style={{ listStyleType: "none", paddingLeft: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
              {post.takeaways.map((takeaway, idx) => (
                <li
                  key={idx}
                  style={{
                    fontSize: "0.95rem",
                    color: "var(--text-2)",
                    position: "relative",
                    paddingLeft: "1.25rem",
                    lineHeight: "1.45",
                  }}
                >
                  <span style={{ position: "absolute", left: 0, color: "var(--accent)" }}>•</span>
                  {takeaway[l]}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* SEO: Table of Contents */}
        {headings.length > 0 && (
          <div
            style={{
              background: "var(--bg-alt)",
              border: "1px solid var(--line)",
              borderRadius: "14px",
              padding: "1.25rem 1.5rem",
              marginBottom: "2rem",
            }}
          >
            <h4
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                marginBottom: "0.75rem",
                color: "var(--text-1)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: 0,
              }}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              {l === "th" ? "สารบัญ" : "Table of Contents"}
            </h4>
            <ul style={{ listStyleType: "none", paddingLeft: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
              {headings.map((h) => (
                <li
                  key={h.id}
                  style={{
                    paddingLeft: h.level === 3 ? "1.25rem" : "0",
                    fontSize: "0.92rem",
                  }}
                >
                  <a
                    href={`#${h.id}`}
                    style={{
                      textDecoration: "underline",
                      textUnderlineOffset: "3px",
                      textDecorationColor: "transparent",
                      transition: "text-decoration-color 0.2s var(--ease)",
                    }}
                    className="toc-link"
                  >
                    {h.text}
                  </a>
                </li>
              ))}
              {post.faqs && post.faqs.length > 0 && (
                <li style={{ fontSize: "0.92rem" }}>
                  <a
                    href="#faq-section"
                    style={{
                      textDecoration: "underline",
                      textUnderlineOffset: "3px",
                      textDecorationColor: "transparent",
                      transition: "text-decoration-color 0.2s var(--ease)",
                    }}
                    className="toc-link"
                  >
                    {l === "th" ? "คำถามที่พบบ่อย (FAQ)" : "Frequently Asked Questions (FAQ)"}
                  </a>
                </li>
              )}
            </ul>
          </div>
        )}

        <div className="prose" style={{ fontSize: "1.05rem", lineHeight: "1.75", color: "var(--text-2)" }}>
          {post.content.map((sec, i) => {
            switch (sec.type) {
              case "paragraph":
                return (
                  <p key={i} style={{ marginBottom: "1.4rem" }}>
                    {renderTextWithLinks(sec.text[l], l)}
                  </p>
                );
              case "heading":
                const Tag = sec.level === 2 ? "h2" : "h3";
                return (
                  <Tag
                    id={`section-${i}`}
                    key={i}
                    style={{
                      fontSize: sec.level === 2 ? "1.55rem" : "1.25rem",
                      fontWeight: 600,
                      marginTop: "2.2rem",
                      marginBottom: "0.9rem",
                      color: "var(--text-1)",
                      lineHeight: "1.3",
                      scrollMarginTop: "80px",
                    }}
                  >
                    {sec.text[l]}
                  </Tag>
                );
              case "list":
                return (
                  <ul key={i} style={{ paddingLeft: "1.5rem", marginBottom: "1.4rem", listStyleType: "disc" }}>
                    {sec.items.map((item, idx) => (
                      <li key={idx} style={{ marginBottom: "0.5rem" }}>
                        {renderTextWithLinks(item[l], l)}
                      </li>
                    ))}
                  </ul>
                );
              case "quote":
                return (
                  <blockquote
                    key={i}
                    style={{
                      borderLeft: "3px solid var(--accent)",
                      paddingLeft: "1.5rem",
                      fontStyle: "italic",
                      margin: "2rem 0",
                      color: "var(--text-1)",
                    }}
                  >
                    <p style={{ fontSize: "1.15rem", marginBottom: "0.4rem" }}>“{sec.text[l]}”</p>
                    {sec.author && (
                      <cite style={{ fontSize: "0.9rem", color: "var(--text-3)", display: "block", fontStyle: "normal" }}>
                        — {sec.author[l]}
                      </cite>
                    )}
                  </blockquote>
                );
              default:
                return null;
            }
          })}
        </div>

        {/* SEO: FAQ Section Accordion/Grid */}
        {post.faqs && post.faqs.length > 0 && (
          <div id="faq-section" style={{ marginTop: "4.5rem", paddingTop: "2.5rem", borderTop: "1px solid var(--line)", scrollMarginTop: "80px" }}>
            <h3
              style={{
                fontSize: "1.45rem",
                fontWeight: 700,
                color: "var(--text-1)",
                marginBottom: "1.5rem",
                letterSpacing: "-0.3px",
                marginTop: 0,
              }}
            >
              {l === "th" ? "คำถามที่พบบ่อย (FAQ)" : "Frequently Asked Questions (FAQ)"}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {post.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "var(--bg-alt)",
                    borderRadius: "14px",
                    padding: "1.25rem 1.5rem",
                    border: "1px solid var(--line)",
                  }}
                >
                  <h4 style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--text-1)", marginBottom: "0.5rem", marginTop: 0 }}>
                    {faq.question[l]}
                  </h4>
                  <p style={{ fontSize: "0.98rem", color: "var(--text-2)", lineHeight: "1.55", margin: 0 }}>
                    {faq.answer[l]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEO: Author Bio Box for E-E-A-T */}
        <div
          style={{
            marginTop: "3.5rem",
            padding: "1.5rem 1.75rem",
            background: "var(--bg-alt)",
            borderRadius: "16px",
            border: "1px solid var(--line)",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "1.25rem",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #0071e3 0%, #7b4bd6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1.2rem",
              flexShrink: 0,
            }}
          >
            WM
          </div>
          <div>
            <h4 style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--text-1)", margin: "0 0 4px 0" }}>
              {post.author}
            </h4>
            <p style={{ fontSize: "0.85rem", color: "var(--text-3)", margin: "0 0 8px 0", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 500 }}>
              {l === "th" ? "ผู้เผยแพร่และกลุ่มนักออกแบบ" : "Publisher & Design Collective"}
            </p>
            <p style={{ fontSize: "0.92rem", color: "var(--text-2)", lineHeight: "1.45", margin: 0 }}>
              {
                {
                  en: "WallMobi Studio is a digital art collective specializing in premium vector and AI-generated wallpapers optimized for modern smartphone displays.",
                  th: "WallMobi Studio กลุ่มศิลปินดิจิทัลผู้เชี่ยวชาญในการออกแบบภาพเวกเตอร์และวอลเปเปอร์ที่สร้างด้วย AI ซึ่งปรับแต่งเป็นพิเศษสำหรับจอสมาร์ทโฟนโดยเฉพาะ",
                  vi: "WallMobi Studio là một nhóm nghệ sĩ kỹ thuật số chuyên về hình nền vector cao cấp và hình nền do AI tạo ra, được tối ưu hóa cho màn hình điện thoại di động.",
                  my: "WallMobi Studio သည် စမတ်ဖုန်းစခရင်များအတွက် အထူးပြုလုပ်ထားသော Vector နှင့် AI ဖုန်းနောက်ခံပုံများကို ဖန်တီးသော အနုပညာအဖွဲ့ဖြစ်သည်။",
                  lo: "WallMobi Studio ກຸ່ມສິລະປິນດິຈิທັນຜູ້ຊ່ຽວຊານໃນການອອກແບບພາບເວັກເຕີແລະວໍລເປເປີທີ່ສ້າງດ້ວຍ AI ເຊິ່ງປັບແຕ່ງເປັນພິເສດສຳລັບຈໍສະມາດໂຟນ",
                  km: "WallMobi Studio គឺជាក្រុមសិល្បករឌីជីថលដែលមានឯកទេសខាងផ្ទាំងរូបភាពវ៉ិចទ័រ និងផ្ទាំងរូបភាព AI ដែលត្រូវបានរចនាឡើងសម្រាប់អេក្រង់ទូរស័ព្ទ។",
                }[l]
              }
            </p>
          </div>
        </div>

        {/* Dynamic Share & User Interaction Poll Client Component */}
        <BlogActions url={pageUrl} title={post.title[l]} locale={l} />

        {/* SEO Internal Linking: Recommended Wallpapers */}
        {recommendedWallpapers.length > 0 && (
          <div style={{ marginTop: "1.5rem", paddingTop: "1rem" }}>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 600, marginBottom: "1.5rem", color: "var(--text-1)", letterSpacing: "-0.2px", marginTop: 0 }}>
              {l === "th" ? "วอลเปเปอร์แนะนำที่เกี่ยวข้องกับบทความนี้" : "Related Wallpapers Recommended for You"}
            </h3>
            <div className="grid">
              {recommendedWallpapers.map((wp) => (
                <WallpaperCard key={wp.slug} wp={wp} locale={l} dict={dict} />
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between" }}>
          <Link href={`/${l}/blog`} className="btn btn-soft">
            ← {l === "th" ? "กลับไปที่บทความทั้งหมด" : "Back to all articles"}
          </Link>
          <Link href={`/${l}/gallery`} className="btn btn-primary">
            {l === "th" ? "สำรวจแกลเลอรีทั้งหมด" : "Explore full gallery"} →
          </Link>
        </div>
      </article>
    </section>
  );
}
