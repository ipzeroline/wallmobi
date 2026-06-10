import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { alternates } from "@/lib/seo";
import { site } from "@/lib/site";
import { getAllBlogPosts } from "@/lib/blog";
import BlogSearchList from "@/components/BlogSearchList";

const blogSeoCopy: Record<Locale, { title: string; description: string; intro: string; topicsTitle: string }> = {
  en: {
    title: "Mobile Wallpaper Blog: Design Ideas, AI Art Trends and Lock Screen Tips",
    description:
      "Read practical mobile wallpaper guides, AI art trends, lock screen design tips, color ideas and phone personalization articles from WallMobi.",
    intro:
      "Browse practical guides for choosing mobile wallpapers, improving lock screen readability, following AI wallpaper trends and making your phone feel more personal.",
    topicsTitle: "Explore popular wallpaper topics",
  },
  th: {
    title: "บทความวอลเปเปอร์มือถือ: ไอเดียแต่งหน้าจอ เทรนด์ AI และคำแนะนำใช้งานจริง",
    description:
      "รวมบทความวอลเปเปอร์มือถือ ไอเดียแต่งหน้าจอ ล็อกสกรีน เทรนด์วอลเปเปอร์ AI การเลือกสี ฟอนต์ และดีไซน์สำหรับ iPhone และ Android",
    intro:
      "อ่านคู่มือเลือกวอลเปเปอร์มือถือ ไอเดียแต่งหน้าจอล็อกสกรีน เทรนด์วอลเปเปอร์ AI การใช้สี ฟอนต์ และการจัดหน้าจอให้เหมาะกับ iPhone และ Android",
    topicsTitle: "หัวข้อวอลเปเปอร์ยอดนิยม",
  },
  vi: {
    title: "Blog hình nền điện thoại: Ý tưởng thiết kế, xu hướng AI và mẹo màn hình khóa",
    description:
      "Đọc hướng dẫn hình nền điện thoại, xu hướng hình nền AI, mẹo màn hình khóa, phối màu và cá nhân hóa điện thoại từ WallMobi.",
    intro:
      "Khám phá các hướng dẫn chọn hình nền điện thoại, cải thiện màn hình khóa, theo dõi xu hướng AI và cá nhân hóa thiết bị.",
    topicsTitle: "Chủ đề hình nền phổ biến",
  },
  my: {
    title: "ဖုန်းနောက်ခံပုံ Blog: ဒီဇိုင်းအိုင်ဒီယာ၊ AI Art Trend နှင့် Lock Screen အကြံပြုချက်များ",
    description:
      "WallMobi မှ ဖုန်းနောက်ခံပုံ လမ်းညွှန်၊ AI wallpaper trend၊ lock screen tip၊ အရောင်ရွေးချယ်နည်းနှင့် ဖုန်းစိတ်ကြိုက်ပြင်ဆင်နည်းများ။",
    intro:
      "ဖုန်းနောက်ခံပုံရွေးချယ်နည်း၊ lock screen ဖတ်ရလွယ်စေရန်နည်းလမ်းများ၊ AI wallpaper trend နှင့် ဖုန်းစိတ်ကြိုက်ဒီဇိုင်းအကြံပြုချက်များကို ဖတ်ရှုပါ။",
    topicsTitle: "လူကြိုက်များသော wallpaper ခေါင်းစဉ်များ",
  },
  lo: {
    title: "ບົດຄວາມວໍລເປເປີມືຖື: ໄອເດຍແຕ່ງໜ້າຈໍ ເທຣນ AI ແລະຄຳແນະນຳ",
    description:
      "ລວມບົດຄວາມວໍລເປເປີມືຖື ໄອເດຍໜ້າຈໍລັອກ ເທຣນວໍລເປເປີ AI ການເລືອກສີ ແລະການຈັດໜ້າຈໍ.",
    intro:
      "ອ່ານຄູ່ມືເລືອກວໍລເປເປີມືຖື ໄອເດຍແຕ່ງໜ້າຈໍລັອກ ເທຣນ AI ແລະການຈັດໜ້າຈໍໃຫ້ເໝາະກັບການໃຊ້ງານ.",
    topicsTitle: "ຫົວຂໍ້ວໍລເປເປີຍອດນິຍົມ",
  },
  km: {
    title: "អត្ថបទផ្ទាំងរូបភាពទូរស័ព្ទ៖ គំនិតរចនា និន្នាការ AI និងគន្លឹះ lock screen",
    description:
      "អានមគ្គុទ្ទេសក៍ផ្ទាំងរូបភាពទូរស័ព្ទ និន្នាការ AI គន្លឹះ lock screen ការជ្រើសរើសពណ៌ និងការតុបតែងទូរស័ព្ទពី WallMobi។",
    intro:
      "ស្វែងរកមគ្គុទ្ទេសក៍ជ្រើសរើសផ្ទាំងរូបភាពទូរស័ព្ទ កែលម្អ lock screen តាមដាននិន្នាការ AI និងធ្វើឱ្យទូរស័ព្ទមានស្ទីលផ្ទាល់ខ្លួន។",
    topicsTitle: "ប្រធានបទផ្ទាំងរូបភាពពេញនិយម",
  },
};

const topicLinks: Record<Locale, { label: string; href: string }[]> = {
  en: [
    { label: "Minimal wallpapers", href: "/category/minimal" },
    { label: "Aesthetic wallpapers", href: "/category/aesthetic" },
    { label: "AMOLED wallpapers", href: "/category/amoled" },
    { label: "AI wallpaper trends", href: "/blog/rise-of-ai-wallpaper-art" },
  ],
  th: [
    { label: "วอลเปเปอร์มินิมอล", href: "/category/minimal" },
    { label: "วอลเปเปอร์ aesthetic", href: "/category/aesthetic" },
    { label: "วอลเปเปอร์ AMOLED", href: "/category/amoled" },
    { label: "เทรนด์วอลเปเปอร์ AI", href: "/blog/rise-of-ai-wallpaper-art" },
  ],
  vi: [
    { label: "Hình nền tối giản", href: "/category/minimal" },
    { label: "Hình nền aesthetic", href: "/category/aesthetic" },
    { label: "Hình nền AMOLED", href: "/category/amoled" },
    { label: "Xu hướng hình nền AI", href: "/blog/rise-of-ai-wallpaper-art" },
  ],
  my: [
    { label: "Minimal wallpapers", href: "/category/minimal" },
    { label: "Aesthetic wallpapers", href: "/category/aesthetic" },
    { label: "AMOLED wallpapers", href: "/category/amoled" },
    { label: "AI wallpaper trends", href: "/blog/rise-of-ai-wallpaper-art" },
  ],
  lo: [
    { label: "ວໍລເປເປີມິນິມອນ", href: "/category/minimal" },
    { label: "ວໍລເປເປີ aesthetic", href: "/category/aesthetic" },
    { label: "ວໍລເປເປີ AMOLED", href: "/category/amoled" },
    { label: "ເທຣນວໍລເປເປີ AI", href: "/blog/rise-of-ai-wallpaper-art" },
  ],
  km: [
    { label: "ផ្ទាំងរូបភាព minimal", href: "/category/minimal" },
    { label: "ផ្ទាំងរូបភាព aesthetic", href: "/category/aesthetic" },
    { label: "ផ្ទាំងរូបភាព AMOLED", href: "/category/amoled" },
    { label: "និន្នាការ AI wallpaper", href: "/blog/rise-of-ai-wallpaper-art" },
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = blogSeoCopy[locale];
  return {
    title: copy.title,
    description: copy.description,
    keywords: [
      "mobile wallpaper blog",
      "phone wallpaper tips",
      "AI wallpaper trends",
      "lock screen wallpaper",
      "วอลเปเปอร์มือถือ",
      "บทความวอลเปเปอร์",
      "แต่งหน้าจอมือถือ",
    ],
    alternates: alternates(locale, "/blog"),
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: `${site.url}/${locale}/blog`,
      siteName: site.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      creator: site.twitter,
    },
  };
}

export default async function BlogListPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);
  const copy = blogSeoCopy[l];
  const posts = getAllBlogPosts();
  const pageUrl = `${site.url}/${l}/blog`;

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
      },
      {
        "@type": "Blog",
        "@id": `${pageUrl}#blog`,
        name: copy.title,
        description: copy.description,
        url: pageUrl,
        inLanguage: l,
        publisher: { "@type": "Organization", name: site.name, url: site.url },
        blogPost: posts.slice(0, 20).map((post) => ({
          "@type": "BlogPosting",
          headline: post.title[l],
          description: post.excerpt[l],
          url: `${site.url}/${l}/blog/${post.slug}`,
          datePublished: post.published,
          dateModified: post.updated ?? post.published,
          author: { "@type": "Person", name: post.author },
          image: post.ogImage || post.coverImage ? `${site.url}${post.ogImage ?? post.coverImage}` : undefined,
        })),
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#articles`,
        name: copy.title,
        itemListElement: posts.slice(0, 20).map((post, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${site.url}/${l}/blog/${post.slug}`,
          name: post.title[l],
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: dict.category.home, item: `${site.url}/${l}` },
          { "@type": "ListItem", position: 2, name: dict.nav.blog, item: pageUrl },
        ],
      },
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
        <h1 className="h2">{copy.title}</h1>
        <p className="lede" style={{ marginTop: ".5rem" }}>
          {copy.intro}
        </p>
      </div>

      <nav aria-label={copy.topicsTitle} style={{ margin: "1.5rem 0 2rem" }}>
        <p className="eyebrow" style={{ marginBottom: ".75rem" }}>{copy.topicsTitle}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: ".65rem" }}>
          {topicLinks[l].map((topic) => (
            <Link key={topic.href} href={`/${l}${topic.href}`} className="tag" style={{ textDecoration: "none" }}>
              {topic.label}
            </Link>
          ))}
        </div>
      </nav>

      <BlogSearchList posts={posts} locale={l} siteName={site.name} />
    </section>
  );
}
