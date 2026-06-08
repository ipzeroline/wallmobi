import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { alternates } from "@/lib/seo";
import { site } from "@/lib/site";
import { formatDownloads } from "@/lib/wallpapers";
import { getDbWallpaper, getDbRelated, getDbWallpapers } from "@/lib/db-wallpapers";
import WallpaperCard from "@/components/WallpaperCard";
import DownloadButton from "@/components/DownloadButton";
import FullscreenPreview from "@/components/FullscreenPreview";
import FavoriteButton from "@/components/FavoriteButton";

export async function generateStaticParams() {
  const all = await getDbWallpapers("en");
  return all.map((w) => ({
    category: `${w.category}-wallpapers`,
    slug: w.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, category, slug } = await params;
  const wp = await getDbWallpaper(slug, locale as Locale);
  if (!isLocale(locale) || !wp) return {};
  
  // Validate category URL segment matches wallpaper category
  if (category !== `${wp.category}-wallpapers`) return {};

  const desc = wp.desc[locale];
  
  const seoTitles: Record<string, string> = {
    en: `${wp.title} Wallpaper — Free Mobile Download`,
    th: `วอลเปเปอร์ ${wp.title} — ดาวน์โหลดฟรีสำหรับมือถือ`,
    vi: `Hình nền ${wp.title} — Tải miễn phí cho điện thoại`,
    my: `${wp.title} ဖုန်းနောက်ခံပုံ — အခမဲ့ဒေါင်းလုဒ်ဆွဲရန်`,
    lo: `ວໍລເປເປີ ${wp.title} — ດາວໂຫຼດຟຣີສຳລັບມືຖື`,
    km: `ផ្ទាំងរូបភាព ${wp.title} — ទាញយកដោយឥតគិតថ្លៃសម្រាប់ទូរស័ព្ទ`,
  };
  const title = seoTitles[locale] ?? `${wp.title} Wallpaper — Free Download`;

  return {
    title,
    description: desc,
    alternates: alternates(locale, `/${wp.category}-wallpapers/${slug}`),
    openGraph: { title, description: desc, images: [{ url: wp.src, width: wp.width, height: wp.height }] },
  };
}

export default async function WallpaperPage({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}) {
  const { locale, category, slug } = await params;
  const wp = await getDbWallpaper(slug, locale as Locale);
  
  if (!isLocale(locale) || !wp) notFound();
  
  // Validate category URL segment matches wallpaper category
  if (category !== `${wp.category}-wallpapers`) notFound();

  const l = locale as Locale;
  const dict = getDictionary(l);
  const related = await getDbRelated(slug, wp.category, l);
  const cat = dict.categories[wp.category];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ImageObject",
        name: wp.title,
        description: wp.desc[l],
        contentUrl: `${site.url}${wp.src}`,
        width: wp.width,
        height: wp.height,
        encodingFormat: "image/svg+xml",
        datePublished: wp.published,
        creditText: site.name,
        creator: { "@type": "Organization", name: site.author },
        license: `${site.url}/${l}/license`,
        acquireLicensePage: `${site.url}/${l}/license`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: dict.category.home, item: `${site.url}/${l}` },
          { "@type": "ListItem", position: 2, name: cat.name, item: `${site.url}/${l}/category/${wp.category}` },
          { "@type": "ListItem", position: 3, name: wp.title, item: `${site.url}/${l}/${wp.category}-wallpapers/${wp.slug}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: l === "th" ? `วิธีดาวน์โหลดวอลเปเปอร์ ${wp.title} ทำอย่างไร?` : `How to download ${wp.title} wallpaper?`,
            acceptedAnswer: {
              "@type": "Answer",
              "text": l === "th" 
                ? `แตะที่ปุ่ม "ดาวน์โหลด" บนหน้านี้เพื่อบันทึกไฟล์รูปภาพ ${wp.title} ลงในอุปกรณ์ของคุณ จากนั้นตั้งค่าเป็นภาพพื้นหลังผ่านเมนูตั้งค่าของระบบโทรศัพท์` 
                : `Tap the "Download" button on this page to save the ${wp.title} wallpaper file to your device, then set it as your background via your phone settings.`
            }
          },
          {
            "@type": "Question",
            "name": l === "th" ? `รูปภาพนี้ใช้กับ iPhone และ Android รุ่นไหนได้บ้าง?` : `Is this wallpaper compatible with my phone?`,
            acceptedAnswer: {
              "@type": "Answer",
              "text": l === "th"
                ? `วอลเปเปอร์นี้มีความละเอียดสูงและใช้สัดส่วนมาตรฐาน สามารถรองรับสมาร์ทโฟนได้ทุกรุ่น รวมถึง iPhone 15, 14, 13, Samsung Galaxy, Google Pixel, Xiaomi และมือถือรุ่นอื่นๆ`
                : `Yes, this high-resolution wallpaper is fully compatible with all modern smartphones including iPhone 15, 14, 13, Samsung Galaxy, Google Pixel, Xiaomi, and other Android devices.`
            }
          }
        ]
      }
    ],
  };

  return (
    <section className="container">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="crumb" aria-label="Breadcrumb">
        <Link href={`/${l}`}>{dict.category.home}</Link><i>/</i>
        <Link href={`/${l}/category/${wp.category}`}>{cat.name}</Link><i>/</i>
        <span style={{ color: "var(--text-2)" }}>{wp.title}</span>
      </nav>

      <div className="detail">
        <div className="detail-art rise">
          <Image src={wp.src} alt={wp.desc[l]} width={wp.width} height={wp.height} priority />
        </div>

        <div className="detail-meta">
          <h1>{wp.title}</h1>
          <p className="lede">{wp.desc[l]}</p>

          <dl className="specs">
            <div className="spec"><dt>{dict.detail.resolution}</dt><dd>{wp.width} × {wp.height}</dd></div>
            <div className="spec"><dt>{dict.detail.downloads}</dt><dd>{formatDownloads(wp.downloads)}</dd></div>
            <div className="spec"><dt>{dict.detail.format}</dt><dd>{wp.src.endsWith(".png") ? "PNG" : "SVG"}</dd></div>
            <div className="spec"><dt>{dict.detail.license}</dt><dd>{dict.detail.licenseValue}</dd></div>
          </dl>

          <DownloadButton
            src={wp.src}
            filename={`${wp.slug}.svg`}
            labels={{ download: dict.detail.download, preparing: dict.detail.preparing, saved: dict.detail.saved }}
            locale={l}
          />

          <FullscreenPreview
            src={wp.src}
            title={wp.title}
            locale={l}
          />

          <FavoriteButton
            wpSlug={wp.slug}
            locale={l}
          />

          <div className="tags">
            {wp.tags.map((t) => <span key={t} className="tag">#{t}</span>)}
          </div>
        </div>
      </div>

      {/* Wallpaper Detail SEO Block */}
      <div style={{ maxWidth: "800px", margin: "3rem auto 0", padding: "2rem 0 0", borderTop: "1px solid var(--line)" }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 600, marginBottom: "0.8rem" }}>
          {dict.seo.detailSeoTitle} — {wp.title}
        </h2>
        <p style={{ color: "var(--text-2)", fontSize: "0.96rem", lineHeight: "1.65", marginBottom: "1rem" }}>
          {dict.seo.detailSeoText}
        </p>
        <p style={{ color: "var(--text-2)", fontSize: "0.96rem", lineHeight: "1.65" }}>
          {l === "th"
            ? `ดาวน์โหลดวอลเปเปอร์ ${wp.title} ในหมวดหมู่ ${cat.name} ฟรี รูปภาพนี้ได้รับการคัดสรรเป็นพิเศษและปรับแต่งขนาดให้พอดีกับหน้าจอมือถือ สมาร์ทโฟน iPhone และ Android ทุกรุ่น เหมาะสำหรับตั้งเป็นภาพหน้าจอล็อกและหน้าจอโฮมโดยมีแท็กที่เกี่ยวข้องคือ ${wp.tags.map(t => `#${t}`).join(", ")}`
            : `Download ${wp.title} wallpaper in ${cat.name} category for free. This artwork is hand-picked and perfectly sized for mobile viewports, iPhone, and Android devices. Best used as lock screen and home screen backgrounds, containing tags: ${wp.tags.map(t => `#${t}`).join(", ")}.`}
        </p>
      </div>

      {related.length > 0 && (
        <div className="section">
          <div className="section-head"><h2 className="h2">{dict.detail.youMayLike}</h2></div>
          <div className="grid">
            {related.map((r) => <WallpaperCard key={r.slug} wp={r} locale={l} dict={dict} />)}
          </div>
        </div>
      )}
    </section>
  );
}
