import Link from "next/link";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { categorySlugs, site } from "@/lib/site";
import { formatDownloads } from "@/lib/wallpapers";
import { getDbTrending, getDbWallpapers } from "@/lib/db-wallpapers";
import WallpaperCard from "@/components/WallpaperCard";
import { notFound } from "next/navigation";
import { getAllBlogPosts } from "@/lib/blog";
import BlogViewCounter from "@/components/BlogViewCounter";
import { seoLandingPages } from "@/lib/seo-landing-pages";

const blogSectionTitle: Record<Locale, string> = {
  en: "Latest Articles & Tips",
  th: "บทความและเคล็ดลับล่าสุด",
  vi: "Bài viết & Mẹo mới nhất",
  my: "နောက်ဆုံးထွက် ဆောင်းပါးများနှင့် အကြံပြုချက်များ",
  lo: "ບົດຄວາມ ແລະ ເຄັດລັບຫຼ້າສຸດ",
  km: "អត្ថបទ និងគន្លឹះចុងក្រោយបង្អស់"
};

const blogSectionEyebrow: Record<Locale, string> = {
  en: "Guides & Trends",
  th: "คู่มือและเทรนด์",
  vi: "Hướng dẫn & Xu hướng",
  my: "လမ်းညွှန်များနှင့် ခေတ်ရေစီးကြောင်းများ",
  lo: "ຄູ່ມື ແລະ ແນວໂນ້ມ",
  km: "មគ្គុទ្ទេសក៍ និងនិន្នាការ"
};

const viewAllBlogsText: Record<Locale, string> = {
  en: "Browse all articles",
  th: "อ่านบทความทั้งหมด",
  vi: "Xem tất cả bài viết",
  my: "ဆောင်းပါးအားလုံး ဖတ်ရန်",
  lo: "ອ່ານບົດຄວາມທັງໝົດ",
  km: "រកមើលអត្ថបទទាំងអស់"
};

const readMoreText: Record<Locale, string> = {
  en: "Read more",
  th: "อ่านต่อ",
  vi: "Đọc thêm",
  my: "ဆက်လက်ဖတ်ရှုရန်",
  lo: "ອ່ານຕໍ່",
  km: "អានបន្ថែម"
};

const SWATCH: Record<string, string> = {
  anime: "#ff9500",
  cyberpunk: "#ff2d55",
  robot: "#8e8e93",
  space: "#5856d6",
};

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);

  const allWps = await getDbWallpapers(l);
  const trending = await getDbTrending(l, 7);
  const latest = allWps.slice(0, 14);
  const totalDownloads = allWps.reduce((s, w) => s + w.downloads, 0);
  const latestPosts = getAllBlogPosts().slice(0, 10);

  const pageUrl = `${site.url}/${l}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        "mainEntity": dict.seo.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#latest-articles`,
        "name": blogSectionTitle[l],
        "numberOfItems": latestPosts.length,
        "itemListElement": latestPosts.map((post, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "url": `${site.url}/${l}/blog/${post.slug}`,
          "name": post.title[l]
        }))
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="container hero">
        <p className="eyebrow rise">{dict.hero.eyebrow}</p>
        <h1 className="display rise" style={{ marginTop: ".6rem" }}>
          {dict.hero.titleLead} <span className="em">{dict.hero.titleEm}</span>{dict.hero.titleTail}
        </h1>
        <p className="lede rise">{dict.hero.lede}</p>
        <div className="hero-cta rise">
          <Link href={`/${l}/gallery`} className="btn btn-primary">{dict.hero.ctaPrimary}</Link>
          <Link href={`/${l}/category/minimal`} className="btn btn-ghost">{dict.hero.ctaSecondary} →</Link>
        </div>
        <div className="stats rise">
          <div className="stat"><b>{allWps.length}</b><span>{dict.stats.wallpapers}</span></div>
          <div className="stat"><b>{categorySlugs.length}</b><span>{dict.stats.collections}</span></div>
          <div className="stat"><b>{formatDownloads(totalDownloads)}</b><span>{dict.stats.downloads}</span></div>
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <p className="eyebrow">{dict.sections.trendingEyebrow}</p>
          <h2 className="h2">{dict.sections.trending}</h2>
        </div>
        <div className="grid">
          {trending.map((wp, i) => (
            <WallpaperCard key={wp.slug} wp={wp} locale={l} dict={dict} priority={i < 2} />
          ))}
        </div>
      </section>

      <section className="container section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <p className="eyebrow">{dict.footer.categories}</p>
          <h2 className="h2">{dict.gallery.eyebrow}</h2>
        </div>
        <div className="cat-grid">
          {categorySlugs.map((slug) => (
            <Link key={slug} href={`/${l}/category/${slug}`} className="cat-card">
              <div className="swatch" style={{ background: SWATCH[slug] }} />
              <h3>{dict.categories[slug].name}</h3>
              <p>{dict.categories[slug].blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <p className="eyebrow">{dict.sections.latestEyebrow}</p>
          <h2 className="h2">{dict.sections.latest}</h2>
        </div>
        <div className="grid">
          {latest.map((wp) => (
            <WallpaperCard key={wp.slug} wp={wp} locale={l} dict={dict} />
          ))}
        </div>
        <div className="center mt-lg">
          <Link href={`/${l}/gallery`} className="btn btn-soft">{dict.nav.browseAll} →</Link>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="container section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <p className="eyebrow">{blogSectionEyebrow[l]}</p>
          <h2 className="h2">{blogSectionTitle[l]}</h2>
        </div>
        <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))" }}>
          {latestPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/${l}/blog/${post.slug}`}
              style={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid var(--line)",
                borderRadius: "16px",
                overflow: "hidden",
                textDecoration: "none",
                color: "inherit",
                background: "var(--bg-alt)",
                transition: "transform 0.2s var(--ease), border-color 0.2s var(--ease)",
              }}
              className="hover-card-anim"
            >
              <div
                style={{
                  height: "160px",
                  background: "linear-gradient(135deg, var(--line) 0%, var(--bg) 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottom: "1px solid var(--line)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {post.coverImage ? (
                  <img
                    src={post.coverImage}
                    alt={post.title[l]}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      fontSize: "2rem",
                      opacity: 0.25,
                      fontWeight: 800,
                      letterSpacing: "-2px",
                      color: "var(--text-1)",
                    }}
                  >
                    {site.name}
                  </div>
                )}
                <div
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    left: "16px",
                    display: "flex",
                    gap: "6px",
                    zIndex: 2,
                  }}
                >
                  {post.tags.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: "0.72rem",
                        background: "var(--surface)",
                        border: "1px solid var(--line)",
                        padding: "2px 8px",
                        borderRadius: "20px",
                        color: "var(--text-2)",
                        fontWeight: 500,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                      }}
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "0.8rem",
                    color: "var(--text-3)",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span>
                    {new Date(post.published).toLocaleDateString(l === "en" ? "en-US" : l, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <BlogViewCounter slug={post.slug} locale={l} increment={false} />
                </div>

                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    marginBottom: "0.6rem",
                    lineHeight: "1.4",
                    color: "var(--text-1)",
                  }}
                >
                  {post.title[l]}
                </h3>
                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--text-2)",
                    lineHeight: "1.5",
                    margin: 0,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {post.excerpt[l]}
                </p>
                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: "1rem",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "var(--text-1)",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  {readMoreText[l]} →
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="center mt-lg">
          <Link href={`/${l}/blog`} className="btn btn-soft">
            {viewAllBlogsText[l]} →
          </Link>
        </div>
      </section>

      {/* Device & Aesthetic Link Hub Section */}
      <section className="container section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <p className="eyebrow">{l === "th" ? "ทางเลือกสำหรับหน้าจอของคุณ" : "Optimized for your screen"}</p>
          <h2 className="h2">{l === "th" ? "วอลเปเปอร์ยอดนิยมตามรุ่นมือถือและสไตล์" : "Popular Wallpapers by Device & Style"}</h2>
        </div>
        <div 
          style={{ 
            display: "flex", 
            flexWrap: "wrap", 
            gap: "0.6rem 0.8rem", 
            marginTop: "1.5rem" 
          }}
        >
          {seoLandingPages.map((page) => (
            <Link
              key={page.slug}
              href={`/${l}/${page.slug}`}
              style={{
                fontSize: "0.88rem",
                background: "var(--bg-alt)",
                border: "1px solid var(--line)",
                padding: "8px 16px",
                borderRadius: "24px",
                color: "var(--text-2)",
                fontWeight: 500,
                textDecoration: "none",
                transition: "all 0.2s var(--ease)",
                display: "inline-block",
              }}
              className="hover-card-anim"
            >
              {page.h1[l] || page.h1.en}
            </Link>
          ))}
        </div>
      </section>

      {/* SEO Article & FAQs Section */}
      <section className="container section" style={{ paddingTop: "2rem", borderTop: "1px solid var(--line)" }}>
        <div className="seo-block" style={{ maxWidth: "800px", margin: "0 auto 3.5rem" }}>
          <h2 className="h2" style={{ fontSize: "1.55rem", marginBottom: "0.9rem", fontWeight: 600 }}>{dict.seo.homeTitle}</h2>
          <p style={{ color: "var(--text-2)", lineHeight: "1.6", marginBottom: "0.95rem", fontSize: "0.98rem" }}>
            {dict.seo.homeContent1}
          </p>
          <p style={{ color: "var(--text-2)", lineHeight: "1.6", fontSize: "0.98rem" }}>
            {dict.seo.homeContent2}
          </p>
        </div>

        <div className="seo-faq" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 className="h2" style={{ fontSize: "1.55rem", marginBottom: "1.6rem", textAlign: "center", fontWeight: 600 }}>{dict.seo.faqTitle}</h2>
          <div style={{ display: "grid", gap: "0.85rem" }}>
            {dict.seo.faqs.map((faq, idx) => (
              <details 
                key={idx} 
                className="faq-item"
                style={{
                  background: "var(--bg-alt)",
                  border: "1px solid var(--line)",
                  borderRadius: "14px",
                  padding: "1.05rem 1.3rem",
                  cursor: "pointer",
                  transition: "border-color 0.2s, background-color 0.2s"
                }}
              >
                <summary style={{ fontWeight: 600, fontSize: "1.02rem", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center", userSelect: "none" }}>
                  <span>{faq.q}</span>
                  <span className="faq-icon" style={{ transition: "transform 0.25s var(--ease)", color: "var(--text-3)", display: "flex", alignItems: "center" }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M2 4l4 4 4-4" />
                    </svg>
                  </span>
                </summary>
                <p style={{ color: "var(--text-2)", marginTop: "0.8rem", lineHeight: "1.55", fontSize: "0.95rem" }}>
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
