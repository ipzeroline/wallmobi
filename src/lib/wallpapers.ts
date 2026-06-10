import type { Locale } from "@/i18n/config";
import type { CategorySlug } from "./site";

export type LocalizedText = Record<Locale, string>;

export type Wallpaper = {
  slug: string;
  title: string;
  desc: LocalizedText;
  category: CategorySlug;
  color: string;
  src: string;
  width: number;
  height: number;
  tags: string[];
  downloads: number;
  published: string;
};

export const wallpapers: Wallpaper[] = [
  {
    "slug": "anime-1",
    "title": "Ghibli Meadow",
    "category": "anime",
    "color": "#bb8a44",
    "src": "/wallpapers/anime-1.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "anime",
      "ghibli",
      "wallpaper",
      "highres"
    ],
    "downloads": 23738,
    "published": "2026-06-05",
    "desc": {
      "en": "A stunning Ghibli Meadow wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Ghibli Meadow ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Ghibli Meadow tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Ghibli Meadow ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Ghibli Meadow ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Ghibli Meadow နောက်ခံပုံ။"
    }
  },
  {
    "slug": "anime-2",
    "title": "Cherry Railway",
    "category": "anime",
    "color": "#5fb03d",
    "src": "/wallpapers/anime-2.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "anime",
      "cherry",
      "wallpaper",
      "highres"
    ],
    "downloads": 28437,
    "published": "2026-06-03",
    "desc": {
      "en": "A stunning Cherry Railway wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Cherry Railway ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Cherry Railway tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Cherry Railway ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Cherry Railway ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Cherry Railway နောက်ခံပုံ။"
    }
  },
  {
    "slug": "anime-3",
    "title": "Mountain Shrine",
    "category": "anime",
    "color": "#1b6ca8",
    "src": "/wallpapers/anime-3.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "anime",
      "mountain",
      "wallpaper",
      "highres"
    ],
    "downloads": 15477,
    "published": "2026-06-01",
    "desc": {
      "en": "A stunning Mountain Shrine wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Mountain Shrine ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Mountain Shrine tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Mountain Shrine ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Mountain Shrine ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Mountain Shrine နောက်ခံပုံ။"
    }
  },
  {
    "slug": "anime-4",
    "title": "Summer Clouds",
    "category": "anime",
    "color": "#c8443f",
    "src": "/wallpapers/anime-4.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "anime",
      "summer",
      "wallpaper",
      "highres"
    ],
    "downloads": 20756,
    "published": "2026-05-30",
    "desc": {
      "en": "A stunning Summer Clouds wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Summer Clouds ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Summer Clouds tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Summer Clouds ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Summer Clouds ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Summer Clouds နောက်ခံပုံ။"
    }
  },
  {
    "slug": "anime-5",
    "title": "Fuji Sunset",
    "category": "anime",
    "color": "#7b4bd6",
    "src": "/wallpapers/anime-5.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "anime",
      "fuji",
      "wallpaper",
      "highres"
    ],
    "downloads": 12261,
    "published": "2026-05-28",
    "desc": {
      "en": "A stunning Fuji Sunset wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Fuji Sunset ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Fuji Sunset tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Fuji Sunset ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Fuji Sunset ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Fuji Sunset နောက်ခံပုံ။"
    }
  },
  {
    "slug": "anime-6",
    "title": "Cozy Rain",
    "category": "anime",
    "color": "#5c7b52",
    "src": "/wallpapers/anime-6.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "anime",
      "cozy",
      "wallpaper",
      "highres"
    ],
    "downloads": 14435,
    "published": "2026-05-26",
    "desc": {
      "en": "A stunning Cozy Rain wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Cozy Rain ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Cozy Rain tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Cozy Rain ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Cozy Rain ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Cozy Rain နောက်ခံပုံ။"
    }
  },
  {
    "slug": "anime-7",
    "title": "Dreamy Forest",
    "category": "anime",
    "color": "#e07a1f",
    "src": "/wallpapers/anime-7.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "anime",
      "dreamy",
      "wallpaper",
      "highres"
    ],
    "downloads": 19623,
    "published": "2026-05-24",
    "desc": {
      "en": "A stunning Dreamy Forest wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Dreamy Forest ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Dreamy Forest tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Dreamy Forest ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Dreamy Forest ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Dreamy Forest နောက်ခံပုံ။"
    }
  },
  {
    "slug": "anime-8",
    "title": "Sky Sanctuary",
    "category": "anime",
    "color": "#1f9aa6",
    "src": "/wallpapers/anime-8.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "anime",
      "sky",
      "wallpaper",
      "highres"
    ],
    "downloads": 21708,
    "published": "2026-05-22",
    "desc": {
      "en": "A stunning Sky Sanctuary wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Sky Sanctuary ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Sky Sanctuary tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Sky Sanctuary ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Sky Sanctuary ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Sky Sanctuary နောက်ခံပုံ။"
    }
  },
  {
    "slug": "anime-9",
    "title": "Sunset Shore",
    "category": "anime",
    "color": "#33343a",
    "src": "/wallpapers/anime-9.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "anime",
      "sunset",
      "wallpaper",
      "highres"
    ],
    "downloads": 12578,
    "published": "2026-05-20",
    "desc": {
      "en": "A stunning Sunset Shore wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Sunset Shore ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Sunset Shore tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Sunset Shore ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Sunset Shore ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Sunset Shore နောက်ခံပုံ။"
    }
  },
  {
    "slug": "anime-10",
    "title": "School Gate",
    "category": "anime",
    "color": "#d86b8f",
    "src": "/wallpapers/anime-10.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "anime",
      "school",
      "wallpaper",
      "highres"
    ],
    "downloads": 15012,
    "published": "2026-05-18",
    "desc": {
      "en": "A stunning School Gate wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ School Gate ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền School Gate tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ School Gate ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ School Gate ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် School Gate နောက်ခံပုံ။"
    }
  },
  {
    "slug": "dragon-1",
    "title": "Fire Dragon",
    "category": "dragon",
    "color": "#c8443f",
    "src": "/wallpapers/dragon-1.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "dragon",
      "fire",
      "wallpaper",
      "highres"
    ],
    "downloads": 18053,
    "published": "2026-06-07",
    "desc": {
      "en": "A stunning Fire Dragon wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Fire Dragon ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Fire Dragon tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Fire Dragon ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Fire Dragon ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Fire Dragon နောက်ခံပုံ။"
    }
  },
  {
    "slug": "dragon-2",
    "title": "Ice Dragon",
    "category": "dragon",
    "color": "#7b4bd6",
    "src": "/wallpapers/dragon-2.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "dragon",
      "ice",
      "wallpaper",
      "highres"
    ],
    "downloads": 23636,
    "published": "2026-06-05",
    "desc": {
      "en": "A stunning Ice Dragon wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Ice Dragon ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Ice Dragon tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Ice Dragon ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Ice Dragon ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Ice Dragon နောက်ခံပုံ။"
    }
  },
  {
    "slug": "dragon-3",
    "title": "Shadow Dragon",
    "category": "dragon",
    "color": "#5c7b52",
    "src": "/wallpapers/dragon-3.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "dragon",
      "shadow",
      "wallpaper",
      "highres"
    ],
    "downloads": 23603,
    "published": "2026-06-03",
    "desc": {
      "en": "A stunning Shadow Dragon wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Shadow Dragon ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Shadow Dragon tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Shadow Dragon ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Shadow Dragon ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Shadow Dragon နောက်ခံပုံ။"
    }
  },
  {
    "slug": "dragon-4",
    "title": "Golden Dragon",
    "category": "dragon",
    "color": "#e07a1f",
    "src": "/wallpapers/dragon-4.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "dragon",
      "golden",
      "wallpaper",
      "highres"
    ],
    "downloads": 25234,
    "published": "2026-06-01",
    "desc": {
      "en": "A stunning Golden Dragon wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Golden Dragon ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Golden Dragon tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Golden Dragon ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Golden Dragon ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Golden Dragon နောက်ခံပုံ။"
    }
  },
  {
    "slug": "dragon-5",
    "title": "Forest Dragon",
    "category": "dragon",
    "color": "#1f9aa6",
    "src": "/wallpapers/dragon-5.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "dragon",
      "forest",
      "wallpaper",
      "highres"
    ],
    "downloads": 18173,
    "published": "2026-05-30",
    "desc": {
      "en": "A stunning Forest Dragon wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Forest Dragon ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Forest Dragon tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Forest Dragon ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Forest Dragon ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Forest Dragon နောက်ခံပုံ။"
    }
  },
  {
    "slug": "dragon-6",
    "title": "Storm Dragon",
    "category": "dragon",
    "color": "#33343a",
    "src": "/wallpapers/dragon-6.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "dragon",
      "storm",
      "wallpaper",
      "highres"
    ],
    "downloads": 13437,
    "published": "2026-05-28",
    "desc": {
      "en": "A stunning Storm Dragon wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Storm Dragon ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Storm Dragon tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Storm Dragon ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Storm Dragon ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Storm Dragon နောက်ခံပုံ။"
    }
  },
  {
    "slug": "dragon-7",
    "title": "Ancient Dragon",
    "category": "dragon",
    "color": "#d86b8f",
    "src": "/wallpapers/dragon-7.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "dragon",
      "ancient",
      "wallpaper",
      "highres"
    ],
    "downloads": 14875,
    "published": "2026-05-26",
    "desc": {
      "en": "A stunning Ancient Dragon wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Ancient Dragon ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Ancient Dragon tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Ancient Dragon ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Ancient Dragon ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Ancient Dragon နောက်ခံပုံ။"
    }
  },
  {
    "slug": "dragon-8",
    "title": "Spectral Dragon",
    "category": "dragon",
    "color": "#2d6bff",
    "src": "/wallpapers/dragon-8.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "dragon",
      "spectral",
      "wallpaper",
      "highres"
    ],
    "downloads": 26894,
    "published": "2026-05-24",
    "desc": {
      "en": "A stunning Spectral Dragon wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Spectral Dragon ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Spectral Dragon tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Spectral Dragon ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Spectral Dragon ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Spectral Dragon နောက်ခံပုံ။"
    }
  },
  {
    "slug": "dragon-9",
    "title": "Obsidian Dragon",
    "category": "dragon",
    "color": "#bb8a44",
    "src": "/wallpapers/dragon-9.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "dragon",
      "obsidian",
      "wallpaper",
      "highres"
    ],
    "downloads": 22997,
    "published": "2026-05-22",
    "desc": {
      "en": "A stunning Obsidian Dragon wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Obsidian Dragon ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Obsidian Dragon tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Obsidian Dragon ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Obsidian Dragon ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Obsidian Dragon နောက်ခံပုံ။"
    }
  },
  {
    "slug": "dragon-10",
    "title": "Mystic Dragon",
    "category": "dragon",
    "color": "#5fb03d",
    "src": "/wallpapers/dragon-10.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "dragon",
      "mystic",
      "wallpaper",
      "highres"
    ],
    "downloads": 22363,
    "published": "2026-05-20",
    "desc": {
      "en": "A stunning Mystic Dragon wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Mystic Dragon ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Mystic Dragon tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Mystic Dragon ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Mystic Dragon ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Mystic Dragon နောက်ခံပုံ။"
    }
  },
  {
    "slug": "black-1",
    "title": "Stealth Noir",
    "category": "black",
    "color": "#5fb03d",
    "src": "/wallpapers/black-1.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "black",
      "stealth",
      "wallpaper",
      "highres"
    ],
    "downloads": 24289,
    "published": "2026-06-04",
    "desc": {
      "en": "A stunning Stealth Noir wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Stealth Noir ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Stealth Noir tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Stealth Noir ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Stealth Noir ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Stealth Noir နောက်ခံပုံ။"
    }
  },
  {
    "slug": "black-2",
    "title": "Carbon Grid",
    "category": "black",
    "color": "#1b6ca8",
    "src": "/wallpapers/black-2.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "black",
      "carbon",
      "wallpaper",
      "highres"
    ],
    "downloads": 24208,
    "published": "2026-06-02",
    "desc": {
      "en": "A stunning Carbon Grid wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Carbon Grid ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Carbon Grid tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Carbon Grid ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Carbon Grid ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Carbon Grid နောက်ခံပုံ။"
    }
  },
  {
    "slug": "black-3",
    "title": "Minimal Wave",
    "category": "black",
    "color": "#c8443f",
    "src": "/wallpapers/black-3.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "black",
      "minimal",
      "wallpaper",
      "highres"
    ],
    "downloads": 5221,
    "published": "2026-05-31",
    "desc": {
      "en": "A stunning Minimal Wave wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Minimal Wave ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Minimal Wave tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Minimal Wave ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Minimal Wave ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Minimal Wave နောက်ခံပုံ။"
    }
  },
  {
    "slug": "black-4",
    "title": "Obsidian Fold",
    "category": "black",
    "color": "#7b4bd6",
    "src": "/wallpapers/black-4.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "black",
      "obsidian",
      "wallpaper",
      "highres"
    ],
    "downloads": 17095,
    "published": "2026-05-29",
    "desc": {
      "en": "A stunning Obsidian Fold wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Obsidian Fold ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Obsidian Fold tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Obsidian Fold ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Obsidian Fold ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Obsidian Fold နောက်ခံပုံ။"
    }
  },
  {
    "slug": "black-5",
    "title": "Dark Matte",
    "category": "black",
    "color": "#5c7b52",
    "src": "/wallpapers/black-5.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "black",
      "dark",
      "wallpaper",
      "highres"
    ],
    "downloads": 5379,
    "published": "2026-05-27",
    "desc": {
      "en": "A stunning Dark Matte wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Dark Matte ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Dark Matte tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Dark Matte ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Dark Matte ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Dark Matte နောက်ခံပုံ။"
    }
  },
  {
    "slug": "black-6",
    "title": "Shadow Lines",
    "category": "black",
    "color": "#e07a1f",
    "src": "/wallpapers/black-6.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "black",
      "shadow",
      "wallpaper",
      "highres"
    ],
    "downloads": 16258,
    "published": "2026-05-25",
    "desc": {
      "en": "A stunning Shadow Lines wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Shadow Lines ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Shadow Lines tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Shadow Lines ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Shadow Lines ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Shadow Lines နောက်ခံပုံ။"
    }
  },
  {
    "slug": "black-7",
    "title": "Monochrome Spheres",
    "category": "black",
    "color": "#1f9aa6",
    "src": "/wallpapers/black-7.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "black",
      "monochrome",
      "wallpaper",
      "highres"
    ],
    "downloads": 17457,
    "published": "2026-05-23",
    "desc": {
      "en": "A stunning Monochrome Spheres wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Monochrome Spheres ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Monochrome Spheres tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Monochrome Spheres ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Monochrome Spheres ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Monochrome Spheres နောက်ခံပုံ။"
    }
  },
  {
    "slug": "black-8",
    "title": "Charcoal Mist",
    "category": "black",
    "color": "#33343a",
    "src": "/wallpapers/black-8.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "black",
      "charcoal",
      "wallpaper",
      "highres"
    ],
    "downloads": 5086,
    "published": "2026-05-21",
    "desc": {
      "en": "A stunning Charcoal Mist wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Charcoal Mist ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Charcoal Mist tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Charcoal Mist ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Charcoal Mist ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Charcoal Mist နောက်ခံပုံ။"
    }
  },
  {
    "slug": "black-9",
    "title": "Eclipse Ring",
    "category": "black",
    "color": "#d86b8f",
    "src": "/wallpapers/black-9.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "black",
      "eclipse",
      "wallpaper",
      "highres"
    ],
    "downloads": 15657,
    "published": "2026-05-19",
    "desc": {
      "en": "A stunning Eclipse Ring wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Eclipse Ring ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Eclipse Ring tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Eclipse Ring ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Eclipse Ring ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Eclipse Ring နောက်ခံပုံ။"
    }
  },
  {
    "slug": "black-10",
    "title": "Void Texture",
    "category": "black",
    "color": "#2d6bff",
    "src": "/wallpapers/black-10.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "black",
      "void",
      "wallpaper",
      "highres"
    ],
    "downloads": 28375,
    "published": "2026-05-17",
    "desc": {
      "en": "A stunning Void Texture wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Void Texture ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Void Texture tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Void Texture ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Void Texture ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Void Texture နောက်ခံပုံ။"
    }
  },
  {
    "slug": "amoled-1",
    "title": "Neon Pulse",
    "category": "amoled",
    "color": "#bb8a44",
    "src": "/wallpapers/amoled-1.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "amoled",
      "neon",
      "wallpaper",
      "highres"
    ],
    "downloads": 13706,
    "published": "2026-06-05",
    "desc": {
      "en": "A stunning Neon Pulse wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Neon Pulse ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Neon Pulse tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Neon Pulse ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Neon Pulse ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Neon Pulse နောက်ခံပုံ။"
    }
  },
  {
    "slug": "amoled-2",
    "title": "Eclipse Glow",
    "category": "amoled",
    "color": "#5fb03d",
    "src": "/wallpapers/amoled-2.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "amoled",
      "eclipse",
      "wallpaper",
      "highres"
    ],
    "downloads": 8709,
    "published": "2026-06-03",
    "desc": {
      "en": "A stunning Eclipse Glow wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Eclipse Glow ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Eclipse Glow tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Eclipse Glow ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Eclipse Glow ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Eclipse Glow နောက်ခံပုံ။"
    }
  },
  {
    "slug": "amoled-3",
    "title": "Electric Line",
    "category": "amoled",
    "color": "#1b6ca8",
    "src": "/wallpapers/amoled-3.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "amoled",
      "electric",
      "wallpaper",
      "highres"
    ],
    "downloads": 25344,
    "published": "2026-06-01",
    "desc": {
      "en": "A stunning Electric Line wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Electric Line ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Electric Line tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Electric Line ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Electric Line ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Electric Line နောက်ခံပုံ။"
    }
  },
  {
    "slug": "amoled-4",
    "title": "Quantum Core",
    "category": "amoled",
    "color": "#c8443f",
    "src": "/wallpapers/amoled-4.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "amoled",
      "quantum",
      "wallpaper",
      "highres"
    ],
    "downloads": 27264,
    "published": "2026-05-30",
    "desc": {
      "en": "A stunning Quantum Core wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Quantum Core ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Quantum Core tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Quantum Core ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Quantum Core ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Quantum Core နောက်ခံပုံ။"
    }
  },
  {
    "slug": "amoled-5",
    "title": "Luminescent Ring",
    "category": "amoled",
    "color": "#7b4bd6",
    "src": "/wallpapers/amoled-5.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "amoled",
      "luminescent",
      "wallpaper",
      "highres"
    ],
    "downloads": 25030,
    "published": "2026-05-28",
    "desc": {
      "en": "A stunning Luminescent Ring wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Luminescent Ring ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Luminescent Ring tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Luminescent Ring ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Luminescent Ring ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Luminescent Ring နောက်ခံပုံ။"
    }
  },
  {
    "slug": "amoled-6",
    "title": "Deep Void",
    "category": "amoled",
    "color": "#5c7b52",
    "src": "/wallpapers/amoled-6.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "amoled",
      "deep",
      "wallpaper",
      "highres"
    ],
    "downloads": 26858,
    "published": "2026-05-26",
    "desc": {
      "en": "A stunning Deep Void wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Deep Void ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Deep Void tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Deep Void ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Deep Void ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Deep Void နောက်ခံပုံ။"
    }
  },
  {
    "slug": "amoled-7",
    "title": "Binary Star",
    "category": "amoled",
    "color": "#e07a1f",
    "src": "/wallpapers/amoled-7.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "amoled",
      "binary",
      "wallpaper",
      "highres"
    ],
    "downloads": 22705,
    "published": "2026-05-24",
    "desc": {
      "en": "A stunning Binary Star wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Binary Star ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Binary Star tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Binary Star ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Binary Star ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Binary Star နောက်ခံပုံ။"
    }
  },
  {
    "slug": "amoled-8",
    "title": "Prism Edge",
    "category": "amoled",
    "color": "#1f9aa6",
    "src": "/wallpapers/amoled-8.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "amoled",
      "prism",
      "wallpaper",
      "highres"
    ],
    "downloads": 7627,
    "published": "2026-05-22",
    "desc": {
      "en": "A stunning Prism Edge wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Prism Edge ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Prism Edge tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Prism Edge ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Prism Edge ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Prism Edge နောက်ခံပုံ။"
    }
  },
  {
    "slug": "amoled-9",
    "title": "Strobe Wave",
    "category": "amoled",
    "color": "#33343a",
    "src": "/wallpapers/amoled-9.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "amoled",
      "strobe",
      "wallpaper",
      "highres"
    ],
    "downloads": 21729,
    "published": "2026-05-20",
    "desc": {
      "en": "A stunning Strobe Wave wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Strobe Wave ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Strobe Wave tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Strobe Wave ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Strobe Wave ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Strobe Wave နောက်ခံပုံ။"
    }
  },
  {
    "slug": "amoled-10",
    "title": "Infinity Core",
    "category": "amoled",
    "color": "#d86b8f",
    "src": "/wallpapers/amoled-10.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "amoled",
      "infinity",
      "wallpaper",
      "highres"
    ],
    "downloads": 13941,
    "published": "2026-05-18",
    "desc": {
      "en": "A stunning Infinity Core wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Infinity Core ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Infinity Core tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Infinity Core ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Infinity Core ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Infinity Core နောက်ခံပုံ။"
    }
  },
  {
    "slug": "aesthetic-1",
    "title": "Retro Sun",
    "category": "aesthetic",
    "color": "#bb8a44",
    "src": "/wallpapers/aesthetic-1.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "aesthetic",
      "retro",
      "wallpaper",
      "highres"
    ],
    "downloads": 9918,
    "published": "2026-06-05",
    "desc": {
      "en": "A stunning Retro Sun wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Retro Sun ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Retro Sun tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Retro Sun ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Retro Sun ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Retro Sun နောက်ခံပုံ။"
    }
  },
  {
    "slug": "aesthetic-2",
    "title": "Vaporwave Horizon",
    "category": "aesthetic",
    "color": "#5fb03d",
    "src": "/wallpapers/aesthetic-2.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "aesthetic",
      "vaporwave",
      "wallpaper",
      "highres"
    ],
    "downloads": 9015,
    "published": "2026-06-03",
    "desc": {
      "en": "A stunning Vaporwave Horizon wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Vaporwave Horizon ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Vaporwave Horizon tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Vaporwave Horizon ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Vaporwave Horizon ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Vaporwave Horizon နောက်ခံပုံ။"
    }
  },
  {
    "slug": "aesthetic-3",
    "title": "Pastel Cloud",
    "category": "aesthetic",
    "color": "#1b6ca8",
    "src": "/wallpapers/aesthetic-3.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "aesthetic",
      "pastel",
      "wallpaper",
      "highres"
    ],
    "downloads": 11594,
    "published": "2026-06-01",
    "desc": {
      "en": "A stunning Pastel Cloud wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Pastel Cloud ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Pastel Cloud tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Pastel Cloud ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Pastel Cloud ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Pastel Cloud နောက်ခံပုံ။"
    }
  },
  {
    "slug": "aesthetic-4",
    "title": "Dreamscape Gateway",
    "category": "aesthetic",
    "color": "#c8443f",
    "src": "/wallpapers/aesthetic-4.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "aesthetic",
      "dreamscape",
      "wallpaper",
      "highres"
    ],
    "downloads": 9661,
    "published": "2026-05-30",
    "desc": {
      "en": "A stunning Dreamscape Gateway wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Dreamscape Gateway ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Dreamscape Gateway tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Dreamscape Gateway ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Dreamscape Gateway ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Dreamscape Gateway နောက်ခံပုံ။"
    }
  },
  {
    "slug": "aesthetic-5",
    "title": "Lofi Sunset",
    "category": "aesthetic",
    "color": "#7b4bd6",
    "src": "/wallpapers/aesthetic-5.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "aesthetic",
      "lofi",
      "wallpaper",
      "highres"
    ],
    "downloads": 15306,
    "published": "2026-05-28",
    "desc": {
      "en": "A stunning Lofi Sunset wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Lofi Sunset ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Lofi Sunset tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Lofi Sunset ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Lofi Sunset ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Lofi Sunset နောက်ခံပုံ။"
    }
  },
  {
    "slug": "aesthetic-6",
    "title": "Lavender Haze",
    "category": "aesthetic",
    "color": "#5c7b52",
    "src": "/wallpapers/aesthetic-6.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "aesthetic",
      "lavender",
      "wallpaper",
      "highres"
    ],
    "downloads": 19378,
    "published": "2026-05-26",
    "desc": {
      "en": "A stunning Lavender Haze wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Lavender Haze ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Lavender Haze tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Lavender Haze ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Lavender Haze ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Lavender Haze နောက်ခံပုံ။"
    }
  },
  {
    "slug": "aesthetic-7",
    "title": "Glitch Mirage",
    "category": "aesthetic",
    "color": "#e07a1f",
    "src": "/wallpapers/aesthetic-7.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "aesthetic",
      "glitch",
      "wallpaper",
      "highres"
    ],
    "downloads": 18841,
    "published": "2026-05-24",
    "desc": {
      "en": "A stunning Glitch Mirage wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Glitch Mirage ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Glitch Mirage tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Glitch Mirage ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Glitch Mirage ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Glitch Mirage နောက်ခံပုံ။"
    }
  },
  {
    "slug": "aesthetic-8",
    "title": "Cyber Sunset",
    "category": "aesthetic",
    "color": "#1f9aa6",
    "src": "/wallpapers/aesthetic-8.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "aesthetic",
      "cyber",
      "wallpaper",
      "highres"
    ],
    "downloads": 15438,
    "published": "2026-05-22",
    "desc": {
      "en": "A stunning Cyber Sunset wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Cyber Sunset ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Cyber Sunset tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Cyber Sunset ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Cyber Sunset ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Cyber Sunset နောက်ခံပုံ။"
    }
  },
  {
    "slug": "aesthetic-9",
    "title": "Chroma Valley",
    "category": "aesthetic",
    "color": "#33343a",
    "src": "/wallpapers/aesthetic-9.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "aesthetic",
      "chroma",
      "wallpaper",
      "highres"
    ],
    "downloads": 27814,
    "published": "2026-05-20",
    "desc": {
      "en": "A stunning Chroma Valley wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Chroma Valley ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Chroma Valley tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Chroma Valley ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Chroma Valley ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Chroma Valley နောက်ခံပုံ။"
    }
  },
  {
    "slug": "aesthetic-10",
    "title": "Ocean Breeze",
    "category": "aesthetic",
    "color": "#d86b8f",
    "src": "/wallpapers/aesthetic-10.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "aesthetic",
      "ocean",
      "wallpaper",
      "highres"
    ],
    "downloads": 15147,
    "published": "2026-05-18",
    "desc": {
      "en": "A stunning Ocean Breeze wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Ocean Breeze ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Ocean Breeze tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Ocean Breeze ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Ocean Breeze ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Ocean Breeze နောက်ခံပုံ။"
    }
  },
  {
    "slug": "cyberpunk-1",
    "title": "Neon Tokyo",
    "category": "cyberpunk",
    "color": "#1b6ca8",
    "src": "/wallpapers/cyberpunk-1.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "cyberpunk",
      "neon",
      "wallpaper",
      "highres"
    ],
    "downloads": 9877,
    "published": "2026-06-03",
    "desc": {
      "en": "A stunning Neon Tokyo wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Neon Tokyo ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Neon Tokyo tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Neon Tokyo ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Neon Tokyo ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Neon Tokyo နောက်ခံပုံ။"
    }
  },
  {
    "slug": "cyberpunk-2",
    "title": "Cyber Alley",
    "category": "cyberpunk",
    "color": "#c8443f",
    "src": "/wallpapers/cyberpunk-2.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "cyberpunk",
      "cyber",
      "wallpaper",
      "highres"
    ],
    "downloads": 8781,
    "published": "2026-06-01",
    "desc": {
      "en": "A stunning Cyber Alley wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Cyber Alley ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Cyber Alley tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Cyber Alley ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Cyber Alley ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Cyber Alley နောက်ခံပုံ။"
    }
  },
  {
    "slug": "cyberpunk-3",
    "title": "Synthwave Drive",
    "category": "cyberpunk",
    "color": "#7b4bd6",
    "src": "/wallpapers/cyberpunk-3.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "cyberpunk",
      "synthwave",
      "wallpaper",
      "highres"
    ],
    "downloads": 26036,
    "published": "2026-05-30",
    "desc": {
      "en": "A stunning Synthwave Drive wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Synthwave Drive ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Synthwave Drive tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Synthwave Drive ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Synthwave Drive ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Synthwave Drive နောက်ခံပုံ။"
    }
  },
  {
    "slug": "cyberpunk-4",
    "title": "Neon Motorcycle",
    "category": "cyberpunk",
    "color": "#5c7b52",
    "src": "/wallpapers/cyberpunk-4.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "cyberpunk",
      "neon",
      "wallpaper",
      "highres"
    ],
    "downloads": 11974,
    "published": "2026-05-28",
    "desc": {
      "en": "A stunning Neon Motorcycle wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Neon Motorcycle ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Neon Motorcycle tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Neon Motorcycle ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Neon Motorcycle ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Neon Motorcycle နောက်ခံပုံ။"
    }
  },
  {
    "slug": "cyberpunk-5",
    "title": "Megacity Spire",
    "category": "cyberpunk",
    "color": "#e07a1f",
    "src": "/wallpapers/cyberpunk-5.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "cyberpunk",
      "megacity",
      "wallpaper",
      "highres"
    ],
    "downloads": 6856,
    "published": "2026-05-26",
    "desc": {
      "en": "A stunning Megacity Spire wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Megacity Spire ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Megacity Spire tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Megacity Spire ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Megacity Spire ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Megacity Spire နောက်ခံပုံ။"
    }
  },
  {
    "slug": "cyberpunk-6",
    "title": "Cyber Circuits",
    "category": "cyberpunk",
    "color": "#1f9aa6",
    "src": "/wallpapers/cyberpunk-6.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "cyberpunk",
      "cyber",
      "wallpaper",
      "highres"
    ],
    "downloads": 8583,
    "published": "2026-05-24",
    "desc": {
      "en": "A stunning Cyber Circuits wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Cyber Circuits ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Cyber Circuits tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Cyber Circuits ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Cyber Circuits ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Cyber Circuits နောက်ခံပုံ။"
    }
  },
  {
    "slug": "cyberpunk-7",
    "title": "Glitch City",
    "category": "cyberpunk",
    "color": "#33343a",
    "src": "/wallpapers/cyberpunk-7.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "cyberpunk",
      "glitch",
      "wallpaper",
      "highres"
    ],
    "downloads": 23248,
    "published": "2026-05-22",
    "desc": {
      "en": "A stunning Glitch City wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Glitch City ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Glitch City tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Glitch City ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Glitch City ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Glitch City နောက်ခံပုံ။"
    }
  },
  {
    "slug": "cyberpunk-8",
    "title": "Netrunner Den",
    "category": "cyberpunk",
    "color": "#d86b8f",
    "src": "/wallpapers/cyberpunk-8.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "cyberpunk",
      "netrunner",
      "wallpaper",
      "highres"
    ],
    "downloads": 16220,
    "published": "2026-05-20",
    "desc": {
      "en": "A stunning Netrunner Den wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Netrunner Den ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Netrunner Den tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Netrunner Den ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Netrunner Den ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Netrunner Den နောက်ခံပုံ။"
    }
  },
  {
    "slug": "cyberpunk-9",
    "title": "Holo Billboard",
    "category": "cyberpunk",
    "color": "#2d6bff",
    "src": "/wallpapers/cyberpunk-9.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "cyberpunk",
      "holo",
      "wallpaper",
      "highres"
    ],
    "downloads": 29811,
    "published": "2026-05-18",
    "desc": {
      "en": "A stunning Holo Billboard wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Holo Billboard ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Holo Billboard tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Holo Billboard ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Holo Billboard ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Holo Billboard နောက်ခံပုံ။"
    }
  },
  {
    "slug": "cyberpunk-10",
    "title": "Grid Horizon",
    "category": "cyberpunk",
    "color": "#bb8a44",
    "src": "/wallpapers/cyberpunk-10.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "cyberpunk",
      "grid",
      "wallpaper",
      "highres"
    ],
    "downloads": 17258,
    "published": "2026-05-16",
    "desc": {
      "en": "A stunning Grid Horizon wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Grid Horizon ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Grid Horizon tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Grid Horizon ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Grid Horizon ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Grid Horizon နောက်ခံပုံ။"
    }
  },
  {
    "slug": "samurai-1",
    "title": "Ronin Path",
    "category": "samurai",
    "color": "#1f9aa6",
    "src": "/wallpapers/samurai-1.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "samurai",
      "ronin",
      "wallpaper",
      "highres"
    ],
    "downloads": 9060,
    "published": "2026-06-07",
    "desc": {
      "en": "A stunning Ronin Path wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Ronin Path ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Ronin Path tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Ronin Path ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Ronin Path ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Ronin Path နောက်ခံပုံ။"
    }
  },
  {
    "slug": "samurai-2",
    "title": "Katana Glint",
    "category": "samurai",
    "color": "#33343a",
    "src": "/wallpapers/samurai-2.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "samurai",
      "katana",
      "wallpaper",
      "highres"
    ],
    "downloads": 28406,
    "published": "2026-06-05",
    "desc": {
      "en": "A stunning Katana Glint wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Katana Glint ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Katana Glint tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Katana Glint ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Katana Glint ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Katana Glint နောက်ခံပုံ။"
    }
  },
  {
    "slug": "samurai-3",
    "title": "Cherry Warrior",
    "category": "samurai",
    "color": "#d86b8f",
    "src": "/wallpapers/samurai-3.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "samurai",
      "cherry",
      "wallpaper",
      "highres"
    ],
    "downloads": 11571,
    "published": "2026-06-03",
    "desc": {
      "en": "A stunning Cherry Warrior wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Cherry Warrior ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Cherry Warrior tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Cherry Warrior ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Cherry Warrior ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Cherry Warrior နောက်ခံပုံ။"
    }
  },
  {
    "slug": "samurai-4",
    "title": "Bamboo Duel",
    "category": "samurai",
    "color": "#2d6bff",
    "src": "/wallpapers/samurai-4.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "samurai",
      "bamboo",
      "wallpaper",
      "highres"
    ],
    "downloads": 12859,
    "published": "2026-06-01",
    "desc": {
      "en": "A stunning Bamboo Duel wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Bamboo Duel ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Bamboo Duel tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Bamboo Duel ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Bamboo Duel ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Bamboo Duel နောက်ခံပုံ။"
    }
  },
  {
    "slug": "samurai-5",
    "title": "Shadow Samurai",
    "category": "samurai",
    "color": "#bb8a44",
    "src": "/wallpapers/samurai-5.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "samurai",
      "shadow",
      "wallpaper",
      "highres"
    ],
    "downloads": 27135,
    "published": "2026-05-30",
    "desc": {
      "en": "A stunning Shadow Samurai wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Shadow Samurai ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Shadow Samurai tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Shadow Samurai ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Shadow Samurai ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Shadow Samurai နောက်ခံပုံ။"
    }
  },
  {
    "slug": "samurai-6",
    "title": "Golden Armor",
    "category": "samurai",
    "color": "#5fb03d",
    "src": "/wallpapers/samurai-6.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "samurai",
      "golden",
      "wallpaper",
      "highres"
    ],
    "downloads": 28426,
    "published": "2026-05-28",
    "desc": {
      "en": "A stunning Golden Armor wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Golden Armor ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Golden Armor tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Golden Armor ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Golden Armor ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Golden Armor နောက်ခံပုံ။"
    }
  },
  {
    "slug": "samurai-7",
    "title": "Sunset Blade",
    "category": "samurai",
    "color": "#1b6ca8",
    "src": "/wallpapers/samurai-7.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "samurai",
      "sunset",
      "wallpaper",
      "highres"
    ],
    "downloads": 28068,
    "published": "2026-05-26",
    "desc": {
      "en": "A stunning Sunset Blade wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Sunset Blade ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Sunset Blade tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Sunset Blade ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Sunset Blade ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Sunset Blade နောက်ခံပုံ။"
    }
  },
  {
    "slug": "samurai-8",
    "title": "Mist Dojo",
    "category": "samurai",
    "color": "#c8443f",
    "src": "/wallpapers/samurai-8.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "samurai",
      "mist",
      "wallpaper",
      "highres"
    ],
    "downloads": 27806,
    "published": "2026-05-24",
    "desc": {
      "en": "A stunning Mist Dojo wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Mist Dojo ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Mist Dojo tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Mist Dojo ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Mist Dojo ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Mist Dojo နောက်ခံပုံ။"
    }
  },
  {
    "slug": "samurai-9",
    "title": "Historic Spirit",
    "category": "samurai",
    "color": "#7b4bd6",
    "src": "/wallpapers/samurai-9.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "samurai",
      "historic",
      "wallpaper",
      "highres"
    ],
    "downloads": 13520,
    "published": "2026-05-22",
    "desc": {
      "en": "A stunning Historic Spirit wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Historic Spirit ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Historic Spirit tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Historic Spirit ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Historic Spirit ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Historic Spirit နောက်ခံပုံ။"
    }
  },
  {
    "slug": "samurai-10",
    "title": "Zen Guardian",
    "category": "samurai",
    "color": "#5c7b52",
    "src": "/wallpapers/samurai-10.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "samurai",
      "zen",
      "wallpaper",
      "highres"
    ],
    "downloads": 12336,
    "published": "2026-05-20",
    "desc": {
      "en": "A stunning Zen Guardian wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Zen Guardian ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Zen Guardian tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Zen Guardian ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Zen Guardian ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Zen Guardian နောက်ခံပုံ။"
    }
  },
  {
    "slug": "oni-1",
    "title": "Oni Mask",
    "category": "oni",
    "color": "#c8443f",
    "src": "/wallpapers/oni-1.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "oni",
      "oni",
      "wallpaper",
      "highres"
    ],
    "downloads": 29091,
    "published": "2026-06-06",
    "desc": {
      "en": "A stunning Oni Mask wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Oni Mask ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Oni Mask tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Oni Mask ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Oni Mask ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Oni Mask နောက်ခံပုံ။"
    }
  },
  {
    "slug": "oni-2",
    "title": "Demon Fire",
    "category": "oni",
    "color": "#7b4bd6",
    "src": "/wallpapers/oni-2.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "oni",
      "demon",
      "wallpaper",
      "highres"
    ],
    "downloads": 6402,
    "published": "2026-06-04",
    "desc": {
      "en": "A stunning Demon Fire wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Demon Fire ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Demon Fire tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Demon Fire ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Demon Fire ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Demon Fire နောက်ခံပုံ။"
    }
  },
  {
    "slug": "oni-3",
    "title": "Red Ogre",
    "category": "oni",
    "color": "#5c7b52",
    "src": "/wallpapers/oni-3.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "oni",
      "red",
      "wallpaper",
      "highres"
    ],
    "downloads": 17221,
    "published": "2026-06-02",
    "desc": {
      "en": "A stunning Red Ogre wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Red Ogre ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Red Ogre tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Red Ogre ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Red Ogre ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Red Ogre နောက်ခံပုံ။"
    }
  },
  {
    "slug": "oni-4",
    "title": "Noh Mask",
    "category": "oni",
    "color": "#e07a1f",
    "src": "/wallpapers/oni-4.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "oni",
      "noh",
      "wallpaper",
      "highres"
    ],
    "downloads": 20990,
    "published": "2026-05-31",
    "desc": {
      "en": "A stunning Noh Mask wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Noh Mask ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Noh Mask tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Noh Mask ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Noh Mask ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Noh Mask နောက်ခံပုံ။"
    }
  },
  {
    "slug": "oni-5",
    "title": "Dark Folklore",
    "category": "oni",
    "color": "#1f9aa6",
    "src": "/wallpapers/oni-5.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "oni",
      "dark",
      "wallpaper",
      "highres"
    ],
    "downloads": 11058,
    "published": "2026-05-29",
    "desc": {
      "en": "A stunning Dark Folklore wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Dark Folklore ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Dark Folklore tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Dark Folklore ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Dark Folklore ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Dark Folklore နောက်ခံပုံ။"
    }
  },
  {
    "slug": "oni-6",
    "title": "Oni Guardian",
    "category": "oni",
    "color": "#33343a",
    "src": "/wallpapers/oni-6.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "oni",
      "oni",
      "wallpaper",
      "highres"
    ],
    "downloads": 19825,
    "published": "2026-05-27",
    "desc": {
      "en": "A stunning Oni Guardian wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Oni Guardian ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Oni Guardian tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Oni Guardian ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Oni Guardian ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Oni Guardian နောက်ခံပုံ။"
    }
  },
  {
    "slug": "oni-7",
    "title": "Crimson Horn",
    "category": "oni",
    "color": "#d86b8f",
    "src": "/wallpapers/oni-7.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "oni",
      "crimson",
      "wallpaper",
      "highres"
    ],
    "downloads": 10688,
    "published": "2026-05-25",
    "desc": {
      "en": "A stunning Crimson Horn wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Crimson Horn ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Crimson Horn tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Crimson Horn ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Crimson Horn ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Crimson Horn နောက်ခံပုံ။"
    }
  },
  {
    "slug": "oni-8",
    "title": "Shadow Demon",
    "category": "oni",
    "color": "#2d6bff",
    "src": "/wallpapers/oni-8.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "oni",
      "shadow",
      "wallpaper",
      "highres"
    ],
    "downloads": 5011,
    "published": "2026-05-23",
    "desc": {
      "en": "A stunning Shadow Demon wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Shadow Demon ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Shadow Demon tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Shadow Demon ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Shadow Demon ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Shadow Demon နောက်ခံပုံ။"
    }
  },
  {
    "slug": "oni-9",
    "title": "Temple Oni",
    "category": "oni",
    "color": "#bb8a44",
    "src": "/wallpapers/oni-9.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "oni",
      "temple",
      "wallpaper",
      "highres"
    ],
    "downloads": 21193,
    "published": "2026-05-21",
    "desc": {
      "en": "A stunning Temple Oni wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Temple Oni ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Temple Oni tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Temple Oni ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Temple Oni ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Temple Oni နောက်ခံပုံ။"
    }
  },
  {
    "slug": "oni-10",
    "title": "Kabuki Spirit",
    "category": "oni",
    "color": "#5fb03d",
    "src": "/wallpapers/oni-10.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "oni",
      "kabuki",
      "wallpaper",
      "highres"
    ],
    "downloads": 14964,
    "published": "2026-05-19",
    "desc": {
      "en": "A stunning Kabuki Spirit wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Kabuki Spirit ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Kabuki Spirit tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Kabuki Spirit ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Kabuki Spirit ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Kabuki Spirit နောက်ခံပုံ။"
    }
  },
  {
    "slug": "wolf-1",
    "title": "Alpha Howl",
    "category": "wolf",
    "color": "#bb8a44",
    "src": "/wallpapers/wolf-1.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "wolf",
      "alpha",
      "wallpaper",
      "highres"
    ],
    "downloads": 5322,
    "published": "2026-06-03",
    "desc": {
      "en": "A stunning Alpha Howl wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Alpha Howl ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Alpha Howl tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Alpha Howl ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Alpha Howl ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Alpha Howl နောက်ခံပုံ။"
    }
  },
  {
    "slug": "wolf-2",
    "title": "Forest Hunter",
    "category": "wolf",
    "color": "#5fb03d",
    "src": "/wallpapers/wolf-2.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "wolf",
      "forest",
      "wallpaper",
      "highres"
    ],
    "downloads": 12639,
    "published": "2026-06-01",
    "desc": {
      "en": "A stunning Forest Hunter wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Forest Hunter ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Forest Hunter tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Forest Hunter ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Forest Hunter ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Forest Hunter နောက်ခံပုံ။"
    }
  },
  {
    "slug": "wolf-3",
    "title": "Midnight Pack",
    "category": "wolf",
    "color": "#1b6ca8",
    "src": "/wallpapers/wolf-3.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "wolf",
      "midnight",
      "wallpaper",
      "highres"
    ],
    "downloads": 23011,
    "published": "2026-05-30",
    "desc": {
      "en": "A stunning Midnight Pack wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Midnight Pack ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Midnight Pack tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Midnight Pack ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Midnight Pack ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Midnight Pack နောက်ခံပုံ။"
    }
  },
  {
    "slug": "wolf-4",
    "title": "Snow Wolf",
    "category": "wolf",
    "color": "#c8443f",
    "src": "/wallpapers/wolf-4.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "wolf",
      "snow",
      "wallpaper",
      "highres"
    ],
    "downloads": 29097,
    "published": "2026-05-28",
    "desc": {
      "en": "A stunning Snow Wolf wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Snow Wolf ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Snow Wolf tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Snow Wolf ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Snow Wolf ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Snow Wolf နောက်ခံပုံ။"
    }
  },
  {
    "slug": "wolf-5",
    "title": "Shadow Alpha",
    "category": "wolf",
    "color": "#7b4bd6",
    "src": "/wallpapers/wolf-5.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "wolf",
      "shadow",
      "wallpaper",
      "highres"
    ],
    "downloads": 9599,
    "published": "2026-05-26",
    "desc": {
      "en": "A stunning Shadow Alpha wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Shadow Alpha ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Shadow Alpha tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Shadow Alpha ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Shadow Alpha ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Shadow Alpha နောက်ခံပုံ။"
    }
  },
  {
    "slug": "wolf-6",
    "title": "Luna Wolf",
    "category": "wolf",
    "color": "#5c7b52",
    "src": "/wallpapers/wolf-6.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "wolf",
      "luna",
      "wallpaper",
      "highres"
    ],
    "downloads": 9395,
    "published": "2026-05-24",
    "desc": {
      "en": "A stunning Luna Wolf wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Luna Wolf ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Luna Wolf tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Luna Wolf ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Luna Wolf ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Luna Wolf နောက်ခံပုံ။"
    }
  },
  {
    "slug": "wolf-7",
    "title": "Spirit Predator",
    "category": "wolf",
    "color": "#e07a1f",
    "src": "/wallpapers/wolf-7.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "wolf",
      "spirit",
      "wallpaper",
      "highres"
    ],
    "downloads": 22313,
    "published": "2026-05-22",
    "desc": {
      "en": "A stunning Spirit Predator wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Spirit Predator ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Spirit Predator tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Spirit Predator ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Spirit Predator ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Spirit Predator နောက်ခံပုံ။"
    }
  },
  {
    "slug": "wolf-8",
    "title": "Neon Wolf",
    "category": "wolf",
    "color": "#1f9aa6",
    "src": "/wallpapers/wolf-8.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "wolf",
      "neon",
      "wallpaper",
      "highres"
    ],
    "downloads": 9396,
    "published": "2026-05-20",
    "desc": {
      "en": "A stunning Neon Wolf wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Neon Wolf ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Neon Wolf tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Neon Wolf ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Neon Wolf ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Neon Wolf နောက်ခံပုံ။"
    }
  },
  {
    "slug": "wolf-9",
    "title": "Tundra Guardian",
    "category": "wolf",
    "color": "#33343a",
    "src": "/wallpapers/wolf-9.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "wolf",
      "tundra",
      "wallpaper",
      "highres"
    ],
    "downloads": 15996,
    "published": "2026-05-18",
    "desc": {
      "en": "A stunning Tundra Guardian wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Tundra Guardian ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Tundra Guardian tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Tundra Guardian ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Tundra Guardian ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Tundra Guardian နောက်ခံပုံ။"
    }
  },
  {
    "slug": "wolf-10",
    "title": "Fire Alpha",
    "category": "wolf",
    "color": "#d86b8f",
    "src": "/wallpapers/wolf-10.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "wolf",
      "fire",
      "wallpaper",
      "highres"
    ],
    "downloads": 19692,
    "published": "2026-05-16",
    "desc": {
      "en": "A stunning Fire Alpha wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Fire Alpha ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Fire Alpha tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Fire Alpha ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Fire Alpha ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Fire Alpha နောက်ခံပုံ။"
    }
  },
  {
    "slug": "car-1",
    "title": "Retro Cruiser",
    "category": "car",
    "color": "#1b6ca8",
    "src": "/wallpapers/car-1.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "car",
      "retro",
      "wallpaper",
      "highres"
    ],
    "downloads": 18497,
    "published": "2026-06-03",
    "desc": {
      "en": "A stunning Retro Cruiser wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Retro Cruiser ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Retro Cruiser tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Retro Cruiser ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Retro Cruiser ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Retro Cruiser နောက်ခံပုံ။"
    }
  },
  {
    "slug": "car-2",
    "title": "Tokyo Drift",
    "category": "car",
    "color": "#c8443f",
    "src": "/wallpapers/car-2.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "car",
      "tokyo",
      "wallpaper",
      "highres"
    ],
    "downloads": 16196,
    "published": "2026-06-01",
    "desc": {
      "en": "A stunning Tokyo Drift wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Tokyo Drift ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Tokyo Drift tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Tokyo Drift ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Tokyo Drift ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Tokyo Drift နောက်ခံပုံ။"
    }
  },
  {
    "slug": "car-3",
    "title": "Classic Muscle",
    "category": "car",
    "color": "#7b4bd6",
    "src": "/wallpapers/car-3.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "car",
      "classic",
      "wallpaper",
      "highres"
    ],
    "downloads": 6033,
    "published": "2026-05-30",
    "desc": {
      "en": "A stunning Classic Muscle wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Classic Muscle ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Classic Muscle tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Classic Muscle ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Classic Muscle ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Classic Muscle နောက်ခံပုံ။"
    }
  },
  {
    "slug": "car-4",
    "title": "Highway Cruiser",
    "category": "car",
    "color": "#5c7b52",
    "src": "/wallpapers/car-4.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "car",
      "highway",
      "wallpaper",
      "highres"
    ],
    "downloads": 11861,
    "published": "2026-05-28",
    "desc": {
      "en": "A stunning Highway Cruiser wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Highway Cruiser ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Highway Cruiser tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Highway Cruiser ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Highway Cruiser ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Highway Cruiser နောက်ခံပုံ။"
    }
  },
  {
    "slug": "car-5",
    "title": "City Night Drive",
    "category": "car",
    "color": "#e07a1f",
    "src": "/wallpapers/car-5.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "car",
      "city",
      "wallpaper",
      "highres"
    ],
    "downloads": 24316,
    "published": "2026-05-26",
    "desc": {
      "en": "A stunning City Night Drive wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ City Night Drive ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền City Night Drive tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ City Night Drive ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ City Night Drive ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် City Night Drive နောက်ခံပုံ။"
    }
  },
  {
    "slug": "car-6",
    "title": "Vintage Garage",
    "category": "car",
    "color": "#1f9aa6",
    "src": "/wallpapers/car-6.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "car",
      "vintage",
      "wallpaper",
      "highres"
    ],
    "downloads": 11761,
    "published": "2026-05-24",
    "desc": {
      "en": "A stunning Vintage Garage wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Vintage Garage ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Vintage Garage tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Vintage Garage ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Vintage Garage ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Vintage Garage နောက်ခံပုံ။"
    }
  },
  {
    "slug": "car-7",
    "title": "Desert Rally",
    "category": "car",
    "color": "#33343a",
    "src": "/wallpapers/car-7.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "car",
      "desert",
      "wallpaper",
      "highres"
    ],
    "downloads": 14859,
    "published": "2026-05-22",
    "desc": {
      "en": "A stunning Desert Rally wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Desert Rally ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Desert Rally tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Desert Rally ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Desert Rally ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Desert Rally နောက်ခံပုံ။"
    }
  },
  {
    "slug": "car-8",
    "title": "Neon Roadster",
    "category": "car",
    "color": "#d86b8f",
    "src": "/wallpapers/car-8.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "car",
      "neon",
      "wallpaper",
      "highres"
    ],
    "downloads": 26088,
    "published": "2026-05-20",
    "desc": {
      "en": "A stunning Neon Roadster wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Neon Roadster ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Neon Roadster tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Neon Roadster ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Neon Roadster ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Neon Roadster နောက်ခံပုံ။"
    }
  },
  {
    "slug": "car-9",
    "title": "Custom Tuner",
    "category": "car",
    "color": "#2d6bff",
    "src": "/wallpapers/car-9.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "car",
      "custom",
      "wallpaper",
      "highres"
    ],
    "downloads": 22778,
    "published": "2026-05-18",
    "desc": {
      "en": "A stunning Custom Tuner wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Custom Tuner ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Custom Tuner tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Custom Tuner ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Custom Tuner ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Custom Tuner နောက်ခံပုံ။"
    }
  },
  {
    "slug": "car-10",
    "title": "Urban Hatch",
    "category": "car",
    "color": "#bb8a44",
    "src": "/wallpapers/car-10.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "car",
      "urban",
      "wallpaper",
      "highres"
    ],
    "downloads": 25440,
    "published": "2026-05-16",
    "desc": {
      "en": "A stunning Urban Hatch wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Urban Hatch ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Urban Hatch tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Urban Hatch ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Urban Hatch ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Urban Hatch နောက်ခံပုံ။"
    }
  },
  {
    "slug": "nature-1",
    "title": "Misty Forest",
    "category": "nature",
    "color": "#1b6ca8",
    "src": "/wallpapers/nature-1.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "nature",
      "misty",
      "wallpaper",
      "highres"
    ],
    "downloads": 28445,
    "published": "2026-06-07",
    "desc": {
      "en": "A stunning Misty Forest wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Misty Forest ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Misty Forest tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Misty Forest ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Misty Forest ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Misty Forest နောက်ခံပုံ။"
    }
  },
  {
    "slug": "nature-2",
    "title": "Alpine Lake",
    "category": "nature",
    "color": "#c8443f",
    "src": "/wallpapers/nature-2.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "nature",
      "alpine",
      "wallpaper",
      "highres"
    ],
    "downloads": 17461,
    "published": "2026-06-05",
    "desc": {
      "en": "A stunning Alpine Lake wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Alpine Lake ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Alpine Lake tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Alpine Lake ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Alpine Lake ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Alpine Lake နောက်ခံပုံ။"
    }
  },
  {
    "slug": "nature-3",
    "title": "Desert Oasis",
    "category": "nature",
    "color": "#7b4bd6",
    "src": "/wallpapers/nature-3.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "nature",
      "desert",
      "wallpaper",
      "highres"
    ],
    "downloads": 7281,
    "published": "2026-06-03",
    "desc": {
      "en": "A stunning Desert Oasis wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Desert Oasis ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Desert Oasis tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Desert Oasis ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Desert Oasis ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Desert Oasis နောက်ခံပုံ။"
    }
  },
  {
    "slug": "nature-4",
    "title": "Waterfall Escape",
    "category": "nature",
    "color": "#5c7b52",
    "src": "/wallpapers/nature-4.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "nature",
      "waterfall",
      "wallpaper",
      "highres"
    ],
    "downloads": 19335,
    "published": "2026-06-01",
    "desc": {
      "en": "A stunning Waterfall Escape wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Waterfall Escape ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Waterfall Escape tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Waterfall Escape ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Waterfall Escape ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Waterfall Escape နောက်ခံပုံ။"
    }
  },
  {
    "slug": "nature-5",
    "title": "Ocean Wave",
    "category": "nature",
    "color": "#e07a1f",
    "src": "/wallpapers/nature-5.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "nature",
      "ocean",
      "wallpaper",
      "highres"
    ],
    "downloads": 25125,
    "published": "2026-05-30",
    "desc": {
      "en": "A stunning Ocean Wave wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Ocean Wave ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Ocean Wave tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Ocean Wave ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Ocean Wave ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Ocean Wave နောက်ခံပုံ။"
    }
  },
  {
    "slug": "nature-6",
    "title": "Autumn Valley",
    "category": "nature",
    "color": "#1f9aa6",
    "src": "/wallpapers/nature-6.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "nature",
      "autumn",
      "wallpaper",
      "highres"
    ],
    "downloads": 6030,
    "published": "2026-05-28",
    "desc": {
      "en": "A stunning Autumn Valley wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Autumn Valley ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Autumn Valley tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Autumn Valley ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Autumn Valley ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Autumn Valley နောက်ခံပုံ။"
    }
  },
  {
    "slug": "nature-7",
    "title": "Bamboo Grove",
    "category": "nature",
    "color": "#33343a",
    "src": "/wallpapers/nature-7.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "nature",
      "bamboo",
      "wallpaper",
      "highres"
    ],
    "downloads": 6467,
    "published": "2026-05-26",
    "desc": {
      "en": "A stunning Bamboo Grove wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Bamboo Grove ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Bamboo Grove tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Bamboo Grove ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Bamboo Grove ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Bamboo Grove နောက်ခံပုံ။"
    }
  },
  {
    "slug": "nature-8",
    "title": "Canyon Sunset",
    "category": "nature",
    "color": "#d86b8f",
    "src": "/wallpapers/nature-8.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "nature",
      "canyon",
      "wallpaper",
      "highres"
    ],
    "downloads": 18845,
    "published": "2026-05-24",
    "desc": {
      "en": "A stunning Canyon Sunset wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Canyon Sunset ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Canyon Sunset tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Canyon Sunset ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Canyon Sunset ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Canyon Sunset နောက်ခံပုံ။"
    }
  },
  {
    "slug": "nature-9",
    "title": "Meadow Flower",
    "category": "nature",
    "color": "#2d6bff",
    "src": "/wallpapers/nature-9.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "nature",
      "meadow",
      "wallpaper",
      "highres"
    ],
    "downloads": 27428,
    "published": "2026-05-22",
    "desc": {
      "en": "A stunning Meadow Flower wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Meadow Flower ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Meadow Flower tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Meadow Flower ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Meadow Flower ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Meadow Flower နောက်ခံပုံ။"
    }
  },
  {
    "slug": "nature-10",
    "title": "River Stream",
    "category": "nature",
    "color": "#bb8a44",
    "src": "/wallpapers/nature-10.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "nature",
      "river",
      "wallpaper",
      "highres"
    ],
    "downloads": 20537,
    "published": "2026-05-20",
    "desc": {
      "en": "A stunning River Stream wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ River Stream ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền River Stream tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ River Stream ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ River Stream ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် River Stream နောက်ခံပုံ။"
    }
  },
  {
    "slug": "space-1",
    "title": "Nebula Heart",
    "category": "space",
    "color": "#1f9aa6",
    "src": "/wallpapers/space-1.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "space",
      "nebula",
      "wallpaper",
      "highres"
    ],
    "downloads": 29938,
    "published": "2026-06-07",
    "desc": {
      "en": "A stunning Nebula Heart wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Nebula Heart ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Nebula Heart tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Nebula Heart ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Nebula Heart ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Nebula Heart နောက်ခံပုံ။"
    }
  },
  {
    "slug": "space-2",
    "title": "Cosmic Gateway",
    "category": "space",
    "color": "#33343a",
    "src": "/wallpapers/space-2.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "space",
      "cosmic",
      "wallpaper",
      "highres"
    ],
    "downloads": 18516,
    "published": "2026-06-05",
    "desc": {
      "en": "A stunning Cosmic Gateway wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Cosmic Gateway ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Cosmic Gateway tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Cosmic Gateway ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Cosmic Gateway ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Cosmic Gateway နောက်ခံပုံ။"
    }
  },
  {
    "slug": "space-3",
    "title": "Stardust River",
    "category": "space",
    "color": "#d86b8f",
    "src": "/wallpapers/space-3.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "space",
      "stardust",
      "wallpaper",
      "highres"
    ],
    "downloads": 24931,
    "published": "2026-06-03",
    "desc": {
      "en": "A stunning Stardust River wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Stardust River ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Stardust River tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Stardust River ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Stardust River ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Stardust River နောက်ခံပုံ။"
    }
  },
  {
    "slug": "space-4",
    "title": "Andromeda Spiral",
    "category": "space",
    "color": "#2d6bff",
    "src": "/wallpapers/space-4.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "space",
      "andromeda",
      "wallpaper",
      "highres"
    ],
    "downloads": 10636,
    "published": "2026-06-01",
    "desc": {
      "en": "A stunning Andromeda Spiral wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Andromeda Spiral ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Andromeda Spiral tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Andromeda Spiral ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Andromeda Spiral ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Andromeda Spiral နောက်ခံပုံ။"
    }
  },
  {
    "slug": "space-5",
    "title": "Stellar Nursery",
    "category": "space",
    "color": "#bb8a44",
    "src": "/wallpapers/space-5.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "space",
      "stellar",
      "wallpaper",
      "highres"
    ],
    "downloads": 18725,
    "published": "2026-05-30",
    "desc": {
      "en": "A stunning Stellar Nursery wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Stellar Nursery ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Stellar Nursery tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Stellar Nursery ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Stellar Nursery ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Stellar Nursery နောက်ခံပုံ။"
    }
  },
  {
    "slug": "space-6",
    "title": "Cosmic Sea",
    "category": "space",
    "color": "#5fb03d",
    "src": "/wallpapers/space-6.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "space",
      "cosmic",
      "wallpaper",
      "highres"
    ],
    "downloads": 22493,
    "published": "2026-05-28",
    "desc": {
      "en": "A stunning Cosmic Sea wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Cosmic Sea ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Cosmic Sea tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Cosmic Sea ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Cosmic Sea ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Cosmic Sea နောက်ခံပုံ။"
    }
  },
  {
    "slug": "space-7",
    "title": "Solar Flare",
    "category": "space",
    "color": "#1b6ca8",
    "src": "/wallpapers/space-7.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "space",
      "solar",
      "wallpaper",
      "highres"
    ],
    "downloads": 10887,
    "published": "2026-05-26",
    "desc": {
      "en": "A stunning Solar Flare wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Solar Flare ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Solar Flare tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Solar Flare ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Solar Flare ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Solar Flare နောက်ခံပုံ။"
    }
  },
  {
    "slug": "space-8",
    "title": "Violet Haze",
    "category": "space",
    "color": "#c8443f",
    "src": "/wallpapers/space-8.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "space",
      "violet",
      "wallpaper",
      "highres"
    ],
    "downloads": 10930,
    "published": "2026-05-24",
    "desc": {
      "en": "A stunning Violet Haze wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Violet Haze ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Violet Haze tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Violet Haze ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Violet Haze ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Violet Haze နောက်ခံပုံ။"
    }
  },
  {
    "slug": "space-9",
    "title": "Aurora Drift",
    "category": "space",
    "color": "#7b4bd6",
    "src": "/wallpapers/space-9.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "space",
      "aurora",
      "wallpaper",
      "highres"
    ],
    "downloads": 10858,
    "published": "2026-05-22",
    "desc": {
      "en": "A stunning Aurora Drift wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Aurora Drift ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Aurora Drift tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Aurora Drift ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Aurora Drift ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Aurora Drift နောက်ခံပုံ။"
    }
  },
  {
    "slug": "space-10",
    "title": "Orion Nebula",
    "category": "space",
    "color": "#5c7b52",
    "src": "/wallpapers/space-10.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "space",
      "orion",
      "wallpaper",
      "highres"
    ],
    "downloads": 5095,
    "published": "2026-05-20",
    "desc": {
      "en": "A stunning Orion Nebula wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Orion Nebula ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Orion Nebula tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Orion Nebula ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Orion Nebula ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Orion Nebula နောက်ခံပုံ။"
    }
  },
  {
    "slug": "gaming-1",
    "title": "RGB Setup",
    "category": "gaming",
    "color": "#e07a1f",
    "src": "/wallpapers/gaming-1.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "gaming",
      "rgb",
      "wallpaper",
      "highres"
    ],
    "downloads": 19476,
    "published": "2026-06-04",
    "desc": {
      "en": "A stunning RGB Setup wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ RGB Setup ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền RGB Setup tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ RGB Setup ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ RGB Setup ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် RGB Setup နောက်ခံပုံ။"
    }
  },
  {
    "slug": "gaming-2",
    "title": "Virtual Arena",
    "category": "gaming",
    "color": "#1f9aa6",
    "src": "/wallpapers/gaming-2.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "gaming",
      "virtual",
      "wallpaper",
      "highres"
    ],
    "downloads": 9188,
    "published": "2026-06-02",
    "desc": {
      "en": "A stunning Virtual Arena wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Virtual Arena ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Virtual Arena tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Virtual Arena ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Virtual Arena ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Virtual Arena နောက်ခံပုံ။"
    }
  },
  {
    "slug": "gaming-3",
    "title": "Neon Controller",
    "category": "gaming",
    "color": "#33343a",
    "src": "/wallpapers/gaming-3.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "gaming",
      "neon",
      "wallpaper",
      "highres"
    ],
    "downloads": 8813,
    "published": "2026-05-31",
    "desc": {
      "en": "A stunning Neon Controller wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Neon Controller ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Neon Controller tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Neon Controller ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Neon Controller ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Neon Controller နောက်ခံပုံ။"
    }
  },
  {
    "slug": "gaming-4",
    "title": "Console Station",
    "category": "gaming",
    "color": "#d86b8f",
    "src": "/wallpapers/gaming-4.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "gaming",
      "console",
      "wallpaper",
      "highres"
    ],
    "downloads": 6727,
    "published": "2026-05-29",
    "desc": {
      "en": "A stunning Console Station wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Console Station ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Console Station tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Console Station ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Console Station ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Console Station နောက်ခံပုံ။"
    }
  },
  {
    "slug": "gaming-5",
    "title": "Cyber Arcade",
    "category": "gaming",
    "color": "#2d6bff",
    "src": "/wallpapers/gaming-5.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "gaming",
      "cyber",
      "wallpaper",
      "highres"
    ],
    "downloads": 15484,
    "published": "2026-05-27",
    "desc": {
      "en": "A stunning Cyber Arcade wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Cyber Arcade ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Cyber Arcade tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Cyber Arcade ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Cyber Arcade ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Cyber Arcade နောက်ခံပုံ။"
    }
  },
  {
    "slug": "gaming-6",
    "title": "Pixel Castle",
    "category": "gaming",
    "color": "#bb8a44",
    "src": "/wallpapers/gaming-6.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "gaming",
      "pixel",
      "wallpaper",
      "highres"
    ],
    "downloads": 24634,
    "published": "2026-05-25",
    "desc": {
      "en": "A stunning Pixel Castle wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Pixel Castle ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Pixel Castle tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Pixel Castle ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Pixel Castle ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Pixel Castle နောက်ခံပုံ။"
    }
  },
  {
    "slug": "gaming-7",
    "title": "Synth Grid",
    "category": "gaming",
    "color": "#5fb03d",
    "src": "/wallpapers/gaming-7.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "gaming",
      "synth",
      "wallpaper",
      "highres"
    ],
    "downloads": 14650,
    "published": "2026-05-23",
    "desc": {
      "en": "A stunning Synth Grid wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Synth Grid ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Synth Grid tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Synth Grid ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Synth Grid ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Synth Grid နောက်ခံပုံ။"
    }
  },
  {
    "slug": "gaming-8",
    "title": "E-sports Arena",
    "category": "gaming",
    "color": "#1b6ca8",
    "src": "/wallpapers/gaming-8.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "gaming",
      "e-sports",
      "wallpaper",
      "highres"
    ],
    "downloads": 7555,
    "published": "2026-05-21",
    "desc": {
      "en": "A stunning E-sports Arena wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ E-sports Arena ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền E-sports Arena tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ E-sports Arena ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ E-sports Arena ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် E-sports Arena နောက်ခံပုံ။"
    }
  },
  {
    "slug": "gaming-9",
    "title": "Game Over",
    "category": "gaming",
    "color": "#c8443f",
    "src": "/wallpapers/gaming-9.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "gaming",
      "game",
      "wallpaper",
      "highres"
    ],
    "downloads": 24640,
    "published": "2026-05-19",
    "desc": {
      "en": "A stunning Game Over wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Game Over ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Game Over tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Game Over ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Game Over ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Game Over နောက်ခံပုံ။"
    }
  },
  {
    "slug": "gaming-10",
    "title": "Retro Console",
    "category": "gaming",
    "color": "#7b4bd6",
    "src": "/wallpapers/gaming-10.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "gaming",
      "retro",
      "wallpaper",
      "highres"
    ],
    "downloads": 14164,
    "published": "2026-05-17",
    "desc": {
      "en": "A stunning Retro Console wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Retro Console ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Retro Console tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Retro Console ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Retro Console ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Retro Console နောက်ခံပုံ။"
    }
  },
  {
    "slug": "cute-1",
    "title": "Chibi Cat",
    "category": "cute",
    "color": "#1b6ca8",
    "src": "/wallpapers/cute-1.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "cute",
      "chibi",
      "wallpaper",
      "highres"
    ],
    "downloads": 15187,
    "published": "2026-06-03",
    "desc": {
      "en": "A stunning Chibi Cat wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Chibi Cat ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Chibi Cat tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Chibi Cat ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Chibi Cat ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Chibi Cat နောက်ခံပုံ။"
    }
  },
  {
    "slug": "cute-2",
    "title": "Pastel Dino",
    "category": "cute",
    "color": "#c8443f",
    "src": "/wallpapers/cute-2.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "cute",
      "pastel",
      "wallpaper",
      "highres"
    ],
    "downloads": 8688,
    "published": "2026-06-01",
    "desc": {
      "en": "A stunning Pastel Dino wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Pastel Dino ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Pastel Dino tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Pastel Dino ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Pastel Dino ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Pastel Dino နောက်ခံပုံ။"
    }
  },
  {
    "slug": "cute-3",
    "title": "Clay Shiba",
    "category": "cute",
    "color": "#7b4bd6",
    "src": "/wallpapers/cute-3.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "cute",
      "clay",
      "wallpaper",
      "highres"
    ],
    "downloads": 17500,
    "published": "2026-05-30",
    "desc": {
      "en": "A stunning Clay Shiba wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Clay Shiba ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Clay Shiba tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Clay Shiba ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Clay Shiba ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Clay Shiba နောက်ခံပုံ။"
    }
  },
  {
    "slug": "cute-4",
    "title": "Marshmallow Bunny",
    "category": "cute",
    "color": "#5c7b52",
    "src": "/wallpapers/cute-4.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "cute",
      "marshmallow",
      "wallpaper",
      "highres"
    ],
    "downloads": 27655,
    "published": "2026-05-28",
    "desc": {
      "en": "A stunning Marshmallow Bunny wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Marshmallow Bunny ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Marshmallow Bunny tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Marshmallow Bunny ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Marshmallow Bunny ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Marshmallow Bunny နောက်ခံပုံ။"
    }
  },
  {
    "slug": "cute-5",
    "title": "Bubble Bear",
    "category": "cute",
    "color": "#e07a1f",
    "src": "/wallpapers/cute-5.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "cute",
      "bubble",
      "wallpaper",
      "highres"
    ],
    "downloads": 8403,
    "published": "2026-05-26",
    "desc": {
      "en": "A stunning Bubble Bear wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Bubble Bear ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Bubble Bear tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Bubble Bear ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Bubble Bear ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Bubble Bear နောက်ခံပုံ။"
    }
  },
  {
    "slug": "cute-6",
    "title": "Dreamy Unicorn",
    "category": "cute",
    "color": "#1f9aa6",
    "src": "/wallpapers/cute-6.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "cute",
      "dreamy",
      "wallpaper",
      "highres"
    ],
    "downloads": 11404,
    "published": "2026-05-24",
    "desc": {
      "en": "A stunning Dreamy Unicorn wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Dreamy Unicorn ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Dreamy Unicorn tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Dreamy Unicorn ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Dreamy Unicorn ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Dreamy Unicorn နောက်ခံပုံ။"
    }
  },
  {
    "slug": "cute-7",
    "title": "Happy Panda",
    "category": "cute",
    "color": "#33343a",
    "src": "/wallpapers/cute-7.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "cute",
      "happy",
      "wallpaper",
      "highres"
    ],
    "downloads": 16096,
    "published": "2026-05-22",
    "desc": {
      "en": "A stunning Happy Panda wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Happy Panda ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Happy Panda tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Happy Panda ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Happy Panda ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Happy Panda နောက်ခံပုံ။"
    }
  },
  {
    "slug": "cute-8",
    "title": "Sweet Hamster",
    "category": "cute",
    "color": "#d86b8f",
    "src": "/wallpapers/cute-8.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "cute",
      "sweet",
      "wallpaper",
      "highres"
    ],
    "downloads": 7969,
    "published": "2026-05-20",
    "desc": {
      "en": "A stunning Sweet Hamster wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Sweet Hamster ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Sweet Hamster tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Sweet Hamster ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Sweet Hamster ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Sweet Hamster နောက်ခံပုံ။"
    }
  },
  {
    "slug": "cute-9",
    "title": "Pastel Koala",
    "category": "cute",
    "color": "#2d6bff",
    "src": "/wallpapers/cute-9.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "cute",
      "pastel",
      "wallpaper",
      "highres"
    ],
    "downloads": 5727,
    "published": "2026-05-18",
    "desc": {
      "en": "A stunning Pastel Koala wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Pastel Koala ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Pastel Koala tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Pastel Koala ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Pastel Koala ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Pastel Koala နောက်ခံပုံ။"
    }
  },
  {
    "slug": "cute-10",
    "title": "Kawaii Fox",
    "category": "cute",
    "color": "#bb8a44",
    "src": "/wallpapers/cute-10.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "cute",
      "kawaii",
      "wallpaper",
      "highres"
    ],
    "downloads": 17173,
    "published": "2026-05-16",
    "desc": {
      "en": "A stunning Kawaii Fox wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Kawaii Fox ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Kawaii Fox tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Kawaii Fox ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Kawaii Fox ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Kawaii Fox နောက်ခံပုံ။"
    }
  },
  {
    "slug": "dark-1",
    "title": "Gothic Cathedral",
    "category": "dark",
    "color": "#c8443f",
    "src": "/wallpapers/dark-1.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "dark",
      "gothic",
      "wallpaper",
      "highres"
    ],
    "downloads": 18533,
    "published": "2026-06-07",
    "desc": {
      "en": "A stunning Gothic Cathedral wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Gothic Cathedral ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Gothic Cathedral tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Gothic Cathedral ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Gothic Cathedral ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Gothic Cathedral နောက်ခံပုံ။"
    }
  },
  {
    "slug": "dark-2",
    "title": "Shadow Spire",
    "category": "dark",
    "color": "#7b4bd6",
    "src": "/wallpapers/dark-2.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "dark",
      "shadow",
      "wallpaper",
      "highres"
    ],
    "downloads": 29492,
    "published": "2026-06-05",
    "desc": {
      "en": "A stunning Shadow Spire wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Shadow Spire ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Shadow Spire tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Shadow Spire ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Shadow Spire ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Shadow Spire နောက်ခံပုံ။"
    }
  },
  {
    "slug": "dark-3",
    "title": "Mystic Moon",
    "category": "dark",
    "color": "#5c7b52",
    "src": "/wallpapers/dark-3.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "dark",
      "mystic",
      "wallpaper",
      "highres"
    ],
    "downloads": 6485,
    "published": "2026-06-03",
    "desc": {
      "en": "A stunning Mystic Moon wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Mystic Moon ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Mystic Moon tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Mystic Moon ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Mystic Moon ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Mystic Moon နောက်ခံပုံ။"
    }
  },
  {
    "slug": "dark-4",
    "title": "Dark Forest",
    "category": "dark",
    "color": "#e07a1f",
    "src": "/wallpapers/dark-4.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "dark",
      "dark",
      "wallpaper",
      "highres"
    ],
    "downloads": 10511,
    "published": "2026-06-01",
    "desc": {
      "en": "A stunning Dark Forest wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Dark Forest ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Dark Forest tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Dark Forest ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Dark Forest ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Dark Forest နောက်ခံပုံ။"
    }
  },
  {
    "slug": "dark-5",
    "title": "Grim Reaper",
    "category": "dark",
    "color": "#1f9aa6",
    "src": "/wallpapers/dark-5.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "dark",
      "grim",
      "wallpaper",
      "highres"
    ],
    "downloads": 14499,
    "published": "2026-05-30",
    "desc": {
      "en": "A stunning Grim Reaper wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Grim Reaper ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Grim Reaper tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Grim Reaper ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Grim Reaper ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Grim Reaper နောက်ခံပုံ။"
    }
  },
  {
    "slug": "dark-6",
    "title": "Skull Art",
    "category": "dark",
    "color": "#33343a",
    "src": "/wallpapers/dark-6.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "dark",
      "skull",
      "wallpaper",
      "highres"
    ],
    "downloads": 11682,
    "published": "2026-05-28",
    "desc": {
      "en": "A stunning Skull Art wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Skull Art ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Skull Art tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Skull Art ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Skull Art ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Skull Art နောက်ခံပုံ။"
    }
  },
  {
    "slug": "dark-7",
    "title": "Cemetery Mist",
    "category": "dark",
    "color": "#d86b8f",
    "src": "/wallpapers/dark-7.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "dark",
      "cemetery",
      "wallpaper",
      "highres"
    ],
    "downloads": 17235,
    "published": "2026-05-26",
    "desc": {
      "en": "A stunning Cemetery Mist wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Cemetery Mist ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Cemetery Mist tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Cemetery Mist ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Cemetery Mist ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Cemetery Mist နောက်ခံပုံ။"
    }
  },
  {
    "slug": "dark-8",
    "title": "Black Rose",
    "category": "dark",
    "color": "#2d6bff",
    "src": "/wallpapers/dark-8.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "dark",
      "black",
      "wallpaper",
      "highres"
    ],
    "downloads": 24738,
    "published": "2026-05-24",
    "desc": {
      "en": "A stunning Black Rose wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Black Rose ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Black Rose tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Black Rose ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Black Rose ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Black Rose နောက်ခံပုံ။"
    }
  },
  {
    "slug": "dark-9",
    "title": "Crow Perch",
    "category": "dark",
    "color": "#bb8a44",
    "src": "/wallpapers/dark-9.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "dark",
      "crow",
      "wallpaper",
      "highres"
    ],
    "downloads": 15948,
    "published": "2026-05-22",
    "desc": {
      "en": "A stunning Crow Perch wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Crow Perch ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Crow Perch tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Crow Perch ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Crow Perch ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Crow Perch နောက်ခံပုံ။"
    }
  },
  {
    "slug": "dark-10",
    "title": "Midnight Gate",
    "category": "dark",
    "color": "#5fb03d",
    "src": "/wallpapers/dark-10.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "dark",
      "midnight",
      "wallpaper",
      "highres"
    ],
    "downloads": 15369,
    "published": "2026-05-20",
    "desc": {
      "en": "A stunning Midnight Gate wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Midnight Gate ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Midnight Gate tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Midnight Gate ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Midnight Gate ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Midnight Gate နောက်ခံပုံ။"
    }
  },
  {
    "slug": "fantasy-1",
    "title": "Hidden Temple",
    "category": "fantasy",
    "color": "#5c7b52",
    "src": "/wallpapers/fantasy-1.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "fantasy",
      "hidden",
      "wallpaper",
      "highres"
    ],
    "downloads": 6845,
    "published": "2026-06-05",
    "desc": {
      "en": "A stunning Hidden Temple wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Hidden Temple ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Hidden Temple tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Hidden Temple ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Hidden Temple ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Hidden Temple နောက်ခံပုံ။"
    }
  },
  {
    "slug": "fantasy-2",
    "title": "Floating Islands",
    "category": "fantasy",
    "color": "#e07a1f",
    "src": "/wallpapers/fantasy-2.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "fantasy",
      "floating",
      "wallpaper",
      "highres"
    ],
    "downloads": 10521,
    "published": "2026-06-03",
    "desc": {
      "en": "A stunning Floating Islands wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Floating Islands ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Floating Islands tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Floating Islands ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Floating Islands ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Floating Islands နောက်ခံပုံ။"
    }
  },
  {
    "slug": "fantasy-3",
    "title": "Elven Forest",
    "category": "fantasy",
    "color": "#1f9aa6",
    "src": "/wallpapers/fantasy-3.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "fantasy",
      "elven",
      "wallpaper",
      "highres"
    ],
    "downloads": 25472,
    "published": "2026-06-01",
    "desc": {
      "en": "A stunning Elven Forest wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Elven Forest ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Elven Forest tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Elven Forest ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Elven Forest ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Elven Forest နောက်ခံပုံ။"
    }
  },
  {
    "slug": "fantasy-4",
    "title": "Crystal Cave",
    "category": "fantasy",
    "color": "#33343a",
    "src": "/wallpapers/fantasy-4.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "fantasy",
      "crystal",
      "wallpaper",
      "highres"
    ],
    "downloads": 27320,
    "published": "2026-05-30",
    "desc": {
      "en": "A stunning Crystal Cave wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Crystal Cave ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Crystal Cave tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Crystal Cave ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Crystal Cave ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Crystal Cave နောက်ခံပုံ။"
    }
  },
  {
    "slug": "fantasy-5",
    "title": "Wizard Tower",
    "category": "fantasy",
    "color": "#d86b8f",
    "src": "/wallpapers/fantasy-5.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "fantasy",
      "wizard",
      "wallpaper",
      "highres"
    ],
    "downloads": 27325,
    "published": "2026-05-28",
    "desc": {
      "en": "A stunning Wizard Tower wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Wizard Tower ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Wizard Tower tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Wizard Tower ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Wizard Tower ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Wizard Tower နောက်ခံပုံ။"
    }
  },
  {
    "slug": "fantasy-6",
    "title": "Sky Castle",
    "category": "fantasy",
    "color": "#2d6bff",
    "src": "/wallpapers/fantasy-6.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "fantasy",
      "sky",
      "wallpaper",
      "highres"
    ],
    "downloads": 14156,
    "published": "2026-05-26",
    "desc": {
      "en": "A stunning Sky Castle wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Sky Castle ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Sky Castle tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Sky Castle ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Sky Castle ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Sky Castle နောက်ခံပုံ။"
    }
  },
  {
    "slug": "fantasy-7",
    "title": "Enchanted River",
    "category": "fantasy",
    "color": "#bb8a44",
    "src": "/wallpapers/fantasy-7.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "fantasy",
      "enchanted",
      "wallpaper",
      "highres"
    ],
    "downloads": 12302,
    "published": "2026-05-24",
    "desc": {
      "en": "A stunning Enchanted River wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Enchanted River ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Enchanted River tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Enchanted River ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Enchanted River ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Enchanted River နောက်ခံပုံ။"
    }
  },
  {
    "slug": "fantasy-8",
    "title": "Pegasus Flight",
    "category": "fantasy",
    "color": "#5fb03d",
    "src": "/wallpapers/fantasy-8.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "fantasy",
      "pegasus",
      "wallpaper",
      "highres"
    ],
    "downloads": 18171,
    "published": "2026-05-22",
    "desc": {
      "en": "A stunning Pegasus Flight wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Pegasus Flight ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Pegasus Flight tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Pegasus Flight ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Pegasus Flight ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Pegasus Flight နောက်ခံပုံ။"
    }
  },
  {
    "slug": "fantasy-9",
    "title": "Sacred Grove",
    "category": "fantasy",
    "color": "#1b6ca8",
    "src": "/wallpapers/fantasy-9.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "fantasy",
      "sacred",
      "wallpaper",
      "highres"
    ],
    "downloads": 19116,
    "published": "2026-05-20",
    "desc": {
      "en": "A stunning Sacred Grove wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Sacred Grove ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Sacred Grove tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Sacred Grove ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Sacred Grove ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Sacred Grove နောက်ခံပုံ။"
    }
  },
  {
    "slug": "fantasy-10",
    "title": "Ancient Ruins",
    "category": "fantasy",
    "color": "#c8443f",
    "src": "/wallpapers/fantasy-10.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "fantasy",
      "ancient",
      "wallpaper",
      "highres"
    ],
    "downloads": 8733,
    "published": "2026-05-18",
    "desc": {
      "en": "A stunning Ancient Ruins wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Ancient Ruins ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Ancient Ruins tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Ancient Ruins ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Ancient Ruins ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Ancient Ruins နောက်ခံပုံ။"
    }
  },
  {
    "slug": "japanese-1",
    "title": "Shinto Torii",
    "category": "japanese",
    "color": "#d86b8f",
    "src": "/wallpapers/japanese-1.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "japanese",
      "shinto",
      "wallpaper",
      "highres"
    ],
    "downloads": 23722,
    "published": "2026-06-06",
    "desc": {
      "en": "A stunning Shinto Torii wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Shinto Torii ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Shinto Torii tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Shinto Torii ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Shinto Torii ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Shinto Torii နောက်ခံပုံ။"
    }
  },
  {
    "slug": "japanese-2",
    "title": "Kyoto Alley",
    "category": "japanese",
    "color": "#2d6bff",
    "src": "/wallpapers/japanese-2.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "japanese",
      "kyoto",
      "wallpaper",
      "highres"
    ],
    "downloads": 9466,
    "published": "2026-06-04",
    "desc": {
      "en": "A stunning Kyoto Alley wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Kyoto Alley ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Kyoto Alley tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Kyoto Alley ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Kyoto Alley ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Kyoto Alley နောက်ခံပုံ။"
    }
  },
  {
    "slug": "japanese-3",
    "title": "Cherry Blossom",
    "category": "japanese",
    "color": "#bb8a44",
    "src": "/wallpapers/japanese-3.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "japanese",
      "cherry",
      "wallpaper",
      "highres"
    ],
    "downloads": 28835,
    "published": "2026-06-02",
    "desc": {
      "en": "A stunning Cherry Blossom wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Cherry Blossom ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Cherry Blossom tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Cherry Blossom ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Cherry Blossom ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Cherry Blossom နောက်ခံပုံ။"
    }
  },
  {
    "slug": "japanese-4",
    "title": "Ukiyo-e Wave",
    "category": "japanese",
    "color": "#5fb03d",
    "src": "/wallpapers/japanese-4.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "japanese",
      "ukiyo-e",
      "wallpaper",
      "highres"
    ],
    "downloads": 15069,
    "published": "2026-05-31",
    "desc": {
      "en": "A stunning Ukiyo-e Wave wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Ukiyo-e Wave ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Ukiyo-e Wave tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Ukiyo-e Wave ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Ukiyo-e Wave ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Ukiyo-e Wave နောက်ခံပုံ။"
    }
  },
  {
    "slug": "japanese-5",
    "title": "Zen Garden",
    "category": "japanese",
    "color": "#1b6ca8",
    "src": "/wallpapers/japanese-5.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "japanese",
      "zen",
      "wallpaper",
      "highres"
    ],
    "downloads": 24620,
    "published": "2026-05-29",
    "desc": {
      "en": "A stunning Zen Garden wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Zen Garden ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Zen Garden tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Zen Garden ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Zen Garden ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Zen Garden နောက်ခံပုံ။"
    }
  },
  {
    "slug": "japanese-6",
    "title": "Pagoda Sunset",
    "category": "japanese",
    "color": "#c8443f",
    "src": "/wallpapers/japanese-6.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "japanese",
      "pagoda",
      "wallpaper",
      "highres"
    ],
    "downloads": 28037,
    "published": "2026-05-27",
    "desc": {
      "en": "A stunning Pagoda Sunset wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Pagoda Sunset ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Pagoda Sunset tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Pagoda Sunset ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Pagoda Sunset ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Pagoda Sunset နောက်ခံပုံ။"
    }
  },
  {
    "slug": "japanese-7",
    "title": "Bamboo Path",
    "category": "japanese",
    "color": "#7b4bd6",
    "src": "/wallpapers/japanese-7.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "japanese",
      "bamboo",
      "wallpaper",
      "highres"
    ],
    "downloads": 20444,
    "published": "2026-05-25",
    "desc": {
      "en": "A stunning Bamboo Path wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Bamboo Path ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Bamboo Path tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Bamboo Path ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Bamboo Path ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Bamboo Path နောက်ခံပုံ။"
    }
  },
  {
    "slug": "japanese-8",
    "title": "Red Bridge",
    "category": "japanese",
    "color": "#5c7b52",
    "src": "/wallpapers/japanese-8.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "japanese",
      "red",
      "wallpaper",
      "highres"
    ],
    "downloads": 16309,
    "published": "2026-05-23",
    "desc": {
      "en": "A stunning Red Bridge wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Red Bridge ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Red Bridge tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Red Bridge ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Red Bridge ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Red Bridge နောက်ခံပုံ။"
    }
  },
  {
    "slug": "japanese-9",
    "title": "Fuji View",
    "category": "japanese",
    "color": "#e07a1f",
    "src": "/wallpapers/japanese-9.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "japanese",
      "fuji",
      "wallpaper",
      "highres"
    ],
    "downloads": 26493,
    "published": "2026-05-21",
    "desc": {
      "en": "A stunning Fuji View wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Fuji View ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Fuji View tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Fuji View ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Fuji View ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Fuji View နောက်ခံပုံ။"
    }
  },
  {
    "slug": "japanese-10",
    "title": "Tea House",
    "category": "japanese",
    "color": "#1f9aa6",
    "src": "/wallpapers/japanese-10.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "japanese",
      "tea",
      "wallpaper",
      "highres"
    ],
    "downloads": 11593,
    "published": "2026-05-19",
    "desc": {
      "en": "A stunning Tea House wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Tea House ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Tea House tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Tea House ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Tea House ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Tea House နောက်ခံပုံ။"
    }
  },
  {
    "slug": "neon-1",
    "title": "Glowing Grid",
    "category": "neon",
    "color": "#1b6ca8",
    "src": "/wallpapers/neon-1.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "neon",
      "glowing",
      "wallpaper",
      "highres"
    ],
    "downloads": 29861,
    "published": "2026-06-07",
    "desc": {
      "en": "A stunning Glowing Grid wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Glowing Grid ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Glowing Grid tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Glowing Grid ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Glowing Grid ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Glowing Grid နောက်ခံပုံ။"
    }
  },
  {
    "slug": "neon-2",
    "title": "Electric Arc",
    "category": "neon",
    "color": "#c8443f",
    "src": "/wallpapers/neon-2.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "neon",
      "electric",
      "wallpaper",
      "highres"
    ],
    "downloads": 28577,
    "published": "2026-06-05",
    "desc": {
      "en": "A stunning Electric Arc wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Electric Arc ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Electric Arc tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Electric Arc ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Electric Arc ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Electric Arc နောက်ခံပုံ။"
    }
  },
  {
    "slug": "neon-3",
    "title": "Neon Sign",
    "category": "neon",
    "color": "#7b4bd6",
    "src": "/wallpapers/neon-3.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "neon",
      "neon",
      "wallpaper",
      "highres"
    ],
    "downloads": 12460,
    "published": "2026-06-03",
    "desc": {
      "en": "A stunning Neon Sign wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Neon Sign ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Neon Sign tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Neon Sign ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Neon Sign ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Neon Sign နောက်ခံပုံ။"
    }
  },
  {
    "slug": "neon-4",
    "title": "Cyber Grid",
    "category": "neon",
    "color": "#5c7b52",
    "src": "/wallpapers/neon-4.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "neon",
      "cyber",
      "wallpaper",
      "highres"
    ],
    "downloads": 18052,
    "published": "2026-06-01",
    "desc": {
      "en": "A stunning Cyber Grid wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Cyber Grid ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Cyber Grid tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Cyber Grid ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Cyber Grid ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Cyber Grid နောက်ခံပုံ။"
    }
  },
  {
    "slug": "neon-5",
    "title": "Laser Wave",
    "category": "neon",
    "color": "#e07a1f",
    "src": "/wallpapers/neon-5.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "neon",
      "laser",
      "wallpaper",
      "highres"
    ],
    "downloads": 22152,
    "published": "2026-05-30",
    "desc": {
      "en": "A stunning Laser Wave wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Laser Wave ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Laser Wave tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Laser Wave ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Laser Wave ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Laser Wave နောက်ခံပုံ။"
    }
  },
  {
    "slug": "neon-6",
    "title": "Light Tunnel",
    "category": "neon",
    "color": "#1f9aa6",
    "src": "/wallpapers/neon-6.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "neon",
      "light",
      "wallpaper",
      "highres"
    ],
    "downloads": 27184,
    "published": "2026-05-28",
    "desc": {
      "en": "A stunning Light Tunnel wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Light Tunnel ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Light Tunnel tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Light Tunnel ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Light Tunnel ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Light Tunnel နောက်ခံပုံ။"
    }
  },
  {
    "slug": "neon-7",
    "title": "Bioluminescent Flora",
    "category": "neon",
    "color": "#33343a",
    "src": "/wallpapers/neon-7.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "neon",
      "bioluminescent",
      "wallpaper",
      "highres"
    ],
    "downloads": 18121,
    "published": "2026-05-26",
    "desc": {
      "en": "A stunning Bioluminescent Flora wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Bioluminescent Flora ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Bioluminescent Flora tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Bioluminescent Flora ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Bioluminescent Flora ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Bioluminescent Flora နောက်ခံပုံ။"
    }
  },
  {
    "slug": "neon-8",
    "title": "Chroma Ring",
    "category": "neon",
    "color": "#d86b8f",
    "src": "/wallpapers/neon-8.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "neon",
      "chroma",
      "wallpaper",
      "highres"
    ],
    "downloads": 24652,
    "published": "2026-05-24",
    "desc": {
      "en": "A stunning Chroma Ring wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Chroma Ring ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Chroma Ring tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Chroma Ring ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Chroma Ring ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Chroma Ring နောက်ခံပုံ။"
    }
  },
  {
    "slug": "neon-9",
    "title": "Vibrant Line",
    "category": "neon",
    "color": "#2d6bff",
    "src": "/wallpapers/neon-9.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "neon",
      "vibrant",
      "wallpaper",
      "highres"
    ],
    "downloads": 12586,
    "published": "2026-05-22",
    "desc": {
      "en": "A stunning Vibrant Line wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Vibrant Line ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Vibrant Line tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Vibrant Line ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Vibrant Line ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Vibrant Line နောက်ခံပုံ။"
    }
  },
  {
    "slug": "neon-10",
    "title": "Pulse Wave",
    "category": "neon",
    "color": "#bb8a44",
    "src": "/wallpapers/neon-10.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "neon",
      "pulse",
      "wallpaper",
      "highres"
    ],
    "downloads": 5183,
    "published": "2026-05-20",
    "desc": {
      "en": "A stunning Pulse Wave wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Pulse Wave ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Pulse Wave tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Pulse Wave ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Pulse Wave ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Pulse Wave နောက်ခံပုံ။"
    }
  },
  {
    "slug": "supercar-1",
    "title": "Veloce Hypercar",
    "category": "supercar",
    "color": "#1f9aa6",
    "src": "/wallpapers/supercar-1.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "supercar",
      "veloce",
      "wallpaper",
      "highres"
    ],
    "downloads": 16575,
    "published": "2026-06-07",
    "desc": {
      "en": "A stunning Veloce Hypercar wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Veloce Hypercar ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Veloce Hypercar tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Veloce Hypercar ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Veloce Hypercar ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Veloce Hypercar နောက်ခံပုံ။"
    }
  },
  {
    "slug": "supercar-2",
    "title": "Carbon Monster",
    "category": "supercar",
    "color": "#33343a",
    "src": "/wallpapers/supercar-2.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "supercar",
      "carbon",
      "wallpaper",
      "highres"
    ],
    "downloads": 8414,
    "published": "2026-06-05",
    "desc": {
      "en": "A stunning Carbon Monster wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Carbon Monster ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Carbon Monster tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Carbon Monster ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Carbon Monster ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Carbon Monster နောက်ခံပုံ။"
    }
  },
  {
    "slug": "supercar-3",
    "title": "Aero Concept",
    "category": "supercar",
    "color": "#d86b8f",
    "src": "/wallpapers/supercar-3.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "supercar",
      "aero",
      "wallpaper",
      "highres"
    ],
    "downloads": 25739,
    "published": "2026-06-03",
    "desc": {
      "en": "A stunning Aero Concept wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Aero Concept ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Aero Concept tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Aero Concept ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Aero Concept ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Aero Concept နောက်ခံပုံ။"
    }
  },
  {
    "slug": "supercar-4",
    "title": "Track Beast",
    "category": "supercar",
    "color": "#2d6bff",
    "src": "/wallpapers/supercar-4.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "supercar",
      "track",
      "wallpaper",
      "highres"
    ],
    "downloads": 15844,
    "published": "2026-06-01",
    "desc": {
      "en": "A stunning Track Beast wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Track Beast ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Track Beast tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Track Beast ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Track Beast ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Track Beast နောက်ခံပုံ။"
    }
  },
  {
    "slug": "supercar-5",
    "title": "Futuristic Roadster",
    "category": "supercar",
    "color": "#bb8a44",
    "src": "/wallpapers/supercar-5.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "supercar",
      "futuristic",
      "wallpaper",
      "highres"
    ],
    "downloads": 5214,
    "published": "2026-05-30",
    "desc": {
      "en": "A stunning Futuristic Roadster wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Futuristic Roadster ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Futuristic Roadster tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Futuristic Roadster ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Futuristic Roadster ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Futuristic Roadster နောက်ခံပုံ။"
    }
  },
  {
    "slug": "supercar-6",
    "title": "Monaco Cruising",
    "category": "supercar",
    "color": "#5fb03d",
    "src": "/wallpapers/supercar-6.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "supercar",
      "monaco",
      "wallpaper",
      "highres"
    ],
    "downloads": 25490,
    "published": "2026-05-28",
    "desc": {
      "en": "A stunning Monaco Cruising wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Monaco Cruising ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Monaco Cruising tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Monaco Cruising ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Monaco Cruising ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Monaco Cruising နောက်ခံပုံ။"
    }
  },
  {
    "slug": "supercar-7",
    "title": "Apex Predator",
    "category": "supercar",
    "color": "#1b6ca8",
    "src": "/wallpapers/supercar-7.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "supercar",
      "apex",
      "wallpaper",
      "highres"
    ],
    "downloads": 11750,
    "published": "2026-05-26",
    "desc": {
      "en": "A stunning Apex Predator wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Apex Predator ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Apex Predator tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Apex Predator ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Apex Predator ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Apex Predator နောက်ခံပုံ။"
    }
  },
  {
    "slug": "supercar-8",
    "title": "Electric Hypercar",
    "category": "supercar",
    "color": "#c8443f",
    "src": "/wallpapers/supercar-8.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "supercar",
      "electric",
      "wallpaper",
      "highres"
    ],
    "downloads": 7314,
    "published": "2026-05-24",
    "desc": {
      "en": "A stunning Electric Hypercar wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Electric Hypercar ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Electric Hypercar tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Electric Hypercar ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Electric Hypercar ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Electric Hypercar နောက်ခံပုံ။"
    }
  },
  {
    "slug": "supercar-9",
    "title": "Chrono GT",
    "category": "supercar",
    "color": "#7b4bd6",
    "src": "/wallpapers/supercar-9.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "supercar",
      "chrono",
      "wallpaper",
      "highres"
    ],
    "downloads": 10489,
    "published": "2026-05-22",
    "desc": {
      "en": "A stunning Chrono GT wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Chrono GT ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Chrono GT tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Chrono GT ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Chrono GT ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Chrono GT နောက်ခံပုံ။"
    }
  },
  {
    "slug": "supercar-10",
    "title": "Turbo Concept",
    "category": "supercar",
    "color": "#5c7b52",
    "src": "/wallpapers/supercar-10.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "supercar",
      "turbo",
      "wallpaper",
      "highres"
    ],
    "downloads": 10788,
    "published": "2026-05-20",
    "desc": {
      "en": "A stunning Turbo Concept wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Turbo Concept ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Turbo Concept tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Turbo Concept ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Turbo Concept ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Turbo Concept နောက်ခံပုံ။"
    }
  },
  {
    "slug": "luxury-1",
    "title": "Gold Leaf",
    "category": "luxury",
    "color": "#bb8a44",
    "src": "/wallpapers/luxury-1.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "luxury",
      "gold",
      "wallpaper",
      "highres"
    ],
    "downloads": 17456,
    "published": "2026-06-04",
    "desc": {
      "en": "A stunning Gold Leaf wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Gold Leaf ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Gold Leaf tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Gold Leaf ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Gold Leaf ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Gold Leaf နောက်ခံပုံ။"
    }
  },
  {
    "slug": "luxury-2",
    "title": "Premium Marble",
    "category": "luxury",
    "color": "#5fb03d",
    "src": "/wallpapers/luxury-2.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "luxury",
      "premium",
      "wallpaper",
      "highres"
    ],
    "downloads": 19282,
    "published": "2026-06-02",
    "desc": {
      "en": "A stunning Premium Marble wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Premium Marble ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Premium Marble tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Premium Marble ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Premium Marble ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Premium Marble နောက်ခံပုံ။"
    }
  },
  {
    "slug": "luxury-3",
    "title": "Velvet Shadow",
    "category": "luxury",
    "color": "#1b6ca8",
    "src": "/wallpapers/luxury-3.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "luxury",
      "velvet",
      "wallpaper",
      "highres"
    ],
    "downloads": 22480,
    "published": "2026-05-31",
    "desc": {
      "en": "A stunning Velvet Shadow wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Velvet Shadow ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Velvet Shadow tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Velvet Shadow ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Velvet Shadow ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Velvet Shadow နောက်ခံပုံ။"
    }
  },
  {
    "slug": "luxury-4",
    "title": "Champagne Sparkle",
    "category": "luxury",
    "color": "#c8443f",
    "src": "/wallpapers/luxury-4.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "luxury",
      "champagne",
      "wallpaper",
      "highres"
    ],
    "downloads": 7550,
    "published": "2026-05-29",
    "desc": {
      "en": "A stunning Champagne Sparkle wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Champagne Sparkle ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Champagne Sparkle tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Champagne Sparkle ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Champagne Sparkle ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Champagne Sparkle နောက်ခံပုံ။"
    }
  },
  {
    "slug": "luxury-5",
    "title": "Diamond Pattern",
    "category": "luxury",
    "color": "#7b4bd6",
    "src": "/wallpapers/luxury-5.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "luxury",
      "diamond",
      "wallpaper",
      "highres"
    ],
    "downloads": 13179,
    "published": "2026-05-27",
    "desc": {
      "en": "A stunning Diamond Pattern wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Diamond Pattern ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Diamond Pattern tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Diamond Pattern ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Diamond Pattern ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Diamond Pattern နောက်ခံပုံ။"
    }
  },
  {
    "slug": "luxury-6",
    "title": "Royal Crest",
    "category": "luxury",
    "color": "#5c7b52",
    "src": "/wallpapers/luxury-6.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "luxury",
      "royal",
      "wallpaper",
      "highres"
    ],
    "downloads": 21230,
    "published": "2026-05-25",
    "desc": {
      "en": "A stunning Royal Crest wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Royal Crest ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Royal Crest tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Royal Crest ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Royal Crest ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Royal Crest နောက်ခံပုံ။"
    }
  },
  {
    "slug": "luxury-7",
    "title": "Silk Weave",
    "category": "luxury",
    "color": "#e07a1f",
    "src": "/wallpapers/luxury-7.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "luxury",
      "silk",
      "wallpaper",
      "highres"
    ],
    "downloads": 25079,
    "published": "2026-05-23",
    "desc": {
      "en": "A stunning Silk Weave wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Silk Weave ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Silk Weave tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Silk Weave ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Silk Weave ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Silk Weave နောက်ခံပုံ။"
    }
  },
  {
    "slug": "luxury-8",
    "title": "Platinum Line",
    "category": "luxury",
    "color": "#1f9aa6",
    "src": "/wallpapers/luxury-8.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "luxury",
      "platinum",
      "wallpaper",
      "highres"
    ],
    "downloads": 9855,
    "published": "2026-05-21",
    "desc": {
      "en": "A stunning Platinum Line wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Platinum Line ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Platinum Line tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Platinum Line ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Platinum Line ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Platinum Line နောက်ခံပုံ။"
    }
  },
  {
    "slug": "luxury-9",
    "title": "Opal Sheen",
    "category": "luxury",
    "color": "#33343a",
    "src": "/wallpapers/luxury-9.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "luxury",
      "opal",
      "wallpaper",
      "highres"
    ],
    "downloads": 29503,
    "published": "2026-05-19",
    "desc": {
      "en": "A stunning Opal Sheen wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Opal Sheen ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Opal Sheen tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Opal Sheen ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Opal Sheen ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Opal Sheen နောက်ခံပုံ။"
    }
  },
  {
    "slug": "luxury-10",
    "title": "Luxury Suite",
    "category": "luxury",
    "color": "#d86b8f",
    "src": "/wallpapers/luxury-10.png",
    "width": 1080,
    "height": 2340,
    "tags": [
      "luxury",
      "luxury",
      "wallpaper",
      "highres"
    ],
    "downloads": 21765,
    "published": "2026-05-17",
    "desc": {
      "en": "A stunning Luxury Suite wallpaper designed in 8K resolution.",
      "th": "วอลล์เปเปอร์ Luxury Suite ที่สวยงาม ออกแบบในความละเอียดระดับ 8K",
      "vi": "Hình nền Luxury Suite tuyệt đẹp được thiết kế với độ phân giải 8K.",
      "lo": "ວໍລເປເປີ Luxury Suite ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K",
      "km": "រូបភាពផ្ទៃក្រោយ Luxury Suite ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។",
      "my": "8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် Luxury Suite နောက်ခံပုံ။"
    }
  }
,
  {
    slug: "quiet-horizons",
    title: "Quiet Horizons",
    category: "minimal",
    color: "#e5e5e5",
    src: "/wallpapers/minimal-1.png",
    width: 1080,
    height: 2340,
    tags: ["minimal","clean","line","aesthetic","nature"],
    downloads: 12850,
    published: "2026-06-05",
    desc: {
      en: "A clean, peaceful minimalist landscape with a subtle horizon line.",
      th: "ทิวทัศน์มินิมอลที่เงียบสงบพร้อมเส้นขอบฟ้าที่เรียบหรูและบางเบา",
      vi: "Phong cảnh tối giản sạch sẽ, thanh bình với đường chân trời tinh tế.",
      my: "သိမ်မွေ့သော မိုးကုပ်စက်ဝိုင်းလိုင်းပါဝင်သည့် သန့်ရှင်းအေးချမ်းသော ရိုးရှင်းသည့် ရှုခင်း။",
      lo: "ທິວທັດມິນິມອນທີ່ງຽບສະຫງົບພ້ອມເສັ້ນຂອບຟ້າທີ່ລຽບງ່າຍ.",
      km: "ទេសភាពសាមញ្ញស្ងប់ស្ងាត់និងស្អាតជាមួយនឹងខ្សែបន្ទាត់ជើងមេឃដ៏ស្រទន់។"
    }
  },
  {
    slug: "geometric-line",
    title: "Geometric Line",
    category: "minimal",
    color: "#f0f0f0",
    src: "/wallpapers/minimal-2.png",
    width: 1080,
    height: 2340,
    tags: ["minimal","geometry","art","white"],
    downloads: 9400,
    published: "2026-06-04",
    desc: {
      en: "Abstract geometric lines crossing over a warm-tinted light background.",
      th: "เส้นเรขาคณิตแบบนามธรรมพาดผ่านพื้นหลังสีอ่อนโทนอุ่นอย่างลงตัว",
      vi: "Các đường hình học trừu tượng cắt qua nền sáng tông ấm.",
      my: "နွေးထွေးသော နောက်ခံအလင်းပေါ်တွင် ဖြတ်သန်းနေသော စိတ်ကူးယဉ် ဂျီသြမေတြီလိုင်းများ။",
      lo: "ເສັ້ນເລຂາຄະນິດແບບນາມມະທຳພາດຜ່ານພື້ນຫຼັງສີອ່ອນໂທນອຸ່ນ.",
      km: "ខ្សែបន្ទាត់ធរណីមាត្រអរូបីឆ្លងកាត់លើផ្ទៃខាងក្រោយពណ៌ស្រាលដែលមានពណ៌ក្តៅ។"
    }
  },
  {
    slug: "nordic-wave",
    title: "Nordic Wave",
    category: "minimal",
    color: "#e8eff5",
    src: "/wallpapers/minimal-3.png",
    width: 1080,
    height: 2340,
    tags: ["minimal","wave","blue","aesthetic"],
    downloads: 15120,
    published: "2026-06-03",
    desc: {
      en: "Soft flowing Nordic-inspired waves in calming pastel blue tones.",
      th: "เกลียวคลื่นนุ่มนวลสไตล์นอร์ดิกในโทนสีฟ้าพาสเทลที่ให้ความรู้สึกผ่อนคลาย",
      vi: "Những làn sóng mềm mại lấy cảm hứng từ Bắc Âu với tông màu xanh pastel dịu nhẹ.",
      my: "အေးချမ်းသော ပက်စတယ် အပြာရောင်တိုနီဖြင့် စီးဆင်းနေသော နော်ဒစ်လှိုင်းများ။",
      lo: "ເກຼັຽວຄື້ນນຸ່ມນວນສະໄຕລ໌ນໍດິກໃນໂທນສີຟ້າພັດເທລ.",
      km: "រលកហូរដ៏ស្រទន់បែបន័រឌីកក្នុងស្រមោលពណ៌ខៀវស្រាលដ៏ស្ងប់ស្ងាត់។"
    }
  },
  {
    slug: "minimal-sand-mirage",
    title: "Sand Mirage",
    category: "minimal",
    color: "#dfd5c6",
    src: "/wallpapers/minimal-4.png",
    width: 1080,
    height: 2340,
    tags: ["minimal","sand","warm","desert"],
    downloads: 11200,
    published: "2026-06-01",
    desc: {
      en: "Warm sand dunes forming abstract minimalist curves.",
      th: "เนินทรายสีอุ่นที่โค้งมนอย่างเรียบง่ายในสไตล์มินิมอล",
      vi: "Những cồn cát ấm áp tạo thành các đường cong tối giản trừu tượng.",
      my: "ရိုးရှင်းသော စိတ်ကူးယဉ် အကွေ့အကောက်များ ဖြစ်ပေါ်စေသည့် นွေးထွေးသော သဲခုံများ။",
      lo: "ເນີນຊາຍສີອຸ່ນທີ່ໂຄ້ງມົນຢ່າງລຽບງ່າຍໃນສະໄຕລ໌ມິນິມອນ.",
      km: "វាលខ្សាច់ពណ៌ក្តៅបង្កើតជាខ្សែកោងសាមញ្ញអរូបី។"
    }
  },
  {
    slug: "matte-flow",
    title: "Matte Flow",
    category: "minimal",
    color: "#2b2b2b",
    src: "/wallpapers/minimal-5.png",
    width: 1080,
    height: 2340,
    tags: ["minimal","dark","abstract","matte"],
    downloads: 18450,
    published: "2026-05-30",
    desc: {
      en: "Elegant smooth matte flows with soft shadows for a modern dark look.",
      th: "เส้นสายสีดำแมตต์ที่ลื่นไหลและหรูหราพร้อมเงาที่นุ่มนวลสำหรับหน้าจอโทนมืด",
      vi: "Các dòng chảy mờ mịn màng thanh lịch với bóng mềm cho vẻ ngoài tối hiện đại.",
      my: "ခေတ်မီသော အမှောင်ပုံစံအတွက် နူးညံ့သောအမှောင်ရိပ်များပါရှိသည့် သပ်ရပ်ချောမွေ့သော ဖျော့တော့လှိုင်းများ။",
      lo: "ເສັ້ນສາຍສີດຳແມັດທີ່ມື່นໄຫຼ ແລະ ຫຼູຫຼາພ້ອມເງົາທີ່ນຸ່ມນວນ.",
      km: "លំហូរម៉ាត់ដ៏រលោងនិងប្រណីតជាមួយនឹងស្រមោលស្រទន់សម្រាប់រូបរាងងងឹតទំនើប។"
    }
  },
  {
    slug: "stealth-grid",
    title: "Stealth Grid",
    category: "minimal",
    color: "#1a1a1a",
    src: "/wallpapers/minimal-6.png",
    width: 1080,
    height: 2340,
    tags: ["minimal","grid","black","amoled"],
    downloads: 22600,
    published: "2026-05-28",
    desc: {
      en: "Ultra-minimal stealth grid lines on pitch-black background.",
      th: "ตารางกราฟิกแบบมินิมอลบางเฉียบสีเทาเข้มบนพื้นหลังสีดำสนิทเพื่อประหยัดแบตเตอรี่",
      vi: "Các đường lưới ẩn siêu tối giản trên nền đen tuyền.",
      my: "အမည်းရောင်နောက်ခံပေါ်တွင် အလွန်ရိုးရှင်းသော ဇယားကွက်လိုင်းများ။",
      lo: "ຕາລາງກຣาຟິກແບບມິນິມອນບາງສະເພາະສີເທົາເຂັ້ມບົນພື້ນຫຼັງສີດຳສະໜິດ.",
      km: "ខ្សែបន្ទាត់ក្រឡាចត្រង្គលាក់ខ្លួនបែបសាមញ្ញបំផុតលើផ្ទៃខាងក្រោយខ្មៅងងឹត។"
    }
  },
  {
    slug: "zen-arc",
    title: "Zen Arc",
    category: "minimal",
    color: "#eae5db",
    src: "/wallpapers/minimal-7.png",
    width: 1080,
    height: 2340,
    tags: ["minimal","zen","circle","peaceful"],
    downloads: 8900,
    published: "2026-05-25",
    desc: {
      en: "A single brush stroke arc representing Zen peace and alignment.",
      th: "ลายเส้นพู่กันโค้งเดี่ยวสไตล์เซนที่ให้ความรู้สึกสงบ สมดุล และมีสมาธิ",
      vi: "Một đường vòng cung cọ duy nhất đại diện cho sự hòa bình và liên kết Zen.",
      my: "ဇင်ငြိမ်းချမ်းမှုနှင့် လိုက်ဖက်ညီမှုကို ကိုယ်စားပြုသော စုတ်ချက်တစ်ချက် အကွေ့အကောက်။",
      lo: "ລາຍເສັ້ນພູ່ກັນໂຄ້ງດ່ຽວສະໄຕລ໌ເຊັນທີ່ໃຫ້ຄວາມຮູ້ສຶກສະຫງົບ.",
      km: "ខ្សែកោងគំនូរជក់តែមួយតំណាងឱ្យភាពស្ងប់ស្ងាត់និងភាពស៊ីសង្វាក់គ្នាបែបហ្សេន។"
    }
  },
  {
    slug: "warm-clay",
    title: "Warm Clay",
    category: "minimal",
    color: "#d4a373",
    src: "/wallpapers/minimal-8.png",
    width: 1080,
    height: 2340,
    tags: ["minimal","clay","orange","pastel"],
    downloads: 10500,
    published: "2026-05-22",
    desc: {
      en: "Earth-toned claymorphic shapes stacked in a clean, quiet composition.",
      th: "รูปทรงดินเผาโทนสีธรรมชาติจัดวางซ้อนกันในสไตล์มินิมอลที่สะอาดตาและเงียบสงบ",
      vi: "Các khối đất sét tông màu đất xếp chồng lên nhau trong một bố cục sạch sẽ, tĩnh lặng.",
      my: "သန့်ရှင်းအေးချမ်းသော ဖွဲ့စည်းမှုတွင် စီထားသော မြေကြီးရောင် ရိုးရှင်းသော ပုံသဏ္ဌာန်များ။",
      lo: "ຮູບຊົງດິນເຜົາໂທນສີທຳມະຊາດຈັດວາງຊ້ອນກັນຢ່າງລຽບງ່າຍ.",
      km: "រាងដីឥដ្ឋពណ៌ធម្មជាតិដែលតម្រៀបគ្នាក្នុងសមាសភាពស្អាតនិងស្ងប់ស្ងាត់។"
    }
  },
  {
    slug: "soft-shadow",
    title: "Soft Shadow",
    category: "minimal",
    color: "#f5f5f7",
    src: "/wallpapers/minimal-9.png",
    width: 1080,
    height: 2340,
    tags: ["minimal","shadow","clean","gray"],
    downloads: 14700,
    published: "2026-05-20",
    desc: {
      en: "Minimal shadow cast on a clean white wall, creating depth with simplicity.",
      th: "แสงเงาบางเบาตกกระทบบนกำแพงสีขาวสะอาดตา เพิ่มมิติความลึกที่เรียบง่ายแต่ดูดี",
      vi: "Bóng tối giản đổ lên bức tường trắng sạch sẽ, tạo chiều sâu một cách đơn giản.",
      my: "ရိုးရှင်းမှုဖြင့် အနက်ကို ဖန်တီးပေးသည့် သန့်ရှင်းသော အဖြူရောင်နံရံပေါ်ရှိ ရိုးရှင်းသော အရိပ်။",
      lo: "ແສງເງົາບາງເບົາຕົກກະທົບບົນກຳແພງສີຂາວສະອາດຕາ.",
      km: "ស្រមោលស្រទន់ចាំងលើជញ្ជាំងពណ៌សស្អាត បង្កើតជម្រៅដោយភាពសាមញ្ញ。 "
    }
  },
  {
    slug: "lunar-outline",
    title: "Lunar Outline",
    category: "minimal",
    color: "#121214",
    src: "/wallpapers/minimal-10.png",
    width: 1080,
    height: 2340,
    tags: ["minimal","moon","outline","dark"],
    downloads: 19800,
    published: "2026-05-18",
    desc: {
      en: "A glowing crescent moon outline on a dark starry night background.",
      th: "เส้นเสี้ยวพระจันทร์เรืองแสงบางเบาบนพื้นหลังคืนเดือนมืดที่แสนสงบ",
      vi: "Đường viền trăng khuyết phát sáng trên nền đêm tối giản.",
      my: "မှောင်မိုက်သော ရိုးရှင်းသည့် ညနောက်ခံပေါ်တွင် တောက်ပနေသော လခြမ်းပုံသဏ္ဌာန်။",
      lo: "ເສັ້ນສ້ຽວພະຈັນເຮືອງແສງບາງເບົາບົນພື້ນຫຼັງຄືนເດືອນມືດ.",
      km: "គ្រោងព្រះច័ន្ទចម្រៀកភ្លឺចែងចាំងលើផ្ទៃខាងក្រោយរាត្រីងងឹតបែបសាមញ្ញ។"
    }
  }
];

export function getAllWallpapers(): Wallpaper[] {
  return [...wallpapers].sort((a, b) => +new Date(b.published) - +new Date(a.published));
}
export function getWallpaper(slug: string): Wallpaper | undefined {
  return wallpapers.find((w) => w.slug === slug);
}
export function getByCategory(category: string): Wallpaper[] {
  return getAllWallpapers().filter((w) => w.category === category);
}
export function getTrending(limit = 6): Wallpaper[] {
  return [...wallpapers].sort((a, b) => b.downloads - a.downloads).slice(0, limit);
}
export function getRelated(slug: string, limit = 3): Wallpaper[] {
  const current = getWallpaper(slug);
  if (!current) return [];
  return wallpapers.filter((w) => w.slug !== slug && w.category === current.category).slice(0, limit);
}
export function formatDownloads(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(n);
}

export function getWallpapersFiltered(filter: { category?: string; tag?: string; deviceRatio?: "portrait" | "tablet" | "all" }): Wallpaper[] {
  let list = getAllWallpapers();
  if (filter.category) {
    list = list.filter((w) => w.category === filter.category);
  }
  if (filter.tag) {
    const t = filter.tag.toLowerCase();
    list = list.filter((w) => w.tags.some((tag) => tag.toLowerCase() === t));
  }
  if (filter.deviceRatio === "portrait") {
    list = list.filter((w) => w.height > w.width);
  }
  return list;
}
