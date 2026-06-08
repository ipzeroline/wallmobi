import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { alternates } from "@/lib/seo";
import { site } from "@/lib/site";
import { getAllBlogPosts } from "@/lib/blog";
import BlogSearchList from "@/components/BlogSearchList";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.nav.blog,
    description: dict.meta.description,
    alternates: alternates(locale, "/blog"),
  };
}

export default async function BlogListPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);
  const posts = getAllBlogPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: dict.category.home, item: `${site.url}/${l}` },
      { "@type": "ListItem", position: 2, name: dict.nav.blog, item: `${site.url}/${l}/blog` },
    ],
  };

  return (
    <section className="container section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="crumb" aria-label="Breadcrumb">
        <Link href={`/${l}`}>{dict.category.home}</Link><i>/</i>
        <span style={{ color: "var(--text-2)" }}>{dict.nav.blog}</span>
      </nav>

      <div className="section-head" style={{ marginTop: "1.5rem" }}>
        <h1 className="h2">{dict.nav.blog}</h1>
        <p className="lede" style={{ marginTop: ".5rem" }}>
          {l === "th"
            ? "อ่านเคล็ดลับการแต่งหน้าจอมือถือ เทรนด์วอลเปเปอร์ AI และบทความออกแบบที่น่าสนใจ"
            : "Explore mobile personalization tips, AI wallpaper trends, and visual design insights."}
        </p>
      </div>

      <BlogSearchList posts={posts} locale={l} siteName={site.name} />
    </section>
  );
}
