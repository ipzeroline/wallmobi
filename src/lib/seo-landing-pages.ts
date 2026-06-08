import { type Locale } from "@/i18n/config";

export interface LandingPageDef {
  slug: string;
  type: "device" | "content";
  filter: {
    category?: string;
    tag?: string;
    deviceRatio?: "portrait" | "tablet" | "all";
  };
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  h1: Record<Locale, string>;
  intro: Record<Locale, string>;
}

// 1. Device templates & config
const deviceList = [
  { slug: "iphone-wallpaper", name: "iPhone", brand: "Apple" },
  { slug: "iphone-wallpaper-4k", name: "iPhone 4K", brand: "Apple" },
  { slug: "iphone-wallpaper-hd", name: "iPhone HD", brand: "Apple" },
  { slug: "iphone-13-wallpaper", name: "iPhone 13", brand: "Apple" },
  { slug: "iphone-13-pro-max-wallpaper", name: "iPhone 13 Pro Max", brand: "Apple" },
  { slug: "iphone-14-wallpaper", name: "iPhone 14", brand: "Apple" },
  { slug: "iphone-14-pro-wallpaper", name: "iPhone 14 Pro", brand: "Apple" },
  { slug: "iphone-14-pro-max-wallpaper", name: "iPhone 14 Pro Max", brand: "Apple" },
  { slug: "iphone-15-wallpaper", name: "iPhone 15", brand: "Apple" },
  { slug: "iphone-15-plus-wallpaper", name: "iPhone 15 Plus", brand: "Apple" },
  { slug: "iphone-15-pro-wallpaper", name: "iPhone 15 Pro", brand: "Apple" },
  { slug: "iphone-15-pro-max-wallpaper", name: "iPhone 15 Pro Max", brand: "Apple" },
  { slug: "iphone-16-wallpaper", name: "iPhone 16", brand: "Apple" },
  { slug: "iphone-16-pro-wallpaper", name: "iPhone 16 Pro", brand: "Apple" },
  { slug: "iphone-16-pro-max-wallpaper", name: "iPhone 16 Pro Max", brand: "Apple" },
  { slug: "iphone-17-wallpaper", name: "iPhone 17", brand: "Apple" },
  { slug: "iphone-17-pro-wallpaper", name: "iPhone 17 Pro", brand: "Apple" },
  { slug: "iphone-17-pro-max-wallpaper", name: "iPhone 17 Pro Max", brand: "Apple" },
  { slug: "samsung-wallpaper", name: "Samsung", brand: "Samsung" },
  { slug: "samsung-galaxy-wallpaper", name: "Samsung Galaxy", brand: "Samsung" },
  { slug: "samsung-s23-wallpaper", name: "Samsung Galaxy S23", brand: "Samsung" },
  { slug: "samsung-s23-ultra-wallpaper", name: "Samsung Galaxy S23 Ultra", brand: "Samsung" },
  { slug: "samsung-s24-wallpaper", name: "Samsung Galaxy S24", brand: "Samsung" },
  { slug: "samsung-s24-ultra-wallpaper", name: "Samsung Galaxy S24 Ultra", brand: "Samsung" },
  { slug: "samsung-s25-wallpaper", name: "Samsung Galaxy S25", brand: "Samsung" },
  { slug: "samsung-s25-ultra-wallpaper", name: "Samsung Galaxy S25 Ultra", brand: "Samsung" },
  { slug: "samsung-z-fold-wallpaper", name: "Samsung Galaxy Z Fold", brand: "Samsung" },
  { slug: "samsung-z-flip-wallpaper", name: "Samsung Galaxy Z Flip", brand: "Samsung" },
  { slug: "samsung-amoled-wallpaper", name: "Samsung AMOLED", brand: "Samsung" },
  { slug: "xiaomi-wallpaper", name: "Xiaomi", brand: "Xiaomi" },
  { slug: "redmi-wallpaper", name: "Redmi", brand: "Xiaomi" },
  { slug: "xiaomi-15-wallpaper", name: "Xiaomi 15", brand: "Xiaomi" },
  { slug: "xiaomi-14-wallpaper", name: "Xiaomi 14", brand: "Xiaomi" },
  { slug: "redmi-note-wallpaper", name: "Redmi Note", brand: "Xiaomi" },
  { slug: "hyperos-wallpaper", name: "HyperOS", brand: "Xiaomi" },
  { slug: "oppo-wallpaper", name: "OPPO", brand: "OPPO" },
  { slug: "oppo-find-x-wallpaper", name: "OPPO Find X", brand: "OPPO" },
  { slug: "oppo-reno-wallpaper", name: "OPPO Reno", brand: "OPPO" },
  { slug: "vivo-wallpaper", name: "vivo", brand: "vivo" },
  { slug: "vivo-x-wallpaper", name: "vivo X", brand: "vivo" },
  { slug: "vivo-v-series-wallpaper", name: "vivo V Series", brand: "vivo" },
];

const getDeviceTranslations = (name: string): Record<Locale, { title: string; desc: string; h1: string; intro: string }> => ({
  en: {
    title: `Free ${name} Wallpapers — High-Res Mobile Downloads`,
    desc: `Download premium, high-quality AI wallpapers crafted perfectly for your ${name} screen. Free download in one tap.`,
    h1: `${name} Wallpapers`,
    intro: `Explore high-resolution portrait wallpapers sized perfectly for the ${name} mobile display.`,
  },
  th: {
    title: `วอลเปเปอร์ ${name} — ดาวน์โหลดรูปภาพหน้าจอมือถือ ${name} ฟรี`,
    desc: `คอลเลกชันวอลเปเปอร์ยอดนิยมสำหรับมือถือ ${name} ความละเอียดสูง ภาพสวยคมชัดสเกลพอดีหน้าจอแนวตั้ง ดาวน์โหลดฟรี`,
    h1: `วอลเปเปอร์ ${name}`,
    intro: `เลือกดาวน์โหลดภาพพื้นหลังมือถือยอดนิยม ความละเอียดสูง ดีไซน์สวยหรูสำหรับ ${name} โดยเฉพาะ สเกลพอดีกับหน้าจอล็อกและหน้าจอโฮมของคุณ`,
  },
  vi: {
    title: `Hình nền ${name} đẹp — Tải ảnh nền ${name} miễn phí`,
    desc: `Bộ sưu tập hình nền chất lượng cao thiết kế riêng cho màn hình điện thoại ${name}. Tải về miễn phí chỉ với một chạm.`,
    h1: `Hình nền ${name}`,
    intro: `Khám phá các hình nền dọc độ phân giải cao, phù hợp hoàn hảo với kích thước màn hình ${name} của bạn.`,
  },
  my: {
    title: `အခမဲ့ ${name} ဖုန်းနောက်ခံပုံများ — High-Res Mobile Downloads`,
    desc: `${name} မိုဘိုင်းလ်စခရင်အတွက် အထူးဒီဇိုင်းထုတ်ထားသော အရည်အသွေးမြင့် ဖုန်းနောက်ခံပုံများကို အခမဲ့ရယူပါ။`,
    h1: `${name} ဖုန်းနောက်ခံပုံများ`,
    intro: `${name} ဖုန်းမျက်နှာပြင်အတွက် အတိုင်းအတာ အတိအကျညှိထားသော အရည်အသွေးမြင့် ဖုန်းနောက်ခံပုံများ။`,
  },
  lo: {
    title: `ວໍເປເປີ ${name} — ດາວໂຫຼດຮູບພາບໜ້າຈໍມືຖື ${name} ຟຣີ`,
    desc: `ຄອນເລກຊັນວໍເປເປີຍອດນິຍົມສຳລັບມືຖື ${name} ຄວາມລະອຽดສູງ ພາບງາມຄົມຊັດ ດາວໂຫຼດຟຣີ`,
    h1: `ວໍເປເປີ ${name}`,
    intro: `ເລືອກດາວໂຫຼດພາບພື້ນຫຼังມືຖືຍອດນິຍົມ ຄວາມລະອຽดສູງ ດີໄຊສວຍງามສຳລັບ ${name} ໂດຍສະເພາະ`,
  },
  km: {
    title: `ផ្ទាំងរូបភាព ${name} — ទាញយកផ្ទាំងរូបភាពទូរស័ព្ទ ${name} ឥតគិតថ្លៃ`,
    desc: `បណ្តុំផ្ទាំងរូបភាពទូរស័ព្ទលំដាប់ខ្ពស់ ត្រូវបានរចនាឡើងយ៉ាងល្អឥតខ្ចោះសម្រាប់អេក្រង់ទូរស័ព្ទ ${name} របស់អ្នក។`,
    h1: `ផ្ទាំងរូបភាព ${name}`,
    intro: `ស្វែងរក និងទាញយកផ្ទាំងរូបភាពទូរស័ព្ទដែលមានគុណភាពបង្ហាញខ្ពស់ សម្រាប់អេក្រង់ទូរស័ព្ទ ${name} របស់អ្នក。`,
  },
});

// 2. Content templates & config
const contentList = [
  { slug: "anime-wallpaper", category: "anime", tag: "anime", name: { en: "Anime", th: "อนิเมะ", vi: "Anime", my: "Anime", lo: "ອານิເມະ", km: "Anime" } },
  { slug: "dragon-wallpaper", category: "dragon", tag: "dragon", name: { en: "Dragon", th: "มังกร", vi: "Rồng", my: "နဂါး", lo: "ມັງກອນ", km: "នាគ" } },
  { slug: "cyberpunk-wallpaper", category: "cyberpunk", tag: "cyberpunk", name: { en: "Cyberpunk", th: "ไซเบอร์พังก์", vi: "Cyberpunk", my: "Cyberpunk", lo: "ໄຊເບີພັງ", km: "Cyberpunk" } },
  { slug: "amoled-wallpaper", category: "amoled", tag: "amoled", name: { en: "AMOLED", th: "AMOLED", vi: "AMOLED", my: "AMOLED", lo: "AMOLED", km: "AMOLED" } },
  { slug: "black-wallpaper", category: "black", tag: "black", name: { en: "Black", th: "สีดำ", vi: "Màu đen", my: "အနက်ရောင်", lo: "ສີດຳ", km: "ពណ៌ខ្មៅ" } },
  { slug: "samurai-wallpaper", category: "samurai", tag: "samurai", name: { en: "Samurai", th: "ซามูไร", vi: "Samurai", my: "ဆာမူရိုင်း", lo: "ຊາມູໄຣ", km: "សាមូរ៉ៃ" } },
  { slug: "wolf-wallpaper", category: "wolf", tag: "wolf", name: { en: "Wolf", th: "หมาป่า", vi: "Sói", my: "ဝံပုလွေ", lo: "ໝາປ່າ", km: "ចចក" } },
  { slug: "car-wallpaper", category: "car", tag: "car", name: { en: "Car", th: "รถยนต์", vi: "Ô tô", my: "ကား", lo: "ລົດ", km: "ឡាន" } },
  { slug: "cute-wallpaper", category: "cute", tag: "cute", name: { en: "Cute", th: "น่ารัก", vi: "Dễ thương", my: "ချစ်စရာ", lo: "ໜ້າຮັກ", km: "គួរឱ្យស្រឡាញ់" } },
  { slug: "gaming-wallpaper", category: "gaming", tag: "gaming", name: { en: "Gaming", th: "เกมมิ่ง", vi: "Chơi game", my: "ဂိမ်းမင်း", lo: "ເກມມິ່ງ", km: "ហ្គេម" } },
];

const getContentTranslations = (nameMap: Record<Locale, string>): Record<Locale, { title: string; desc: string; h1: string; intro: string }> => {
  const resolve = (l: Locale) => nameMap[l] || nameMap.en;
  return {
    en: {
      title: `Best ${resolve("en")} Wallpapers — Free Mobile Backgrounds`,
      desc: `Browse original, high-quality ${resolve("en")} wallpapers for your mobile device. Sized perfectly for lock screens and home screens.`,
      h1: `${resolve("en")} Wallpapers`,
      intro: `Cozy, premium, and beautiful ${resolve("en")} background designs for your phone.`,
    },
    th: {
      title: `วอลเปเปอร์${resolve("th")} — ดาวน์โหลดภาพพื้นหลัง${resolve("th")}สวยๆ ฟรีสำหรับมือถือ`,
      desc: `แหล่งรวมวอลเปเปอร์${resolve("th")}คุณภาพสูง ภาพคมชัดสวยงามสไตล์แนวตั้ง เหมาะสำหรับใช้เป็นรูปหน้าจอล็อกและหน้าจอโฮม ดาวน์โหลดฟรี`,
      h1: `วอลเปเปอร์${resolve("th")}`,
      intro: `คอลเลกชันภาพพื้นหลังมือถือ${resolve("th")}ยอดนิยม ออกแบบมาเพื่อให้หน้าจอมือถือของคุณดูสวยงาม โดดเด่น และไม่รบกวนสายตา`,
    },
    vi: {
      title: `Hình nền ${resolve("vi")} đẹp nhất — Tải ảnh nền ${resolve("vi")} cho điện thoại`,
      desc: `Bộ sưu tập hình nền điện thoại chủ đề ${resolve("vi")} chất lượng cao, hình ảnh sắc nét, phù hợp cho mọi dòng máy Android và iOS.`,
      h1: `Hình nền ${resolve("vi")}`,
      intro: `Khám phá các hình nền điện thoại độc đáo chủ đề ${resolve("vi")} giúp màn hình của bạn thêm sinh động.`,
    },
    my: {
      title: `အလှဆုံး ${resolve("my")} ဖုန်းနောက်ခံပုံများ — Mobile Wallpapers`,
      desc: `သင့်မိုဘိုင်းလ်ဖုန်းအတွက် အကောင်းဆုံး ${resolve("my")} နောက်ခံပုံများကို ရှာဖွေပြီး အခမဲ့ ဒေါင်းလုဒ်ရယူပါ။`,
      h1: `${resolve("my")} ဖုန်းနောက်ခံပုံများ`,
      intro: `သင့်ဖုန်းစခရင်ကို ပိုမိုလှပစေမည့် ${resolve("my")} နောက်ခံပုံများ စုစည်းမှု။`,
    },
    lo: {
      title: `ວໍເປເປີ${resolve("lo")} — ດາວໂຫຼດພາບພື້ນຫຼັງ${resolve("lo")}ງາມໆ ຟຣີສຳລັບມືຖື`,
      desc: `ແຫຼ່ງລວມວໍເປເປີ${resolve("lo")}ຄຸນນະພາບສູງ ພາບຄົມຊັດສວຍງາມເໝາະສຳລັບໃຊ້ເປັນຮູບໜ້າຈໍລັອກ ແລະ ໜ້າຈໍໂຮມ`,
      h1: `ວໍເປເປີ${resolve("lo")}`,
      intro: `ຄອນເລກຊັນພາບພື້ນຫຼັງມືຖື${resolve("lo")}ຍອດນິຍົມ ອອກແບບມາເພື່ອໃຫ້ໜ້າຈໍມືຖືຂອງທ່ານເບິ່ງສວຍງາມ`,
    },
    km: {
      title: `ផ្ទាំងរូបភាព ${resolve("km")} ស្អាតៗ — ទាញយកផ្ទាំងរូបភាពទូរស័ព្ទ ${resolve("km")} ឥតគិតថ្លៃ`,
      desc: `ទាញយកផ្ទាំងរូបភាពទូរស័ព្ទ ${resolve("km")} គុណភាពខ្ពស់ និងស្អាតៗសម្រាប់អេក្រង់ទូរស័ព្ទ iOS និង Android របស់អ្នក។`,
      h1: `ផ្ទាំងរូបភាព ${resolve("km")}`,
      intro: `បណ្តុំផ្ទាំងរូបភាពទូរស័ព្ទ ${resolve("km")} ដ៏ស្រស់ស្អាត ដើម្បីធ្វើឱ្យអេក្រង់ទូរស័ព្ទរបស់អ្នកកាន់តែមានភាពទាក់ទាញ。`,
    },
  };
};

// 3. Programmatically compile the final landing page list
export const seoLandingPages: LandingPageDef[] = [
  ...deviceList.map((d) => {
    const translations = getDeviceTranslations(d.name);
    return {
      slug: d.slug,
      type: "device" as const,
      filter: { deviceRatio: "portrait" as const },
      title: Object.fromEntries(Object.entries(translations).map(([k, v]) => [k as Locale, v.title])) as Record<Locale, string>,
      description: Object.fromEntries(Object.entries(translations).map(([k, v]) => [k as Locale, v.desc])) as Record<Locale, string>,
      h1: Object.fromEntries(Object.entries(translations).map(([k, v]) => [k as Locale, v.h1])) as Record<Locale, string>,
      intro: Object.fromEntries(Object.entries(translations).map(([k, v]) => [k as Locale, v.intro])) as Record<Locale, string>,
    };
  }),
  ...contentList.map((c) => {
    const translations = getContentTranslations(c.name);
    return {
      slug: c.slug,
      type: "content" as const,
      filter: { category: c.category, tag: c.tag },
      title: Object.fromEntries(Object.entries(translations).map(([k, v]) => [k as Locale, v.title])) as Record<Locale, string>,
      description: Object.fromEntries(Object.entries(translations).map(([k, v]) => [k as Locale, v.desc])) as Record<Locale, string>,
      h1: Object.fromEntries(Object.entries(translations).map(([k, v]) => [k as Locale, v.h1])) as Record<Locale, string>,
      intro: Object.fromEntries(Object.entries(translations).map(([k, v]) => [k as Locale, v.intro])) as Record<Locale, string>,
    };
  }),
];

export function getLandingPage(slug: string): LandingPageDef | undefined {
  return seoLandingPages.find((p) => p.slug === slug);
}
