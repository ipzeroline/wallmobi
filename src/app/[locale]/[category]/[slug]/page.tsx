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

function imageExtension(src: string) {
  const path = /^https?:\/\//i.test(src) ? new URL(src).pathname : src;
  const match = path.match(/\.(png|jpe?g|webp|gif|svg)$/i);
  return match ? `.${match[1].toLowerCase().replace("jpeg", "jpg")}` : ".png";
}

type WallpaperSeoCopy = {
  title: string;
  description: string;
  displayTitle: string;
  intro: string;
  guideTitle: string;
  guideText: string;
  keywords: string[];
  topicsTitle: string;
  topics: { label: string; href: string }[];
  extraFaqs: { q: string; a: string }[];
};

function wallpaperSeoCopy({
  locale,
  slug,
  title,
  description,
  categoryName,
  tags,
}: {
  locale: Locale;
  slug: string;
  title: string;
  description: string;
  categoryName: string;
  tags: string[];
}): WallpaperSeoCopy {
  const genericTitle: Record<Locale, string> = {
    en: `${title} Wallpaper - Free Mobile Download`,
    th: `วอลเปเปอร์ ${title} - ดาวน์โหลดฟรีสำหรับมือถือ`,
    vi: `Hình nền ${title} - Tải miễn phí cho điện thoại`,
    my: `${title} ဖုန်းနောက်ခံပုံ - အခမဲ့ဒေါင်းလုဒ်`,
    lo: `ວໍລເປເປີ ${title} - ດາວໂຫຼດຟຣີສຳລັບມືຖື`,
    km: `ផ្ទាំងរូបភាព ${title} - ទាញយកឥតគិតថ្លៃ`,
  };

  const generic: WallpaperSeoCopy = {
    title: genericTitle[locale],
    description,
    displayTitle: title,
    intro: description,
    guideTitle: locale === "th" ? `รายละเอียดวอลเปเปอร์ ${title}` : `About ${title}`,
    guideText:
      locale === "th"
        ? `ดาวน์โหลด ${title} ในหมวดหมู่ ${categoryName} สำหรับใช้เป็นวอลเปเปอร์มือถือแนวตั้ง ภาพนี้เหมาะกับหน้าจอล็อก หน้าจอโฮม iPhone, Samsung Galaxy และมือถือ Android รุ่นใหม่`
        : `Download ${title} in the ${categoryName} category for a vertical phone wallpaper that works well on lock screens, home screens, iPhone, Samsung Galaxy and modern Android devices.`,
    keywords: [
      title,
      `${categoryName} wallpaper`,
      "phone wallpaper",
      "mobile wallpaper",
      "lock screen wallpaper",
      "home screen wallpaper",
      ...tags,
    ],
    topicsTitle: locale === "th" ? "ลิงก์ที่เกี่ยวข้อง" : "Related links",
    topics: [
      { label: categoryName, href: "/category/anime" },
      { label: locale === "th" ? "แกลเลอรีทั้งหมด" : "Full gallery", href: "/gallery" },
    ],
    extraFaqs: [],
  };

  if (slug !== "anime-wallpaper-cliffside-teahouse-golden-clouds-sunset-1cbf9b") return generic;

  if (locale === "th") {
    return {
      title: "วอลเปเปอร์อนิเมะโรงน้ำชาบนหน้าผา ทะเลเมฆสีทอง 4K สำหรับมือถือ",
      description:
        "ดาวน์โหลดวอลเปเปอร์อนิเมะโรงน้ำชาบนหน้าผาเหนือทะเลเมฆสีทองยามพระอาทิตย์ตก สำหรับหน้าจอล็อกและหน้าจอโฮม iPhone, Samsung Galaxy และ Android",
      displayTitle: "วอลเปเปอร์อนิเมะโรงน้ำชาบนหน้าผา ทะเลเมฆสีทอง",
      intro:
        "วอลเปเปอร์อนิเมะแนวอบอุ่นที่เล่าเรื่องโรงน้ำชาบนหน้าผา มองออกไปยังทะเลเมฆสีทองในช่วงพระอาทิตย์ตก เหมาะกับหน้าจอล็อกที่ต้องการบรรยากาศสงบ ชวนฝัน และอ่านนาฬิกาได้ชัดบนมือถือแนวตั้ง",
      guideTitle: "ทำไมวอลเปเปอร์อนิเมะโรงน้ำชาบนหน้าผานี้เหมาะกับหน้าจอมือถือ",
      guideText:
        "ภาพนี้มีองค์ประกอบแนวตั้ง จุดโฟกัสอยู่ในตำแหน่งที่ไม่รบกวนไอคอนและพื้นที่นาฬิกา โทนสีทองของทะเลเมฆช่วยให้หน้าจอดูอบอุ่นแต่ยังคงอ่านการแจ้งเตือนได้ง่าย เหมาะสำหรับใช้เป็นวอลเปเปอร์ iPhone, Samsung Galaxy, Xiaomi, OPPO, vivo และมือถือ Android รุ่นใหม่",
      keywords: [
        "วอลเปเปอร์อนิเมะ",
        "วอลเปเปอร์อนิเมะ 4K",
        "วอลเปเปอร์โรงน้ำชา",
        "วอลเปเปอร์ทะเลเมฆ",
        "วอลเปเปอร์พระอาทิตย์ตก",
        "วอลเปเปอร์อนิเมะมือถือ",
        "พื้นหลังมือถืออนิเมะ",
        "anime teahouse wallpaper",
        "anime sunset wallpaper",
        "anime phone wallpaper",
        "anime lock screen",
      ],
      topicsTitle: "ดูวอลเปเปอร์สไตล์ใกล้เคียง",
      topics: [
        { label: "วอลเปเปอร์อนิเมะ", href: "/category/anime" },
        { label: "วอลเปเปอร์ญี่ปุ่น", href: "/category/japanese" },
        { label: "วอลเปเปอร์แฟนตาซี", href: "/category/fantasy" },
        { label: "บทความเลือกวอลเปเปอร์อนิเมะ", href: "/blog/rise-of-ai-wallpaper-art" },
      ],
      extraFaqs: [
        {
          q: "วอลเปเปอร์อนิเมะโรงน้ำชานี้เหมาะกับหน้าจอล็อกไหม?",
          a: "เหมาะครับ เพราะภาพเป็นแนวตั้ง มีพื้นที่ท้องฟ้าและทะเลเมฆที่ช่วยให้นาฬิกาและการแจ้งเตือนอ่านง่าย โดยไม่บดบังจุดเด่นของโรงน้ำชาบนหน้าผา",
        },
        {
          q: "รูปนี้ใช้เป็นวอลเปเปอร์ iPhone และ Samsung Galaxy ได้ไหม?",
          a: "ใช้ได้ครับ ภาพมีความละเอียดสูงและจัดองค์ประกอบสำหรับมือถือแนวตั้ง จึงเหมาะกับ iPhone, Samsung Galaxy และมือถือ Android รุ่นใหม่ส่วนใหญ่",
        },
      ],
    };
  }

  return {
    title: "Anime Teahouse Cliffside Golden Cloud Sunset Wallpaper for Mobile",
    description:
      "Download a cozy anime teahouse wallpaper with a cliffside view over golden sunset clouds, designed for iPhone, Samsung Galaxy and Android lock screens.",
    displayTitle: "Anime Teahouse Cliffside Golden Cloud Sunset Wallpaper",
    intro:
      "A warm vertical anime wallpaper featuring a cozy teahouse on a cliff edge above a golden cloud sea at sunset, designed for calm mobile lock screens and home screens.",
    guideTitle: "Why this anime teahouse wallpaper works well on phones",
    guideText:
      "The portrait composition keeps the main scene clear while leaving comfortable space for lock screen clocks, widgets and notifications. Its golden cloud palette adds warmth without making the screen feel visually crowded.",
    keywords: [
      "anime teahouse wallpaper",
      "anime sunset wallpaper",
      "anime phone wallpaper",
      "anime lock screen",
      "golden cloud wallpaper",
      "cliffside teahouse wallpaper",
      "iPhone wallpaper",
      "Samsung Galaxy wallpaper",
      "Android wallpaper",
    ],
    topicsTitle: "Related wallpaper styles",
    topics: [
      { label: "Anime wallpapers", href: "/category/anime" },
      { label: "Japanese wallpapers", href: "/category/japanese" },
      { label: "Fantasy wallpapers", href: "/category/fantasy" },
      { label: "AI wallpaper trends", href: "/blog/rise-of-ai-wallpaper-art" },
    ],
    extraFaqs: [
      {
        q: "Is this anime teahouse wallpaper good for a lock screen?",
        a: "Yes. The portrait layout keeps the main subject visible while leaving usable space for clocks, widgets and notifications.",
      },
      {
        q: "Can I use this wallpaper on iPhone and Samsung Galaxy?",
        a: "Yes. It is a high-resolution vertical phone wallpaper suitable for iPhone, Samsung Galaxy and most modern Android devices.",
      },
    ],
  };
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

  const dict = getDictionary(locale);
  const cat = dict.categories[wp.category];
  const copy = wallpaperSeoCopy({
    locale,
    slug,
    title: wp.title,
    description: wp.desc[locale],
    categoryName: cat.name,
    tags: wp.tags,
  });
  const previewImage = `${site.url}${wallpaperImageUrl(wp.slug, { width: 1200 })}`;

  return {
    title: copy.title,
    description: copy.description,
    keywords: copy.keywords,
    alternates: alternates(locale, `/${wp.category}-wallpapers/${slug}`),
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: `${site.url}/${locale}/${wp.category}-wallpapers/${slug}`,
      siteName: site.name,
      type: "article",
      publishedTime: wp.published,
      images: [{ url: previewImage, width: wp.width, height: wp.height, alt: copy.displayTitle }],
    },
    twitter: { card: "summary_large_image", title: copy.title, description: copy.description, images: [previewImage], creator: site.twitter },
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
  const downloadFilename = `${wp.slug}${imageExtension(wp.src)}`;

  const previewSrc = wallpaperImageUrl(wp.slug, { width: 1280 });
  const previewImageUrl = `${site.url}${wallpaperImageUrl(wp.slug, { width: 1200 })}`;
  const pageUrl = `${site.url}/${l}/${wp.category}-wallpapers/${wp.slug}`;
  const seoCopy = wallpaperSeoCopy({
    locale: l,
    slug,
    title: wp.title,
    description: wp.desc[l],
    categoryName: cat.name,
    tags: wp.tags,
  });

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
    en: `Download ${seoCopy.displayTitle} in the ${cat.name} category for a clean phone wallpaper experience. This high-resolution image is made for vertical screens and works well as an iPhone wallpaper, Samsung wallpaper, Android lock screen, and home screen background. Related tags include ${wp.tags.map(t => `#${t}`).join(", ")}.`,
    th: `ดาวน์โหลด ${seoCopy.displayTitle} ในหมวดหมู่ ${cat.name} สำหรับใช้เป็นวอลเปเปอร์มือถือแนวตั้ง ภาพความละเอียดสูงนี้เหมาะกับวอลเปเปอร์ iPhone, Samsung, Android, หน้าจอล็อก และหน้าจอโฮม โดยมีแท็กที่เกี่ยวข้องคือ ${wp.tags.map(t => `#${t}`).join(", ")}`,
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
        "@id": `${pageUrl}#primaryimage`,
        name: seoCopy.displayTitle,
        description: seoCopy.description,
        contentUrl: previewImageUrl,
        thumbnailUrl: previewImageUrl,
        width: wp.width,
        height: wp.height,
        encodingFormat: "image/webp",
        datePublished: wp.published,
        creditText: site.name,
        creator: { "@type": "Organization", name: site.author },
        license: `${site.url}/${l}/license`,
        acquireLicensePage: `${site.url}/${l}/license`,
        representativeOfPage: true,
        keywords: seoCopy.keywords.join(", "),
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: seoCopy.title,
        description: seoCopy.description,
        inLanguage: l,
        isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
        primaryImageOfPage: { "@id": `${pageUrl}#primaryimage` },
        datePublished: wp.published,
        mainEntity: { "@id": `${pageUrl}#primaryimage` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: dict.category.home, item: `${site.url}/${l}` },
          { "@type": "ListItem", position: 2, name: cat.name, item: `${site.url}/${l}/category/${wp.category}` },
          { "@type": "ListItem", position: 3, name: seoCopy.displayTitle, item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
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
          },
          ...seoCopy.extraFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.a,
            },
          })),
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
        <span style={{ color: "var(--text-2)" }}>{seoCopy.displayTitle}</span>
      </nav>

      <div className="detail">
        <div className="detail-art rise" style={{ position: "relative", overflow: "hidden" }}>
          <Image src={previewSrc} alt={wp.desc[l]} width={wp.width} height={wp.height} priority unoptimized />
        </div>

        <div className="detail-meta">
          <h1>{seoCopy.displayTitle}</h1>
          <p className="lede">{seoCopy.intro}</p>

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
            title={seoCopy.displayTitle}
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

      <nav aria-label={seoCopy.topicsTitle} style={{ maxWidth: "800px", margin: "2rem auto 0" }}>
        <p className="eyebrow" style={{ marginBottom: ".75rem" }}>{seoCopy.topicsTitle}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: ".65rem" }}>
          {seoCopy.topics.map((topic) => (
            <Link key={topic.href} href={`/${l}${topic.href}`} className="tag" style={{ textDecoration: "none" }}>
              {topic.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Wallpaper Detail SEO Block */}
      <div style={{ maxWidth: "800px", margin: "3rem auto 0", padding: "2rem 0 0", borderTop: "1px solid var(--line)" }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 600, marginBottom: "0.8rem" }}>
          {seoCopy.guideTitle}
        </h2>
        <p style={{ color: "var(--text-2)", fontSize: "0.96rem", lineHeight: "1.65", marginBottom: "1rem" }}>
          {seoCopy.guideText}
        </p>
        <p style={{ color: "var(--text-2)", fontSize: "0.96rem", lineHeight: "1.65" }}>
          {detailSeoParagraphs[l]}
        </p>
      </div>

      {seoCopy.extraFaqs.length > 0 && (
        <div id="faq-section" style={{ maxWidth: "800px", margin: "3rem auto 0", paddingTop: "2rem", borderTop: "1px solid var(--line)" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1.2rem" }}>
            {l === "th" ? "คำถามที่พบบ่อยเกี่ยวกับวอลเปเปอร์นี้" : "Frequently Asked Questions"}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[faqDownload[l], faqCompatibility[l], ...seoCopy.extraFaqs].map((faq, idx) => (
              <div key={idx} style={{ background: "var(--bg-alt)", padding: "1.25rem 1.5rem", borderRadius: "14px", border: "1px solid var(--line)" }}>
                <h3 style={{ fontSize: "1.02rem", fontWeight: 600, color: "var(--text-1)", margin: "0 0 0.5rem 0" }}>{faq.q}</h3>
                <p style={{ fontSize: "0.95rem", color: "var(--text-2)", margin: 0, lineHeight: "1.55" }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}

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
