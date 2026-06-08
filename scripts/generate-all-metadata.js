const fs = require("fs");
const path = require("path");

const WALLPAPERS_FILE = path.join(__dirname, "../src/lib/wallpapers.ts");

const categories = {
  anime: ["Ghibli Meadow", "Cherry Railway", "Mountain Shrine", "Summer Clouds", "Fuji Sunset", "Cozy Rain", "Dreamy Forest", "Sky Sanctuary", "Sunset Shore", "School Gate"],
  dragon: ["Fire Dragon", "Ice Dragon", "Shadow Dragon", "Golden Dragon", "Forest Dragon", "Storm Dragon", "Ancient Dragon", "Spectral Dragon", "Obsidian Dragon", "Mystic Dragon"],
  black: ["Stealth Noir", "Carbon Grid", "Minimal Wave", "Obsidian Fold", "Dark Matte", "Shadow Lines", "Monochrome Spheres", "Charcoal Mist", "Eclipse Ring", "Void Texture"],
  amoled: ["Neon Pulse", "Eclipse Glow", "Electric Line", "Quantum Core", "Luminescent Ring", "Deep Void", "Binary Star", "Prism Edge", "Strobe Wave", "Infinity Core"],
  aesthetic: ["Retro Sun", "Vaporwave Horizon", "Pastel Cloud", "Dreamscape Gateway", "Lofi Sunset", "Lavender Haze", "Glitch Mirage", "Cyber Sunset", "Chroma Valley", "Ocean Breeze"],
  cyberpunk: ["Neon Tokyo", "Cyber Alley", "Synthwave Drive", "Neon Motorcycle", "Megacity Spire", "Cyber Circuits", "Glitch City", "Netrunner Den", "Holo Billboard", "Grid Horizon"],
  samurai: ["Ronin Path", "Katana Glint", "Cherry Warrior", "Bamboo Duel", "Shadow Samurai", "Golden Armor", "Sunset Blade", "Mist Dojo", "Historic Spirit", "Zen Guardian"],
  oni: ["Oni Mask", "Demon Fire", "Red Ogre", "Noh Mask", "Dark Folklore", "Oni Guardian", "Crimson Horn", "Shadow Demon", "Temple Oni", "Kabuki Spirit"],
  wolf: ["Alpha Howl", "Forest Hunter", "Midnight Pack", "Snow Wolf", "Shadow Alpha", "Luna Wolf", "Spirit Predator", "Neon Wolf", "Tundra Guardian", "Fire Alpha"],
  car: ["Retro Cruiser", "Tokyo Drift", "Classic Muscle", "Highway Cruiser", "City Night Drive", "Vintage Garage", "Desert Rally", "Neon Roadster", "Custom Tuner", "Urban Hatch"],
  nature: ["Misty Forest", "Alpine Lake", "Desert Oasis", "Waterfall Escape", "Ocean Wave", "Autumn Valley", "Bamboo Grove", "Canyon Sunset", "Meadow Flower", "River Stream"],
  space: ["Nebula Heart", "Cosmic Gateway", "Stardust River", "Andromeda Spiral", "Stellar Nursery", "Cosmic Sea", "Solar Flare", "Violet Haze", "Aurora Drift", "Orion Nebula"],
  gaming: ["RGB Setup", "Virtual Arena", "Neon Controller", "Console Station", "Cyber Arcade", "Pixel Castle", "Synth Grid", "E-sports Arena", "Game Over", "Retro Console"],
  cute: ["Chibi Cat", "Pastel Dino", "Clay Shiba", "Marshmallow Bunny", "Bubble Bear", "Dreamy Unicorn", "Happy Panda", "Sweet Hamster", "Pastel Koala", "Kawaii Fox"],
  dark: ["Gothic Cathedral", "Shadow Spire", "Mystic Moon", "Dark Forest", "Grim Reaper", "Skull Art", "Cemetery Mist", "Black Rose", "Crow Perch", "Midnight Gate"],
  fantasy: ["Hidden Temple", "Floating Islands", "Elven Forest", "Crystal Cave", "Wizard Tower", "Sky Castle", "Enchanted River", "Pegasus Flight", "Sacred Grove", "Ancient Ruins"],
  japanese: ["Shinto Torii", "Kyoto Alley", "Cherry Blossom", "Ukiyo-e Wave", "Zen Garden", "Pagoda Sunset", "Bamboo Path", "Red Bridge", "Fuji View", "Tea House"],
  neon: ["Glowing Grid", "Electric Arc", "Neon Sign", "Cyber Grid", "Laser Wave", "Light Tunnel", "Bioluminescent Flora", "Chroma Ring", "Vibrant Line", "Pulse Wave"],
  supercar: ["Veloce Hypercar", "Carbon Monster", "Aero Concept", "Track Beast", "Futuristic Roadster", "Monaco Cruising", "Apex Predator", "Electric Hypercar", "Chrono GT", "Turbo Concept"],
  luxury: ["Gold Leaf", "Premium Marble", "Velvet Shadow", "Champagne Sparkle", "Diamond Pattern", "Royal Crest", "Silk Weave", "Platinum Line", "Opal Sheen", "Luxury Suite"]
};

const colors = ["#1b6ca8", "#c8443f", "#7b4bd6", "#5c7b52", "#e07a1f", "#1f9aa6", "#33343a", "#d86b8f", "#2d6bff", "#bb8a44", "#5fb03d"];

function generate() {
  console.log("Generating wallpapers.ts...");
  
  let list = [];
  
  // Base date for published timestamps
  let baseDate = new Date("2026-06-07");

  Object.entries(categories).forEach(([category, titles]) => {
    titles.forEach((title, idx) => {
      const slug = `${category}-${idx + 1}`;
      const color = colors[(category.charCodeAt(0) + idx) % colors.length];
      const downloads = Math.floor(5000 + Math.random() * 25000);
      
      // Subtract days for published order
      const published = new Date(baseDate.getTime() - (idx * 2 + category.charCodeAt(0) % 5) * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];

      const entry = {
        slug,
        title,
        category,
        color,
        src: `/wallpapers/${slug}.png`,
        width: 1080,
        height: 2340,
        tags: [category, title.toLowerCase().split(" ")[0], "wallpaper", "highres"],
        downloads,
        published,
        desc: {
          en: `A stunning ${title} wallpaper designed in 8K resolution.`,
          th: `วอลล์เปเปอร์ ${title} ที่สวยงาม ออกแบบในความละเอียดระดับ 8K`,
          vi: `Hình nền ${title} tuyệt đẹp được thiết kế với độ phân giải 8K.`,
          lo: `ວໍລເປເປີ ${title} ທີ່ງົດງາມ ອອກແບບໃນຄວາມລະອຽດລະດັບ 8K`,
          km: `រូបភាពផ្ទៃក្រោយ ${title} ដ៏ស្រស់ស្អាតត្រូវបានរចនាឡើងក្នុងកម្រិតភាពច្បាស់ 8K។`,
          my: `8K ရုပ်ထွက်ဖြင့် ဒီဇိုင်းထုတ်ထားသော လှပသည့် ${title} နောက်ခံပုံ။`
        }
      };
      
      list.push(entry);
    });
  });

  const code = `import type { Locale } from "@/i18n/config";
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

export const wallpapers: Wallpaper[] = ${JSON.stringify(list, null, 2)};

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
  if (n >= 1000) return \`\${(n / 1000).toFixed(1).replace(/\\.0$/, "")}k\`;
  return String(n);
}
`;

  fs.writeFileSync(WALLPAPERS_FILE, code, "utf8");
  console.log("Successfully wrote 200 wallpaper definitions to wallpapers.ts!");
}

generate();
