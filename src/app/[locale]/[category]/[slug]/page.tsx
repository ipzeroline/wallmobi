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
import { wallpaperImageUrl } from "@/lib/wallpaper-url";
import WallpaperCard from "@/components/WallpaperCard";
import DownloadButton from "@/components/DownloadButton";
import FullscreenPreview from "@/components/FullscreenPreview";
import FavoriteButton from "@/components/FavoriteButton";
import WallpaperViewCounter from "@/components/WallpaperViewCounter";

function absoluteImageUrl(src: string) {
  return /^https?:\/\//i.test(src) ? src : `${site.url}${src}`;
}

function imageExtension(src: string) {
  const path = /^https?:\/\//i.test(src) ? new URL(src).pathname : src;
  const match = path.match(/\.(png|jpe?g|webp|gif|svg)$/i);
  return match ? `.${match[1].toLowerCase().replace("jpeg", "jpg")}` : ".png";
}

function imageMimeType(src: string) {
  const ext = imageExtension(src);
  if (ext === ".svg") return "image/svg+xml";
  if (ext === ".webp") return "image/webp";
  if (ext === ".gif") return "image/gif";
  if (ext === ".jpg") return "image/jpeg";
  return "image/png";
}

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
    keywords: [
      wp.title,
      `${wp.category} wallpaper`,
      `${wp.category} phone wallpaper`,
      "phone wallpaper",
      "mobile wallpaper",
      "lock screen wallpaper",
      "home screen wallpaper",
      ...wp.tags,
    ],
    alternates: alternates(locale, `/${wp.category}-wallpapers/${slug}`),
    openGraph: { title, description: desc, images: [{ url: absoluteImageUrl(wp.src), width: wp.width, height: wp.height, alt: wp.title }] },
    twitter: { card: "summary_large_image", title, description: desc, images: [absoluteImageUrl(wp.src)] },
  };
}

const publishedLabel: Record<Locale, string> = {
  en: "Published",
  th: "วันที่เผยแพร่",
  vi: "Ngày đăng",
  my: "တင်သည့်ရက်စွဲ",
  lo: "ວັນທີເຜີຍແຜ່",
  km: "កាលបរិច្ឆេទផ្សាយ",
};

const memberDownloadCopy: Record<Locale, { title: string; body: string; badge: string }> = {
  en: {
    badge: "Free account",
    title: "Sign in to remove the watermark",
    body: "Guests can preview and download watermarked files. Free members get the original wallpaper without watermark.",
  },
  th: {
    badge: "สมัครฟรี",
    title: "เข้าสู่ระบบเพื่อดาวน์โหลดไม่มีลายน้ำ",
    body: "ผู้เยี่ยมชมดูและดาวน์โหลดได้แบบมีลายน้ำ สมาชิกฟรีจะได้รับไฟล์ต้นฉบับไม่มีลายน้ำ",
  },
  vi: {
    badge: "Tài khoản miễn phí",
    title: "Đăng nhập để tải không có watermark",
    body: "Khách có thể xem và tải tệp có watermark. Thành viên miễn phí nhận hình nền gốc không watermark.",
  },
  my: {
    badge: "အခမဲ့အကောင့်",
    title: "လော့ဂ်အင်ဝင်ပြီး watermark မပါဘဲ ဒေါင်းလုဒ်လုပ်ပါ",
    body: "ဧည့်သည်များသည် watermark ပါသောဖိုင်ကို ကြည့်ရှု/ဒေါင်းလုဒ်လုပ်နိုင်သည်။ အခမဲ့အဖွဲ့ဝင်များသည် မူရင်း wallpaper ကို watermark မပါဘဲ ရရှိပါသည်။",
  },
  lo: {
    badge: "ບັນຊີຟຣີ",
    title: "ເຂົ້າລະບົບເພື່ອດາວໂຫຼດບໍ່ມີລາຍນ້ຳ",
    body: "ຜູ້ເຂົ້າຊົມສາມາດເບິ່ງ ແລະດາວໂຫຼດໄຟລ໌ທີ່ມີລາຍນ້ຳໄດ້. ສະມາຊິກຟຣີຈະໄດ້ຮັບຮູບຕົ້ນສະບັບບໍ່ມີລາຍນ້ຳ.",
  },
  km: {
    badge: "គណនីឥតគិតថ្លៃ",
    title: "ចូលប្រើដើម្បីទាញយកដោយគ្មាន watermark",
    body: "ភ្ញៀវអាចមើល និងទាញយកឯកសារដែលមាន watermark។ សមាជិកឥតគិតថ្លៃទទួលបានរូបភាពដើមដោយគ្មាន watermark។",
  },
};

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
  const imageUrl = absoluteImageUrl(wp.src);
  const downloadFilename = `${wp.slug}${imageExtension(wp.src)}`;

  const previewSrc = wallpaperImageUrl(wp.slug, { width: 1280 });

  const faqDownload: Record<Locale, { q: string; a: string }> = {
    en: {
      q: `How to download ${wp.title} wallpaper?`,
      a: `Tap the Download button on this page to save the ${wp.title} phone wallpaper, then set it as your lock screen or home screen from your phone settings.`,
    },
    th: {
      q: `วิธีดาวน์โหลดวอลเปเปอร์ ${wp.title} ทำอย่างไร?`,
      a: `แตะปุ่มดาวน์โหลดบนหน้านี้เพื่อบันทึกวอลเปเปอร์มือถือ ${wp.title} แล้วตั้งเป็นหน้าจอล็อกหรือหน้าจอโฮมผ่านเมนูตั้งค่าของโทรศัพท์`,
    },
    vi: {
      q: `Làm sao để tải hình nền ${wp.title}?`,
      a: `Nhấn nút tải xuống trên trang này để lưu hình nền điện thoại ${wp.title}, sau đó đặt làm màn hình khóa hoặc màn hình chính trong cài đặt điện thoại.`,
    },
    my: {
      q: `${wp.title} ဖုန်းနောက်ခံပုံကို ဘယ်လိုဒေါင်းလုဒ်လုပ်မလဲ?`,
      a: `ဤစာမျက်နှာရှိ Download ခလုတ်ကိုနှိပ်ပြီး ${wp.title} ဖုန်းနောက်ခံပုံကို သိမ်းပါ။ ထို့နောက် ဖုန်း setting မှ lock screen သို့မဟုတ် home screen အဖြစ် သတ်မှတ်နိုင်သည်။`,
    },
    lo: {
      q: `ດາວໂຫຼດວໍເປເປີ ${wp.title} ແນວໃດ?`,
      a: `ກົດປຸ່ມດາວໂຫຼດໃນໜ້ານີ້ເພື່ອບັນທຶກວໍເປເປີມືຖື ${wp.title} ແລ້ວຕັ້ງເປັນໜ້າຈໍລັອກ ຫຼື ໜ້າຈໍໂຮມໃນການຕັ້ງຄ່າໂທລະສັບ.`,
    },
    km: {
      q: `តើទាញយកផ្ទាំងរូបភាព ${wp.title} ដោយរបៀបណា?`,
      a: `ចុចប៊ូតុងទាញយកនៅលើទំព័រនេះ ដើម្បីរក្សាទុកផ្ទាំងរូបភាពទូរស័ព្ទ ${wp.title} បន្ទាប់មកកំណត់ជាអេក្រង់ចាក់សោ ឬអេក្រង់ដើមតាមការកំណត់ទូរស័ព្ទ។`,
    },
  };

  const faqCompatibility: Record<Locale, { q: string; a: string }> = {
    en: {
      q: "Is this wallpaper compatible with my phone?",
      a: "Yes, this high-resolution phone wallpaper is suitable for modern smartphones including iPhone, Samsung Galaxy, Xiaomi, OPPO, vivo, Google Pixel, and other Android devices.",
    },
    th: {
      q: "รูปนี้ใช้กับมือถือรุ่นไหนได้บ้าง?",
      a: "วอลเปเปอร์มือถือความละเอียดสูงนี้เหมาะกับสมาร์ทโฟนรุ่นใหม่ เช่น iPhone, Samsung Galaxy, Xiaomi, OPPO, vivo, Google Pixel และมือถือ Android รุ่นอื่น ๆ",
    },
    vi: {
      q: "Hình nền này dùng được cho điện thoại nào?",
      a: "Hình nền điện thoại độ phân giải cao này phù hợp với iPhone, Samsung Galaxy, Xiaomi, OPPO, vivo, Google Pixel và nhiều thiết bị Android khác.",
    },
    my: {
      q: "ဒီ wallpaper က ဘယ်ဖုန်းတွေမှာ သုံးလို့ရမလဲ?",
      a: "ဤ high-resolution ဖုန်း wallpaper သည် iPhone, Samsung Galaxy, Xiaomi, OPPO, vivo, Google Pixel နှင့် Android ဖုန်းအများစုတွင် သုံးရန်သင့်တော်သည်။",
    },
    lo: {
      q: "ວໍເປເປີນີ້ໃຊ້ກັບມືຖືຮຸ່ນໃດໄດ້ບ້າງ?",
      a: "ວໍເປເປີມືຖືຄວາມລະອຽດສູງນີ້ເໝາະກັບ iPhone, Samsung Galaxy, Xiaomi, OPPO, vivo, Google Pixel ແລະມືຖື Android ອື່ນໆ.",
    },
    km: {
      q: "ផ្ទាំងរូបភាពនេះប្រើជាមួយទូរស័ព្ទណាខ្លះ?",
      a: "ផ្ទាំងរូបភាពទូរស័ព្ទគុណភាពខ្ពស់នេះសមស្របសម្រាប់ iPhone, Samsung Galaxy, Xiaomi, OPPO, vivo, Google Pixel និងទូរស័ព្ទ Android ផ្សេងៗ។",
    },
  };

  const detailSeoParagraphs: Record<Locale, string> = {
    en: `Download ${wp.title} in the ${cat.name} category for a clean phone wallpaper experience. This high-resolution image is made for vertical screens and works well as an iPhone wallpaper, Samsung wallpaper, Android lock screen, and home screen background. Related tags include ${wp.tags.map(t => `#${t}`).join(", ")}.`,
    th: `ดาวน์โหลด ${wp.title} ในหมวดหมู่ ${cat.name} สำหรับใช้เป็นวอลเปเปอร์มือถือแนวตั้ง ภาพความละเอียดสูงนี้เหมาะกับวอลเปเปอร์ iPhone, Samsung, Android, หน้าจอล็อก และหน้าจอโฮม โดยมีแท็กที่เกี่ยวข้องคือ ${wp.tags.map(t => `#${t}`).join(", ")}`,
    vi: `Tải ${wp.title} trong danh mục ${cat.name} để dùng làm hình nền điện thoại dọc. Hình ảnh độ phân giải cao này phù hợp với hình nền iPhone, Samsung, Android, màn hình khóa và màn hình chính. Thẻ liên quan: ${wp.tags.map(t => `#${t}`).join(", ")}.`,
    my: `${cat.name} အမျိုးအစားထဲမှ ${wp.title} ကို ဖုန်းနောက်ခံပုံအဖြစ် ဒေါင်းလုဒ်လုပ်နိုင်သည်။ ဤ high-resolution ပုံသည် iPhone wallpaper, Samsung wallpaper, Android lock screen နှင့် home screen အတွက် သင့်တော်သည်။ ဆက်စပ် tags: ${wp.tags.map(t => `#${t}`).join(", ")}.`,
    lo: `ດາວໂຫຼດ ${wp.title} ໃນໝວດ ${cat.name} ເພື່ອໃຊ້ເປັນວໍເປເປີມືຖືແນວຕັ້ງ. ຮູບຄວາມລະອຽດສູງນີ້ເໝາະກັບ iPhone, Samsung, Android, ໜ້າຈໍລັອກ ແລະໜ້າຈໍໂຮມ. ແທັກທີ່ກ່ຽວຂ້ອງ: ${wp.tags.map(t => `#${t}`).join(", ")}.`,
    km: `ទាញយក ${wp.title} ក្នុងប្រភេទ ${cat.name} សម្រាប់ប្រើជាផ្ទាំងរូបភាពទូរស័ព្ទបញ្ឈរ។ រូបភាពគុណភាពខ្ពស់នេះសមស្របសម្រាប់ iPhone, Samsung, Android, អេក្រង់ចាក់សោ និងអេក្រង់ដើម។ ស្លាកពាក់ព័ន្ធ៖ ${wp.tags.map(t => `#${t}`).join(", ")}។`,
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ImageObject",
        name: wp.title,
        description: wp.desc[l],
        contentUrl: imageUrl,
        thumbnailUrl: imageUrl,
        width: wp.width,
        height: wp.height,
        encodingFormat: imageMimeType(wp.src),
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
            name: faqDownload[l].q,
            acceptedAnswer: {
              "@type": "Answer",
              "text": faqDownload[l].a
            }
          },
          {
            "@type": "Question",
            "name": faqCompatibility[l].q,
            acceptedAnswer: {
              "@type": "Answer",
              "text": faqCompatibility[l].a
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
        <div className="detail-art rise" style={{ position: "relative", overflow: "hidden" }}>
          <Image src={previewSrc} alt={wp.desc[l]} width={wp.width} height={wp.height} priority unoptimized />
        </div>

        <div className="detail-meta">
          <h1>{wp.title}</h1>
          <p className="lede">{wp.desc[l]}</p>

          <dl className="specs">
            <div className="spec"><dt>{dict.detail.resolution}</dt><dd>{wp.width} × {wp.height}</dd></div>
            <div className="spec"><dt>{dict.detail.downloads}</dt><dd>{formatDownloads(wp.downloads)}</dd></div>
            <div className="spec">
              <dt>
                {l === "th" ? "คนเข้าชม" : 
                 l === "vi" ? "Lượt xem" :
                 l === "my" ? "ကြည့်ရှုသူ" :
                 l === "lo" ? "ຄົນເຂົ້າຊົມ" :
                 l === "km" ? "អ្នកមើល" : "Views"}
              </dt>
              <dd>
                <WallpaperViewCounter slug={wp.slug} />
              </dd>
            </div>
            <div className="spec"><dt>{dict.detail.format}</dt><dd>{wp.src.endsWith(".png") ? "PNG" : "SVG"}</dd></div>
            <div className="spec">
              <dt>{publishedLabel[l]}</dt>
              <dd>{wp.published}</dd>
            </div>
            <div className="spec"><dt>{dict.detail.license}</dt><dd>{dict.detail.licenseValue}</dd></div>
          </dl>

          <div style={{ border: "1px solid rgba(52, 199, 89, 0.22)", background: "rgba(52, 199, 89, 0.07)", borderRadius: "14px", padding: "0.95rem 1rem", marginBottom: "0.85rem" }}>
            <div style={{ color: "#248a3d", fontSize: "0.78rem", fontWeight: 700, marginBottom: "0.25rem" }}>
              {memberDownloadCopy[l].badge}
            </div>
            <div style={{ fontWeight: 700, color: "var(--text-1)", marginBottom: "0.25rem" }}>
              {memberDownloadCopy[l].title}
            </div>
            <p style={{ color: "var(--text-2)", fontSize: "0.9rem", lineHeight: 1.45, margin: 0 }}>
              {memberDownloadCopy[l].body}
            </p>
          </div>

          <DownloadButton
            src={wp.src}
            filename={downloadFilename}
            labels={{ download: dict.detail.download, preparing: dict.detail.preparing, saved: dict.detail.saved }}
            locale={l}
          />

          <FullscreenPreview
            src={previewSrc}
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
          {detailSeoParagraphs[l]}
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
