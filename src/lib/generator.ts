import fs from "fs";
import path from "path";
import crypto from "crypto";
import { categorySlugs } from "./site";

const ARTBOARD_WIDTH = 1080;
const ARTBOARD_HEIGHT = 2340;
const EXPORT_WIDTH = 4320;
const EXPORT_HEIGHT = 9360;

// Color palettes for all 20 categories
const CATEGORY_COLORS: Record<string, string[]> = {
  anime: ["#ff9500", "#ff2d55", "#ff5e3a", "#ffcc00", "#b388ff", "#ea80fc"],
  dragon: ["#ff3b30", "#ff9500", "#8e8e93", "#000000", "#ffcc00", "#b51a00"],
  black: ["#1c1c1e", "#2c2c2e", "#000000", "#3a3a3c", "#48484a", "#8e8e93"],
  amoled: ["#000000", "#07070a", "#101015", "#020202", "#111111", "#ff2d55"],
  aesthetic: ["#b388ff", "#ea80fc", "#80deea", "#ff8a80", "#ffe082", "#e8f5e9"],
  cyberpunk: ["#ff007f", "#00f0ff", "#ff00ff", "#1f005c", "#ff9a00", "#7f00ff"],
  samurai: ["#ff3b30", "#111111", "#8b0000", "#d4af37", "#000000", "#c0c0c0"],
  oni: ["#ff2d55", "#8b0000", "#111111", "#7f00ff", "#4b0082", "#000000"],
  wolf: ["#007aff", "#5856d6", "#8e8e93", "#ffffff", "#34c759", "#1c1c1e"],
  car: ["#ff9500", "#ff2d55", "#007aff", "#4cd964", "#ffcc00", "#3a3a3c"],
  nature: ["#4cd964", "#34c759", "#007aff", "#5ac8fa", "#ffcc00", "#5856d6"],
  space: ["#5856d6", "#000080", "#1a0f30", "#3f2b96", "#0f0c1b", "#2c1a4d"],
  gaming: ["#ff2d55", "#ff9500", "#4cd964", "#007aff", "#5856d6", "#00f0ff"],
  cute: ["#ff8a80", "#ff80ab", "#ea80fc", "#b388ff", "#82b1ff", "#80d8ff"],
  dark: ["#1c1c1e", "#111111", "#2c2c2e", "#3a3a3c", "#070614", "#2c1a4d"],
  fantasy: ["#ffcc00", "#b388ff", "#ff2d55", "#00f0ff", "#5856d6", "#34c759"],
  japanese: ["#d4af37", "#ff3b30", "#ffffff", "#000000", "#8e8e93", "#4cd964"],
  neon: ["#39ff14", "#ff007f", "#00f0ff", "#ffff00", "#ff00ff", "#00ffcc"],
  supercar: ["#ff3b30", "#d4af37", "#ff9500", "#000000", "#1c1c1e", "#007aff"],
  luxury: ["#d4af37", "#ffd700", "#111111", "#0a0a0c", "#4a3c31", "#e5e5ea"],
};

// 5 SEO-rich themes per category
const THEMES: Record<string, { en: string; th: string }[]> = {
  anime: [
    { en: "Aesthetic Nostalgic Lofi Clouds", th: "ก้อนเมฆทิวทัศน์แฟนตาซี Lofi อบอุ่น" },
    { en: "Cherry Blossom Sunset Scenery", th: "สวนซากุระยามเย็นโทนสีพาสเทล" },
    { en: "Cozy Lofi Bedroom Study Space", th: "ห้องหนังสือและแมวนอนหลับน่ารัก" },
    { en: "Nostalgic Summer Skyline Glow", th: "ขอบฟ้าฤดูร้อนย้อนยุคสีสันสดใส" },
    { en: "Retro Japanese Street Lights", th: "ถนนญี่ปุ่นยามค่ำคืนลายเส้นอนิเมะ" },
  ],
  dragon: [
    { en: "Crimson Fire Breath Legend", th: "ตำนานมังกรเพลิงสีชาดพ่นไฟ" },
    { en: "Ancient Asian Jade Dragon Scales", th: "เกล็ดมังกรหยกในตำนานตะวันออกโบราณ" },
    { en: "Dark Shadow Dragon Silhouette", th: "เงาร่างมังกรทมิฬในม่านหมอกอัศจรรย์" },
    { en: "Golden Emperor Celestial Dragon", th: "มังกรทองจักรพรรดิแห่งสรวงสวรรค์" },
    { en: "Eldritch Void Cosmic Dragon", th: "มังกรอวกาศห้วงมิติมืดขอบฟ้าเหตุการณ์" },
  ],
  black: [
    { en: "Minimal Carbon Geometric Plate", th: "แผ่นลายเส้นเรขาคณิตคาร์บอนมินิมอล" },
    { en: "Matte Black Polygonal Texture", th: "พื้นผิวโพลีกอนสีดำด้านสุดหรู" },
    { en: "Abstract Dark Wave Ribbon", th: "ริบบิ้นคลื่นสีดำนามธรรมพรีเมียม" },
    { en: "Futuristic Obsidian Tech Armor", th: "เกราะเทคโนโลยีหินออบซิเดียนสีดำ" },
    { en: "Monochrome Minimalist Shadow Line", th: "เส้นเงาสไตล์มินิมอลโมโนโครมเท่ๆ" },
  ],
  amoled: [
    { en: "Amoled True Black Core Ring", th: "วงแหวนแกนพลังงานเรืองแสงบนพื้นดำสนิท" },
    { en: "Minimal Neon Edge Glow Line", th: "เส้นขอบนีออนเรืองแสงถนอมสายตาแอมโมเลด" },
    { en: "Deep Space Void Star Dust", th: "ละอองดาวอวกาศสีดำประหยัดพลังงานหน้าจอ" },
    { en: "Amoled Neon Liquid Glow Line", th: "เส้นของเหลวไหลเรืองแสงบนพื้นดำสนิท" },
    { en: "Futuristic Cyber Grid Neon Flow", th: "กระแสคลื่นดิจิทัลเรืองแสงถนอมสายตา" },
  ],
  aesthetic: [
    { en: "Pastel Sunset Lavender Horizon", th: "เส้นขอบฟ้าสีลาเวนเดอร์และพระอาทิตย์พาสเทล" },
    { en: "Dreamy Nostalgic Film Grain Sky", th: "ท้องฟ้าฟิล์มเกรนฝันย้อนยุคสีหวาน" },
    { en: "Retro Vaporwave Checkerboard Sun", th: "ดวงอาทิตย์ตกดินสไตล์ Vaporwave เรโทร" },
    { en: "Cozy Lavender Meadow Sunrise", th: "ทุ่งดอกลาเวนเดอร์รับแสงอาทิตย์รุ่งอรุณ" },
    { en: "Minimalist Pastel Fluid Wave", th: "คลื่นของเหลวพาสเทลมินิมอลสีชมพูพีช" },
  ],
  cyberpunk: [
    { en: "Neon Street Rainy Reflection", th: "ถนนเมืองไซเบอร์พังค์ฝนตกแสงสะท้อนนีออน" },
    { en: "Future Megacity Skyline Hologram", th: "ขอบตึกเมืองโฮโลแกรมล้ำยุคสีชมพูฟ้า" },
    { en: "Glitch Cyberpunk Hacker Room", th: "ห้องแฮกเกอร์สายรหัสผ่านและแสงสีนีออน" },
    { en: "Retro-futurism Synthwave Sun", th: "ดวงอาทิตย์พระอาทิตย์ย้อนยุค Synthwave" },
    { en: "Cyber Samurai Dark Armor", th: "นักรบไซเบอร์ซามูไรชุดเกราะเรืองแสง" },
  ],
  samurai: [
    { en: "Katana Reflection Crimson Sun", th: "แสงสะท้อนใบดาบคะตะนะและพระอาทิตย์สีเลือด" },
    { en: "Shadow Ronin Cherry Blossom Wind", th: "ซามูไรพเนจรใต้ลมพัดกลีบซากุระปลิว" },
    { en: "Ancient Samurai Armor Crest", th: "หน้ากากชุดเกราะซามูไรโบราณสุดเกรงขาม" },
    { en: "Bushido Code Minimalist Ink Stroke", th: "ลายเส้นพู่กันหมึกดำวิถีบูชิโดมินิมอล" },
    { en: "Golden Dragon Samurai Blade", th: "ดาบซามูไรมังกรทองจักรพรรดิเรืองแสง" },
  ],
  oni: [
    { en: "Red Oni Demon Mask Silhouette", th: "หน้ากากยักษ์โอนิสีแดงในเงามืดศัตรู" },
    { en: "Kabuki Neon Glowing Demon Horns", th: "เขาปีศาจเรืองแสงนีออนหน้ากากคาบูกิ" },
    { en: "Dark Ghost Fire Underworld", th: "ไฟวิญญาณโอนิและเปลวเพลิงใต้พิภพสีม่วง" },
    { en: "Traditional Japanese Demon Face", th: "ใบหน้าปีศาจโอนิสไตล์ภาพวาดญี่ปุ่นโบราณ" },
    { en: "Cyber Oni Hacker Mask Glow", th: "หน้ากากยักษ์ไซเบอร์โอนิเรืองแสงแห่งอนาคต" },
  ],
  wolf: [
    { en: "Howling Wolf Blue Full Moon", th: "หมาป่าหอนรับแสงจันทร์เต็มดวงสีน้ำเงิน" },
    { en: "Forest Alpha Wolf Shadow Mist", th: "เงาจ่าฝูงหมาป่าในม่านหมอกป่าสนดิบอับแสง" },
    { en: "Arctic Winter Ice Blizzard Wolf", th: "หมาป่าสีขาวท่ามกลางพายุหิมะน้ำแข็งขั้วโลก" },
    { en: "Geometric Origami Cyber Wolf", th: "หมาป่าพับกระดาษเรขาคณิตสไตล์ล้ำยุค" },
    { en: "Nebula Celestial Wolf Spirit", th: "จิตวิญญาณหมาป่าสวรรค์จากฝุ่นผงเนบิวลา" },
  ],
  car: [
    { en: "Night City Highway Speed Trail", th: "เส้นแสงความเร็วบนทางด่วนเมืองหลวงค่ำคืน" },
    { en: "Drift Action Smoke Tyre Glow", th: "การดริฟต์รถแข่งสุดมันส์พร้อมควันยางฟุ้ง" },
    { en: "Retro Dashboard Console Vibe", th: "คอนโซลพวงมาลัยรถสไตล์เรโทรยุค 90s" },
    { en: "Custom Tuner Neon Underglow", th: "รถซิ่งแต่งสตรีทไฟนีออนใต้ท้องรถเรืองแสง" },
    { en: "Sports Car Silhouette Sunset Ride", th: "เงาตัวถังรถสปอร์ตวิ่งรับแสงแดดเย็นรำไร" },
  ],
  nature: [
    { en: "Mist Pine Forest Mountain Rise", th: "ภูเขาและป่าสนในม่านหมอกฤดูหนาวอบอุ่น" },
    { en: "Golden Hour Ocean Wave Splash", th: "คลื่นทะเลซัดสาดรับแสงสีทองพระอาทิตย์ตก" },
    { en: "Autum Maple Leaf Golden River", th: "ใบเมเปิ้ลสีส้มร่วงหล่นบนแม่น้ำใสสะอาด" },
    { en: "Tropical Palm Leaf Summer Sun", th: "ใบปาล์มเขตร้อนรับแสงอาทิตย์ฤดูร้อนสีฟ้า" },
    { en: "Minimalist Nordic Green Forest", th: "ป่าดิบชื้นสีเขียวทึบสไตล์สแกนดิเนเวียมินิมอล" },
  ],
  space: [
    { en: "Deep Space Cosmic Nebula Dust", th: "กลุ่มก๊าซเนบิวลาและละอองดาวในอวกาศลึก" },
    { en: "Ringed Gas Giant Planet Glow", th: "ดาวเคราะห์แก๊สวงแหวนเรืองแสงสีม่วงน้ำเงิน" },
    { en: "Cosmic Portal Event Horizon", th: "ขอบฟ้าเหตุการณ์หลุมดำและแสงบิดเบี้ยว" },
    { en: "Interstellar Spacecraft Horizon", th: "มุมมองจากยานอวกาศผ่านขอบฟ้ากาแล็กซี" },
    { en: "Amoled Starfield Supernova Glow", th: "อภิมหาซูเปอร์โนวาและแสงระยิบระยับดาวดวงน้อย" },
  ],
  gaming: [
    { en: "RGB Mechanical Keyboard Pulse", th: "กระแสไฟสเปกตรัมคีย์บอร์ดเกมมิ่งเรืองแสง" },
    { en: "Retro Arcade Game Pixel Lights", th: "แสงไฟพิกเซลดิจิทัลตู้เกมอาเขตย้อนยุค" },
    { en: "Cyber Console Controller Glow", th: "จอยคอนโทรลเลอร์เกมเรืองแสงไซเบอร์สุดเท่" },
    { en: "Esports Arena Cyber Neon Logo", th: "โลโก้นีออนชิงแชมป์อีสปอร์ตแห่งอนาคต" },
    { en: "Liquid Cyber Streamer Room Glow", th: "ห้องสตรีมเมอร์เกมเมอร์แสงไฟสีม่วงเขียวสะท้อน" },
  ],
  cute: [
    { en: "Sleeping Kitten Soft Pastel Cloud", th: "ลูกแมวนอนหลับบนก้อนเมฆพาสเทลแสนหวาน" },
    { en: "Kawaii Chibi Animal Pattern", th: "ลวดลายน้องสัตว์น่ารักจิบิตัวเล็กดาวน์โหลดฟรี" },
    { en: "Smiling Pink Bear Balloon Sky", th: "ตุ๊กตาหมีสีชมพูยิ้มลอยฟ้ากับลูกโป่งหลากสี" },
    { en: "Cute Dinosaur Dreamy Galaxy", th: "ไดโนเสาร์ตัวน้อยผจญภัยในกาแล็กซีสีฝัน" },
    { en: "Sweet Strawberry Pastel Heart", th: "ลวดลายสตรอว์เบอร์รี่และหัวใจสีพาสเทลอบอุ่น" },
  ],
  dark: [
    { en: "Obsidian Tech Shield Plate", th: "แผ่นโลหะเกราะเทคโนโลยีออบซิเดียนสีดำเข้ม" },
    { en: "Gothic Cathedral Shadow Spires", th: "ยอดโบสถ์สไตล์โกธิคในเงาหมอกยามวิกาล" },
    { en: "Abstract Shadow Crevice Flow", th: "ลวดลายซอกหินลาวาและเส้นเงามืดลึก" },
    { en: "Dark Forest Mystical fog", th: "ป่าลึกลับไร้แสงในม่านหมอกสีถ่านเทา" },
    { en: "Dark Metal Honeycomb Grid", th: "ตารางรังผึ้งโลหะรมดำสไตล์มินิมอลเท่ๆ" },
  ],
  fantasy: [
    { en: "Magical Glowing Crystal Cave", th: "ถ้ำคริสตัลเรืองแสงเวทมนตร์สีชมพูม่วง" },
    { en: "Elven Tree Magic Light Portal", th: "ประตูมิติแสงเวทมนตร์ใต้ต้นไม้ศักดิ์สิทธิ์" },
    { en: "Floating Castle Sunset Sky", th: "ปราสาทลอยฟ้าท่ามกลางเมฆแสงสีทอง" },
    { en: "Mythical Unicorn Aurora Glow", th: "ยูนิคอร์นในแสงออโรร่าเหนือฟากฟ้าแฟนตาซี" },
    { en: "Wizard Alchemy Spell Circles", th: "วงแหวนเวทมนตร์แปรธาตุลึกลับเรืองแสง" },
  ],
  japanese: [
    { en: "Zen Gravel Wave Garden Sun", th: "สวนหินเซ็นแบบญี่ปุ่นและคลื่นน้ำพระอาทิตย์แดง" },
    { en: "Red Torii Gate Sunset Path", th: "ซุ้มประตูโทริอิสีแดงและทางเดินชมอาทิตย์อัสดง" },
    { en: "Mount Fuji Cherry Blossom Wind", th: "ภูเขาไฟฟูจิและกิ่งซากุระพริ้วไหวสีพาสเทล" },
    { en: "Retro Ukiyo-e Wave Art Style", th: "คลื่นทะเลญี่ปุ่นย้อนยุคสไตล์ภาพพิมพ์อูกิโยเอะ" },
    { en: "Golden Kinkaku Pagoda Reflection", th: "วัดทองปราสาทเกียวโตและเงาสะท้อนสระน้ำ" },
  ],
  neon: [
    { en: "Abstract Glowing Wavy Ribbon", th: "ริบบิ้นเส้นคลื่นนีออนเรืองแสงสีรุ้ง" },
    { en: "Infinite Cyber Neon Grid Tunnel", th: "อุโมงค์เส้นตารางเรืองแสงมิตินีออนลึก" },
    { en: "Minimal Glowing Geometric Ring", th: "วงแหวนนีออนเรขาคณิตสไตล์มินิมอลเท่ๆ" },
    { en: "Amoled Liquid Glow Flow Line", th: "ของเหลวไหลเรืองแสงบนพื้นหลังสีดำสนิท" },
    { en: "Future Pulse Cyber Wave Line", th: "คลื่นกระแสไฟฟ้าเรืองแสงโทนสีเขียวชมพู" },
  ],
  supercar: [
    { en: "Hypercar Carbon Aerodynamic Wing", th: "ปีกสปอยเลอร์คาร์บอนรถไฮเปอร์คาร์ล้ำยุค" },
    { en: "LED Tail Light Cyber Speed Streak", th: "เส้นแสงไฟท้ายแอลอีดีขณะซิ่งด้วยความเร็วสูง" },
    { en: "Matte Black Supercar Front Grill", th: "กระจังหน้ารถซูเปอร์คาร์สีดำด้านขรึมสุดเท่" },
    { en: "Cyber Racing Cockpit Tech Wheel", th: "พวงมาลัยรถแข่งซูเปอร์คาร์ปุ่มเทคโนโลยีล้ำอนาคต" },
    { en: "Glow Brake Disc Hot Racing Glow", th: "จานเบรกเรืองแสงสีส้มแดงร้อนแรงในสนามแข่ง" },
  ],
  luxury: [
    { en: "Obsidian Marble Gold Vein Texture", th: "ลายหินอ่อนสีดำออบซิเดียนแทรกเส้นทองคำแท้" },
    { en: "Premium Dark Silk Wave Ripples", th: "ผืนผ้าไหมสีดำพรีเมียมจับจีบคลื่นคล้ายประกายแสง" },
    { en: "Golden Geometric Art Deco Line", th: "ลายเส้นทองคำหรูหราเรขาคณิตสไตล์อาร์ตเดโค" },
    { en: "Minimalist Platinum Luxury Plate", th: "แผ่นโลหะแพลตตินัมขัดเงาสะท้อนพรีเมียม" },
    { en: "Obsidian Leather Diamond Stitching", th: "หนังแท้สีดำเข้มเย็บลายเพชรระดับลักชัวรี" },
  ],
};

const DEVICES = [
  { name: "iPhone 16 Pro Max", keyword: "iphone-16-pro-max" },
  { name: "iPhone 16", keyword: "iphone-16" },
  { name: "iPhone 15 Pro Max", keyword: "iphone-15-pro-max" },
  { name: "Samsung Galaxy S25 Ultra", keyword: "samsung-s25-ultra" },
  { name: "Samsung Galaxy S24 Ultra", keyword: "samsung-s24-ultra" },
  { name: "Google Pixel 9 Pro", keyword: "google-pixel-9-pro" },
  { name: "iPhone 17 Pro", keyword: "iphone-17-pro" },
];

const LOCALIZED_SEO_TEMPLATES: Record<string, any> = {
  en: {
    title: "8K {theme} Wallpaper for {device} - Download Free",
    desc: "Download a premium 8K {theme} mobile wallpaper designed specifically for {device}. Professionally composed for AMOLED screens, lock screen and home screen backgrounds.",
  },
  th: {
    title: "วอลเปเปอร์ 8K {theme} สำหรับ {device} ดาวน์โหลดฟรี",
    desc: "แจกฟรีวอลเปเปอร์มือถือ 8K {theme} สำหรับ {device} งานภาพสวยระดับพรีเมียม คมชัดสูง เหมาะสำหรับตั้งเป็นหน้าจอล็อกและหน้าจอโฮม",
  },
  my: {
    title: "{device} အတွက် 8K {theme} Wallpaper များ - အခမဲ့ဒေါင်းလုဒ်",
    desc: "{device} ဖုန်းအတွက် သီးသန့်ဒီဇိုင်းထုတ်ထားသော {theme} wallpaper များ။ အလင်းအားကောင်းသော AMOLED မျက်နှาပြင်များအတွက် အထူးသင့်လျော်သည်။",
  },
  lo: {
    title: "ວໍເປເປີ 8K {theme} ສໍາລັບ {device} ຄົມຊັດສູງດາວໂຫຼດຟຣີ",
    desc: "ດາວໂຫຼດວໍເປປີ 8K {theme} ງາມໆສໍາລັບ {device} ປັບແຕ່ງໃຫ້ພໍດີກັບໜ້າຈໍມືຖືຂອງທ່ານ ພາບຄົມຊັດສູງສຸດ.",
  },
  km: {
    title: "ផ្ទាំងរូបភាព 8K {theme} សម្រាប់ {device} ច្បាស់ល្អ ទាញយកដោយសេរី",
    desc: "ទាញយកផ្ទាំងរូបភាពទូរស័ព្ទ 8K {theme} គុណភាពខ្ពស់រចនាឡើងយ៉ាងពិសេសសម្រាប់ {device}។",
  },
  vi: {
    title: "Hình nền 8K {theme} cho {device} đẹp nhất - Tải miễn phí",
    desc: "Tải hình nền điện thoại 8K {theme} chất lượng cao, tương thích hoàn hảo với màn hình {device}. Thiết kế cao cấp, sắc nét và tối ưu pin AMOLED.",
  },
};

class SeededRandom {
  private value: number;
  constructor(seed: number) {
    this.value = seed;
  }
  next(): number {
    this.value = (this.value * 1664525 + 1013904223) % 4294967296;
    return this.value / 4294967296;
  }
  range(min: number, max: number): number {
    return min + this.next() * (max - min);
  }
  pick<T>(arr: T[]): T {
    return arr[Math.floor(this.next() * arr.length)];
  }
}

// Generates random SVG markup matching the category aesthetic
function generateSvgContent(category: string, color1: string, color2: string, color3: string): string {
  const seedBytes = crypto.randomBytes(4);
  const randVal = seedBytes.readUInt32BE(0);
  const rng = new SeededRandom(randVal);

  // Background selection based on category
  let bgGradStart = "#050508";
  let bgGradEnd = "#000000";

  if (category === "anime") {
    bgGradStart = rng.pick(["#ffd6e7", "#b8e7ff", "#ffe8b7", "#d8c9ff"]);
    bgGradEnd = rng.pick(["#2f2c72", "#5161ad", "#1a3766", "#50316f"]);
  } else if (["aesthetic", "cute"].includes(category)) {
    bgGradStart = rng.pick(["#fed7e2", "#dbeafe", "#fef3c7", "#e9d5ff"]);
    bgGradEnd = rng.pick(["#7c3aed", "#2563eb", "#db2777", "#0f766e"]);
  } else if (["nature"].includes(category)) {
    bgGradStart = "#0a1c12";
    bgGradEnd = "#020704";
  } else if (["space", "fantasy"].includes(category)) {
    bgGradStart = "#070314";
    bgGradEnd = "#000000";
  } else if (["luxury"].includes(category)) {
    bgGradStart = "#0d0b0a";
    bgGradEnd = "#000000";
  } else if (["japanese", "samurai", "oni"].includes(category)) {
    bgGradStart = "#1f0f0a";
    bgGradEnd = "#080403";
  } else if (["cyberpunk", "neon"].includes(category)) {
    bgGradStart = "#080314";
    bgGradEnd = "#010005";
  }

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ARTBOARD_WIDTH} ${ARTBOARD_HEIGHT}" width="${EXPORT_WIDTH}" height="${EXPORT_HEIGHT}" role="img">
  <metadata>WallMobi premium procedural 8K portrait wallpaper, category: ${category}</metadata>
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${bgGradStart}" />
      <stop offset="100%" stop-color="${bgGradEnd}" />
    </linearGradient>
    <linearGradient id="shapeGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color1}" />
      <stop offset="100%" stop-color="${color2}" />
    </linearGradient>
    <linearGradient id="shapeGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${color2}" />
      <stop offset="100%" stop-color="${color3}" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#bf953f" />
      <stop offset="25%" stop-color="#fcf6ba" />
      <stop offset="50%" stop-color="#b38728" />
      <stop offset="75%" stop-color="#fbf5b7" />
      <stop offset="100%" stop-color="#aa771c" />
    </linearGradient>
    <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${color1}" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="${color1}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vignetteGrad" cx="50%" cy="46%" r="74%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.06"/>
      <stop offset="64%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.68"/>
    </radialGradient>
    <linearGradient id="premiumSweep" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="46%" stop-color="#ffffff" stop-opacity="0.16"/>
      <stop offset="54%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <filter id="noiseFilter">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.035 0" />
      <feBlend mode="overlay" in="SourceGraphic" />
    </filter>
    <filter id="blurFilter" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="60" />
    </filter>
    <filter id="glowFilter" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="15" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <pattern id="dotGrid" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="20" cy="20" r="1.5" fill="#ffffff" opacity="0.12" />
    </pattern>
    <pattern id="carbonGrid" width="12" height="12" patternUnits="userSpaceOnUse">
      <line x1="0" y1="12" x2="12" y2="0" stroke="#ffffff" stroke-width="0.8" opacity="0.08" />
      <line x1="0" y1="0" x2="12" y2="12" stroke="#ffffff" stroke-width="0.4" opacity="0.04" />
    </pattern>
    <pattern id="hexGrid" width="56" height="97" patternUnits="userSpaceOnUse">
      <path d="M28 0 L56 16 L56 48 L28 64 L0 48 L0 16 Z M28 97 L56 81 L56 49 L28 33 L0 49 L0 81 Z" fill="none" stroke="#ffffff" stroke-width="0.6" opacity="0.07" />
    </pattern>
    <pattern id="seigaiha" width="60" height="30" patternUnits="userSpaceOnUse">
      <path d="M 0 30 A 30 30 0 0 1 60 30 M 5 30 A 25 25 0 0 1 55 30 M 10 30 A 20 20 0 0 1 50 30 M 15 30 A 15 15 0 0 1 45 30 M 20 30 A 10 10 0 0 1 40 30 M 25 30 A 5 5 0 0 1 35 30" fill="none" stroke="#ffffff" stroke-width="0.6" opacity="0.08" />
    </pattern>
  </defs>

  <!-- Background Base -->
  <rect width="${ARTBOARD_WIDTH}" height="${ARTBOARD_HEIGHT}" fill="url(#bgGrad)" />`;

  // Apply patterns based on category
  if (["cyberpunk", "neon", "gaming"].includes(category)) {
    svg += `\n  <rect width="${ARTBOARD_WIDTH}" height="${ARTBOARD_HEIGHT}" fill="url(#hexGrid)" />`;
  } else if (["black", "amoled", "dark"].includes(category)) {
    svg += `\n  <rect width="${ARTBOARD_WIDTH}" height="${ARTBOARD_HEIGHT}" fill="url(#carbonGrid)" />`;
  } else if (["japanese", "samurai", "oni", "dragon"].includes(category)) {
    svg += `\n  <rect width="${ARTBOARD_WIDTH}" height="${ARTBOARD_HEIGHT}" fill="url(#seigaiha)" />`;
  } else {
    svg += `\n  <rect width="${ARTBOARD_WIDTH}" height="${ARTBOARD_HEIGHT}" fill="url(#dotGrid)" />`;
  }

  // Dynamic content based on categories
  if (category === "anime") {
    const sunY = rng.range(650, 860);
    const sunR = rng.range(210, 270);
    const horizon = rng.range(1390, 1510);

    svg += `
  <!-- Cinematic anime skyline wallpaper -->
  <circle cx="540" cy="${sunY}" r="${sunR + 120}" fill="#fff7cc" opacity="0.18" filter="url(#blurFilter)" />
  <circle cx="540" cy="${sunY}" r="${sunR}" fill="url(#shapeGrad1)" opacity="0.88" />
  <path d="M -80 ${horizon} C 140 ${horizon - 170}, 320 ${horizon + 70}, 540 ${horizon - 130} C 760 ${horizon - 330}, 930 ${horizon + 60}, 1160 ${horizon - 120} L 1160 2420 L -80 2420 Z" fill="#181539" opacity="0.72" />
  <path d="M -80 ${horizon + 175} C 160 ${horizon + 55}, 335 ${horizon + 240}, 560 ${horizon + 95} C 780 ${horizon - 40}, 930 ${horizon + 235}, 1160 ${horizon + 70} L 1160 2420 L -80 2420 Z" fill="#0d1029" opacity="0.92" />`;

    svg += `\n  <g fill="#12142d" opacity="0.96">`;
    for (let b = 0; b < 9; b++) {
      const bw = rng.range(70, 145);
      const bh = rng.range(260, 610);
      const bx = b * 130 - 55 + rng.range(-16, 16);
      const by = horizon + 235 - bh;
      svg += `
    <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="5" />
    <path d="M ${bx - 18} ${by + 12} L ${bx + bw / 2} ${by - rng.range(38, 90)} L ${bx + bw + 18} ${by + 12} Z" />`;
      svg += `<g fill="#ffe9a8" opacity="0.55">`;
      for (let wx = bx + 15; wx < bx + bw - 12; wx += 26) {
        for (let wy = by + 35; wy < by + bh - 42; wy += 48) {
          if (rng.next() > 0.38) {
            svg += `<rect x="${wx}" y="${wy}" width="8" height="15" rx="2" />`;
          }
        }
      }
      svg += `</g>`;
    }
    svg += `\n  </g>`;

    svg += `
  <!-- Railway wires and glowing street reflection -->
  <g stroke="#f8d7ff" stroke-width="3" fill="none" opacity="0.56" filter="url(#glowFilter)">
    <path d="M -60 760 C 240 690, 620 810, 1140 710" />
    <path d="M -60 835 C 240 765, 620 885, 1140 785" />
    <line x1="190" y1="690" x2="190" y2="1680" />
    <line x1="908" y1="730" x2="908" y2="1710" />
  </g>
  <path d="M 230 2060 C 350 1840, 450 1680, 540 1500 C 640 1695, 720 1840, 850 2060 Z" fill="url(#shapeGrad2)" opacity="0.42" filter="url(#glowFilter)" />
  <g fill="#fff8dc" opacity="0.32">`;
    for (let c = 0; c < 8; c++) {
      const cx = rng.range(70, 1020);
      const cy = rng.range(300, 1060);
      const r = rng.range(52, 120);
      svg += `
    <ellipse cx="${cx}" cy="${cy}" rx="${r * 1.75}" ry="${r * 0.42}" transform="rotate(${rng.range(-8, 8)} ${cx} ${cy})" />`;
    }
    svg += `\n  </g>`;

    svg += `\n  <g fill="${color2}" opacity="0.72">`;
    for (let p = 0; p < 42; p++) {
      const px = rng.range(30, 1050);
      const py = rng.range(180, 2220);
      const rx = rng.range(5, 13);
      const ry = rng.range(2.2, 5.5);
      const rot = rng.range(0, 360);
      svg += `
    <ellipse cx="${px}" cy="${py}" rx="${rx}" ry="${ry}" transform="rotate(${rot} ${px} ${py})" />`;
    }
    svg += `\n  </g>`;

  } else if (["aesthetic", "cute"].includes(category)) {
    // 1. Cozy Sun and Clouds
    const sunY = rng.range(700, 1000);
    const sunR = rng.range(180, 240);

    svg += `
  <!-- Massive Sun -->
  <circle cx="540" cy="${sunY}" r="${sunR + 100}" fill="url(#glowGrad)" />
  <circle cx="540" cy="${sunY}" r="${sunR}" fill="url(#shapeGrad1)" />`;

    // 2. Add mountain layers (waves)
    const layersCount = 4;
    for (let l = 0; l < layersCount; l++) {
      const height = 1200 + l * 220 + rng.range(-50, 50);
      const color = l === 0 ? "#0f0b24" : l === 1 ? "url(#shapeGrad2)" : l === 2 ? "#080517" : "#020108";
      const opacity = l === 0 ? 0.6 : l === 1 ? 0.8 : l === 2 ? 0.95 : 1.0;

      const cp1 = rng.range(100, 300);
      const cp2 = rng.range(100, 300);
      const cp3 = rng.range(100, 300);
      const cp4 = rng.range(100, 300);

      svg += `
  <path d="M-100 2400 L-100 ${height} C 200 ${height - cp1}, 400 ${height + cp2}, 600 ${height - cp3} C 800 ${height + cp4}, 1000 ${height - cp2}, 1200 ${height} L 1200 2400 Z" fill="${color}" opacity="${opacity}" />`;
    }

    // 3. Draw stylized Pine Trees on mountain slopes
    svg += `\n  <!-- Pine Tree Silhouettes -->\n  <g fill="#05030f" opacity="0.9">`;
    for (let t = 0; t < 18; t++) {
      const tx = rng.range(50, 1030);
      const ty = 1450 + rng.range(0, 450);
      const th = rng.range(50, 110);
      const tw = th * 0.35;
      svg += `
    <polygon points="${tx},${ty - th} ${tx - tw},${ty} ${tx + tw},${ty}" />
    <polygon points="${tx},${ty - th * 0.85} ${tx - tw * 0.75},${ty - th * 0.25} ${tx + tw * 0.75},${ty - th * 0.25}" />
    <polygon points="${tx},${ty - th * 0.65} ${tx - tw * 0.5},${ty - th * 0.45} ${tx + tw * 0.5},${ty - th * 0.45}" />`;
    }
    svg += `\n  </g>`;

    // 4. Clouds with inner highlights
    for (let c = 0; c < 4; c++) {
      const cx = rng.range(100, 980);
      const cy = rng.range(300, 850);
      const r = rng.range(60, 110);
      svg += `
  <!-- Clouds -->
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffffff" opacity="0.06" />
  <circle cx="${cx + r * 0.6}" cy="${cy}" r="${r * 0.75}" fill="#ffffff" opacity="0.05" />
  <circle cx="${cx - r * 0.6}" cy="${cy}" r="${r * 0.75}" fill="#ffffff" opacity="0.05" />
  <circle cx="${cx}" cy="${cy - 10}" r="${r * 0.9}" fill="#ffffff" opacity="0.03" />`;
    }

    // 5. Blossom Petals (Cute floating elements)
    for (let p = 0; p < 25; p++) {
      const px = rng.range(50, 1030);
      const py = rng.range(200, 2100);
      const rx = rng.range(6, 14);
      const ry = rng.range(3, 7);
      const rot = rng.range(0, 360);
      svg += `
  <ellipse cx="${px}" cy="${py}" rx="${rx}" ry="${ry}" fill="${color2}" opacity="${rng.range(0.3, 0.75)}" transform="rotate(${rot} ${px} ${py})" />`;
    }

  } else if (["cyberpunk", "neon", "gaming"].includes(category)) {
    // Cyberpunk grids & HUDs
    const vanPtY = rng.range(900, 1100);
    svg += `
  <!-- Cyber Vanishing Portal -->
  <circle cx="540" cy="${vanPtY}" r="300" fill="url(#glowGrad)" />
  <circle cx="540" cy="${vanPtY}" r="150" fill="url(#shapeGrad1)" />
  <circle cx="540" cy="${vanPtY}" r="220" fill="none" stroke="${color2}" stroke-width="2.5" stroke-dasharray="10 15" opacity="0.6" />`;

    // 1. Detailed futuristic city skyline at the horizon
    svg += `\n  <!-- Cyberpunk Skyline -->\n  <g fill="#030107" opacity="0.98">`;
    for (let b = 0; b < 10; b++) {
      const bw = rng.range(80, 160);
      const bh = rng.range(400, 750);
      const bx = b * 115 - 40 + rng.range(-20, 20);
      const by = vanPtY - bh + 250;
      svg += `
    <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="4" />`;
      // Windows grids
      svg += `<g fill="${color3}" opacity="0.35">`;
      for (let wx = bx + 12; wx < bx + bw - 12; wx += 22) {
        for (let wy = by + 25; wy < by + bh - 50; wy += 38) {
          if (rng.next() > 0.45) {
            svg += `<rect x="${wx}" y="${wy}" width="6" height="12" rx="1" />`;
          }
        }
      }
      svg += `</g>`;
    }
    svg += `\n  </g>`;

    // 2. Perspective floor lines
    svg += `
  <g stroke="${color2}" stroke-width="1.5" opacity="0.4">`;
    for (let lineX = -400; lineX <= 1480; lineX += 150) {
      svg += `
    <line x1="540" y1="${vanPtY}" x2="${lineX}" y2="2400" />`;
    }
    // Horizontal perspective lines
    for (let hy = vanPtY; hy <= 2400; hy += (2400 - hy) * 0.22 + 12) {
      svg += `
    <line x1="-100" y1="${hy}" x2="1180" y2="${hy}" />`;
    }
    svg += `
  </g>`;

    // 3. Glitch Bars / Speed lines
    for (let sb = 0; sb < 12; sb++) {
      const w = rng.range(120, 450);
      const h = rng.range(4, 18);
      const x = rng.range(50, 1030 - w);
      const y = rng.range(300, 2200);
      svg += `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${rng.pick([color1, color2, color3])}" opacity="${rng.range(0.4, 0.85)}" filter="url(#glowFilter)" rx="2" />`;
    }

    // 4. Tech HUD Concentric details
    svg += `
  <g stroke="${color1}" stroke-width="1" fill="none" opacity="0.5">
    <circle cx="540" cy="${vanPtY}" r="400" stroke-dasharray="4 20" />
    <circle cx="540" cy="${vanPtY}" r="420" stroke-dasharray="40 10 5 10" />
    <path d="M 140 ${vanPtY} L 940 ${vanPtY}" stroke="${color2}" stroke-width="0.8" opacity="0.3" />
  </g>`;

  } else if (["space", "fantasy"].includes(category)) {
    // Nebulas & Celestial bodies
    // 1. Nebulas (huge blurred glowing nodes)
    for (let nb = 0; nb < 4; nb++) {
      const cx = rng.range(150, 930);
      const cy = rng.range(400, 1900);
      const r = rng.range(300, 500);
      const color = nb === 0 ? color1 : nb === 1 ? color2 : color3;
      svg += `
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" opacity="0.22" filter="url(#blurFilter)" />`;
    }

    // 2. Ringed gas giant planet with detailed bands
    const planetX = rng.range(300, 780);
    const planetY = rng.range(800, 1400);
    const planetR = rng.range(110, 160);

    svg += `
  <!-- Ringed Gas Giant -->
  <clipPath id="planetClip_${planetX}_${planetY}">
    <circle cx="${planetX}" cy="${planetY}" r="${planetR}" />
  </clipPath>

  <circle cx="${planetX}" cy="${planetY}" r="${planetR}" fill="url(#shapeGrad1)" />

  <!-- Planet Bands -->
  <g clip-path="url(#planetClip_${planetX}_${planetY})">
    <rect x="${planetX - planetR - 30}" y="${planetY - planetR * 0.7}" width="${planetR * 2.6}" height="25" fill="${color2}" opacity="0.45" transform="rotate(-20 ${planetX} ${planetY})" />
    <rect x="${planetX - planetR - 30}" y="${planetY - planetR * 0.3}" width="${planetR * 2.6}" height="45" fill="${color3}" opacity="0.3" transform="rotate(-20 ${planetX} ${planetY})" />
    <rect x="${planetX - planetR - 30}" y="${planetY + planetR * 0.2}" width="${planetR * 2.6}" height="18" fill="${color2}" opacity="0.5" transform="rotate(-20 ${planetX} ${planetY})" />
    <rect x="${planetX - planetR - 30}" y="${planetY + planetR * 0.5}" width="${planetR * 2.6}" height="28" fill="${color1}" opacity="0.35" transform="rotate(-20 ${planetX} ${planetY})" />
  </g>
  <!-- Inner planet shadow for 3D depth -->
  <circle cx="${planetX}" cy="${planetY}" r="${planetR}" fill="url(#bgGrad)" opacity="0.4" style="mix-blend-mode: multiply;" />

  <!-- Planet Ring -->
  <ellipse cx="${planetX}" cy="${planetY}" rx="${planetR * 2.4}" ry="${planetR * 0.45}" fill="none" stroke="url(#shapeGrad2)" stroke-width="22" transform="rotate(-20 ${planetX} ${planetY})" opacity="0.8" />`;

    // 3. Dense asteroid fields (small scattered polygons)
    svg += `\n  <!-- Asteroid Field -->\n  <g fill="${color3}" opacity="0.6">`;
    for (let ast = 0; ast < 25; ast++) {
      const ax = rng.range(100, 980);
      const ay = rng.range(300, 2000);
      const ar = rng.range(3, 10);
      svg += `
    <polygon points="${ax},${ay - ar} ${ax + ar},${ay - ar * 0.3} ${ax + ar * 0.7},${ay + ar * 0.8} ${ax - ar * 0.5},${ay + ar} ${ax - ar},${ay + ar * 0.2}" fill="${rng.pick([color2, color3, "#8e8e93"])}" />`;
    }
    svg += `\n  </g>`;

    // 4. Magic Alchemy Rune circles for Fantasy
    if (category === "fantasy") {
      const runeX = 540;
      const runeY = 1170;
      svg += `
  <!-- Alchemy Magic Rune Circle -->
  <g stroke="url(#shapeGrad2)" stroke-width="2.2" fill="none" opacity="0.75" filter="url(#glowFilter)">
    <circle cx="${runeX}" cy="${runeY}" r="320" stroke-width="4.5" />
    <circle cx="${runeX}" cy="${runeY}" r="300" stroke-dasharray="10 8" />
    <circle cx="${runeX}" cy="${runeY}" r="220" />
    <circle cx="${runeX}" cy="${runeY}" r="150" stroke-dasharray="12 24" />

    <!-- Outer hexagram -->
    <polygon points="${runeX},${runeY - 300} ${runeX + 259.8},${runeY + 150} ${runeX - 259.8},${runeY + 150}" />
    <polygon points="${runeX},${runeY + 300} ${runeX + 259.8},${runeY - 150} ${runeX - 259.8},${runeY - 150}" />

    <!-- Spokes -->
    <line x1="${runeX}" y1="${runeY - 320}" x2="${runeX}" y2="${runeY + 320}" stroke-width="1.2" />
    <line x1="${runeX - 320}" y1="${runeY}" x2="${runeX + 320}" y2="${runeY}" stroke-width="1.2" />
  </g>`;
    }

    // 5. Constellations / Connected star lines
    const stars: { x: number; y: number }[] = [];
    for (let s = 0; s < 15; s++) {
      stars.push({ x: rng.range(100, 980), y: rng.range(200, 2100) });
    }
    svg += `
  <g stroke="rgba(255, 255, 255, 0.18)" stroke-width="0.8">`;
    for (let i = 0; i < stars.length - 1; i++) {
      if (rng.next() > 0.4) {
        svg += `
    <line x1="${stars[i].x}" y1="${stars[i].y}" x2="${stars[i + 1].x}" y2="${stars[i + 1].y}" />`;
      }
    }
    svg += `
  </g>`;
    for (const star of stars) {
      svg += `
  <circle cx="${star.x}" cy="${star.y}" r="${rng.range(2, 5)}" fill="#ffffff" opacity="${rng.range(0.5, 0.95)}" />`;
    }

  } else if (["luxury"].includes(category)) {
    // Gold borders, elegant marble lines, art-deco geometry
    svg += `
  <!-- Marble abstract luxury veins -->`;
    for (let v = 0; v < 8; v++) {
      let x = rng.range(100, 980);
      let y = 0;
      let pathStr = `M ${x} ${y}`;
      while (y < ARTBOARD_HEIGHT) {
        y += rng.range(80, 200);
        x += rng.range(-60, 60);
        pathStr += ` L ${x} ${y}`;
      }
      svg += `
  <path d="${pathStr}" fill="none" stroke="url(#goldGrad)" stroke-width="${rng.range(1.5, 4.5)}" opacity="${rng.range(0.35, 0.75)}" filter="url(#glowFilter)" />`;
    }

    // Concentric luxury frames / Art Deco diamonds
    const frameW = 880;
    const frameH = 2140;
    svg += `
  <!-- Premium gold frames -->
  <rect x="100" y="100" width="${frameW}" height="${frameH}" fill="none" stroke="url(#goldGrad)" stroke-width="4.5" opacity="0.7" />
  <rect x="120" y="120" width="${frameW - 40}" height="${frameH - 40}" fill="none" stroke="url(#goldGrad)" stroke-width="1.2" opacity="0.45" />

  <!-- Intersecting diamond center details -->
  <polygon points="540,300 840,1170 540,2040 240,1170" fill="none" stroke="url(#goldGrad)" stroke-width="2.5" opacity="0.65" />
  <polygon points="540,350 800,1170 540,1990 280,1170" fill="none" stroke="url(#goldGrad)" stroke-width="1" opacity="0.4" />

  <!-- Corner geometric details -->
  <g stroke="url(#goldGrad)" stroke-width="2.5" fill="none" opacity="0.75">
    <line x1="80" y1="80" x2="220" y2="80" />
    <line x1="80" y1="80" x2="80" y2="220" />
    <line x1="1000" y1="80" x2="860" y2="80" />
    <line x1="1000" y1="80" x2="1000" y2="220" />

    <line x1="80" y1="2260" x2="220" y2="2260" />
    <line x1="80" y1="2260" x2="80" y2="2120" />
    <line x1="1000" y1="2260" x2="860" y2="2260" />
    <line x1="1000" y1="2260" x2="1000" y2="2120" />
  </g>`;

  } else if (["japanese", "samurai", "oni", "dragon", "wolf"].includes(category)) {
    // Red Sun & Sumi-e Mountains, Torii gates, Pagodas
    const sunY = rng.range(600, 900);
    svg += `
  <!-- Japan Crimson Sun -->
  <circle cx="540" cy="${sunY}" r="230" fill="#ff3b30" />
  <circle cx="540" cy="${sunY}" r="275" fill="#ff3b30" opacity="0.18" filter="url(#blurFilter)" />`;

    if (category === "dragon") {
      svg += `
  <!-- Imperial dragon silhouette and ember scales -->
  <g fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 140 1510 C 260 1320, 430 1370, 500 1150 C 570 930, 800 910, 900 690" stroke="#050207" stroke-width="104" opacity="0.92" />
    <path d="M 140 1510 C 260 1320, 430 1370, 500 1150 C 570 930, 800 910, 900 690" stroke="url(#shapeGrad1)" stroke-width="18" opacity="0.88" filter="url(#glowFilter)" />
    <path d="M 835 662 L 925 615 L 902 712 Z" fill="#060207" stroke="${color2}" stroke-width="5" opacity="0.96" filter="url(#glowFilter)" />
  </g>
  <g fill="${color2}" opacity="0.74" filter="url(#glowFilter)">
    <circle cx="824" cy="676" r="8" />
    <path d="M 310 1268 L 366 1198 L 378 1302 Z" />
    <path d="M 454 1172 L 506 1092 L 528 1206 Z" />
    <path d="M 600 995 L 660 930 L 670 1038 Z" />
    <path d="M 744 894 L 798 814 L 812 930 Z" />
  </g>`;
    } else if (category === "wolf") {
      svg += `
  <!-- Alpha wolf moon portrait -->
  <circle cx="540" cy="760" r="310" fill="#dce9ff" opacity="0.08" />
  <g fill="#04050a" opacity="0.96">
    <path d="M 540 795 C 440 855, 350 995, 348 1190 C 350 1465, 452 1625, 540 1740 C 628 1625, 730 1465, 732 1190 C 730 995, 640 855, 540 795 Z" />
    <path d="M 418 918 L 346 760 L 494 846 Z" />
    <path d="M 662 918 L 734 760 L 586 846 Z" />
  </g>
  <g stroke="url(#shapeGrad2)" stroke-width="4" fill="none" opacity="0.62" filter="url(#glowFilter)">
    <path d="M 540 868 C 500 1024, 480 1200, 540 1600 C 600 1200, 580 1024, 540 868 Z" />
    <path d="M 438 1030 C 498 1108, 510 1250, 458 1450" />
    <path d="M 642 1030 C 582 1108, 570 1250, 622 1450" />
    <path d="M 483 1160 L 397 1125 M 597 1160 L 683 1125" />
  </g>`;
    } else if (category === "oni") {
      svg += `
  <!-- Premium oni mask centerpiece -->
  <g transform="translate(540 1190)" filter="url(#glowFilter)">
    <path d="M -250 -145 C -210 -345, 210 -345, 250 -145 C 282 40, 170 278, 0 348 C -170 278, -282 40, -250 -145 Z" fill="#090307" stroke="${color2}" stroke-width="9" />
    <path d="M -188 -252 L -300 -430 L -92 -312 Z" fill="${color1}" opacity="0.9" />
    <path d="M 188 -252 L 300 -430 L 92 -312 Z" fill="${color1}" opacity="0.9" />
    <path d="M -152 -52 C -96 -95, -42 -82, -15 -38 C -78 -24, -122 -18, -188 -33 Z" fill="${color3}" opacity="0.82" />
    <path d="M 152 -52 C 96 -95, 42 -82, 15 -38 C 78 -24, 122 -18, 188 -33 Z" fill="${color3}" opacity="0.82" />
    <path d="M -118 144 C -40 196, 40 196, 118 144" fill="none" stroke="#f7d7a6" stroke-width="12" />
    <path d="M -72 160 L -42 248 M 72 160 L 42 248" stroke="#f7d7a6" stroke-width="9" stroke-linecap="round" />
  </g>`;
    } else if (category === "samurai") {
      svg += `
  <!-- Katana blade and ronin crest -->
  <g transform="rotate(-18 540 1170)" filter="url(#glowFilter)">
    <rect x="514" y="430" width="24" height="1460" rx="12" fill="#f7f2df" opacity="0.9" />
    <rect x="538" y="430" width="8" height="1460" fill="${color2}" opacity="0.7" />
    <rect x="405" y="1780" width="260" height="34" rx="17" fill="url(#goldGrad)" />
    <rect x="508" y="1810" width="54" height="260" rx="20" fill="#090504" stroke="url(#goldGrad)" stroke-width="4" />
  </g>`;
    }

    if (["japanese", "samurai"].includes(category)) {
      // Draw 5-Story Pagoda Silhouette
      svg += `
  <!-- Pagoda Tower Silhouette -->
  <g fill="#0a0604" opacity="0.98">
    <!-- Base block -->
    <rect x="440" y="2120" width="200" height="220" />
    
    <!-- Floor 1 roof -->
    <path d="M 390 2120 C 490 2100, 590 2100, 690 2120 L 670 2095 C 580 2085, 500 2085, 410 2095 Z" />
    <rect x="455" y="2020" width="170" height="80" />
    
    <!-- Floor 2 roof -->
    <path d="M 400 2020 C 490 2000, 590 2000, 680 2020 L 660 1995 C 570 1985, 510 1985, 420 1995 Z" />
    <rect x="465" y="1930" width="150" height="70" />
    
    <!-- Floor 3 roof -->
    <path d="M 410 1930 C 490 1910, 590 1910, 670 1930 L 650 1910 C 570 1900, 510 1900, 430 1910 Z" />
    <rect x="475" y="1850" width="130" height="60" />
    
    <!-- Floor 4 roof -->
    <path d="M 420 1850 C 490 1830, 590 1830, 660 1850 L 640 1830 C 570 1820, 510 1820, 440 1830 Z" />
    <rect x="485" y="1780" width="110" height="50" />
    
    <!-- Floor 5 roof -->
    <path d="M 430 1780 C 490 1760, 590 1760, 650 1780 L 630 1760 C 570 1750, 510 1750, 450 1760 Z" />
    
    <!-- Pagoda Spire -->
    <rect x="536" y="1620" width="8" height="140" />
    <circle cx="540" cy="1620" r="10" />
    <circle cx="540" cy="1645" r="8" />
    <circle cx="540" cy="1670" r="8" />
    <circle cx="540" cy="1695" r="8" />
  </g>`;
    } else {
      // Sumi-e styled brush strokes / Aggressive sharp polygon peaks
      for (let i = 0; i < 5; i++) {
        const height = 1400 + i * 180;
        svg += `
  <polygon points="-100,2400 -100,${height} ${300 + rng.range(-120, 120)},${height - 350} ${700 + rng.range(-120, 120)},${height - 180} 1200,${height - 450} 1200,2400" fill="#06040b" opacity="${0.65 + i * 0.08}" />`;
      }
    }

    // Drifting leaves/clouds
    for (let c = 0; c < 6; c++) {
      const cx = rng.range(100, 980);
      const cy = rng.range(200, 1400);
      svg += `
  <ellipse cx="${cx}" cy="${cy}" rx="${rng.range(70, 180)}" ry="${rng.range(18, 40)}" fill="#ff3b30" opacity="0.065" transform="rotate(-15 ${cx} ${cy})" />`;
    }

  } else if (["black", "amoled", "dark"].includes(category)) {
    // Elegant microchips circuits / Minimal geometric structures for black screens
    if (category === "amoled") {
      // Draw Detailed CPU Microchip circuit
      svg += `
  <!-- Glowing processor chip -->
  <rect x="460" y="1090" width="160" height="160" rx="12" fill="none" stroke="${color2}" stroke-width="4.5" filter="url(#glowFilter)" />
  <rect x="485" y="1115" width="110" height="110" rx="6" fill="url(#shapeGrad1)" opacity="0.85" />
  
  <!-- Circuit tracks extending outwards -->
  <g stroke="${color2}" stroke-width="2.2" fill="none" opacity="0.8" filter="url(#glowFilter)">`;
      for (let tr = 0; tr < 12; tr++) {
        const angle = (tr * 30 * Math.PI) / 180;
        const startX = 540 + Math.cos(angle) * 85;
        const startY = 1170 + Math.sin(angle) * 85;

        const midLength = rng.range(80, 240);
        const midX = startX + Math.cos(angle) * midLength;
        const midY = startY + Math.sin(angle) * midLength;

        const bendAngle = angle + (rng.pick([-45, 45]) * Math.PI) / 180;
        const endLength = rng.range(60, 180);
        const endX = midX + Math.cos(bendAngle) * endLength;
        const endY = midY + Math.sin(bendAngle) * endLength;

        svg += `
    <path d="M ${startX} ${startY} L ${midX} ${midY} L ${endX} ${endY}" />
    <circle cx="${endX}" cy="${endY}" r="4.5" fill="${color3}" stroke="${color2}" stroke-width="1.8" />`;
      }
      svg += `\n  </g>`;
    } else {
      // Overlapping matte geometric card slabs
      for (let p = 0; p < 4; p++) {
        const x1 = rng.range(-100, 400);
        const y1 = rng.range(500, 1500);
        const w = rng.range(600, 900);
        const h = rng.range(300, 600);
        const rot = rng.range(-15, 15);

        svg += `
  <rect x="${x1}" y="${y1}" width="${w}" height="${h}" fill="#08080a" rx="24" stroke="#18181c" stroke-width="3" opacity="0.9" transform="rotate(${rot} ${x1 + w / 2} ${y1 + h / 2})" />
  <!-- Accent micro neon light -->
  <line x1="${x1 + 30}" y1="${y1}" x2="${x1 + w - 30}" y2="${y1}" stroke="${color2}" stroke-width="2.5" opacity="0.6" filter="url(#glowFilter)" transform="rotate(${rot} ${x1 + w / 2} ${y1 + h / 2})" />`;
      }
    }

  } else if (["car", "supercar"].includes(category)) {
    // Futuristic road stretching to infinity with headlight speed trails
    const horizonY = 1200;

    // Grid floor
    svg += `
  <g stroke="rgba(255, 255, 255, 0.08)" stroke-width="1.5">`;
    for (let lineX = -600; lineX <= 1680; lineX += 200) {
      svg += `
    <line x1="540" y1="${horizonY}" x2="${lineX}" y2="2400" />`;
    }
    svg += `
  </g>`;

    // Road track borders
    svg += `
  <polygon points="540,${horizonY} 540,${horizonY} -200,2400 1280,2400" fill="none" stroke="${color1}" stroke-width="6.5" opacity="0.65" filter="url(#glowFilter)" />
  <line x1="540" y1="${horizonY}" x2="540" y2="2400" stroke="${color2}" stroke-width="3.5" stroke-dasharray="25 35" opacity="0.55" />`;

    const carY = category === "supercar" ? 1510 : 1600;
    const bodyFill = category === "supercar" ? "#050506" : "#07090d";
    svg += `
  <!-- Category-accurate performance car silhouette -->
  <g transform="translate(0 ${carY})" filter="url(#glowFilter)">
    <path d="M 150 272 C 246 124, 366 82, 542 84 C 710 86, 842 126, 932 270 C 800 298, 642 312, 540 312 C 396 312, 270 296, 150 272 Z" fill="${bodyFill}" stroke="${color2}" stroke-width="5.5" opacity="0.96" />
    <path d="M 320 145 C 396 72, 660 72, 748 145 C 660 166, 434 166, 320 145 Z" fill="url(#shapeGrad1)" opacity="0.46" />
    <ellipse cx="304" cy="304" rx="80" ry="44" fill="#010103" stroke="${color1}" stroke-width="5" />
    <ellipse cx="772" cy="304" rx="80" ry="44" fill="#010103" stroke="${color1}" stroke-width="5" />
    <path d="M 164 248 C 250 230, 322 228, 390 240" stroke="#ffffff" stroke-width="10" opacity="0.72" />
    <path d="M 684 240 C 760 228, 836 230, 928 248" stroke="${color2}" stroke-width="12" opacity="0.82" />
  </g>`;

    // Speed trails (glowing red and white trails)
    for (let t = 0; t < 15; t++) {
      const trailY = rng.range(horizonY + 50, 2300);
      const ratio = (trailY - horizonY) / (2300 - horizonY);
      const width = rng.range(120, 650) * ratio;
      const x = 540 - width / 2 + rng.range(-180, 180) * ratio;
      const height = rng.range(2.5, 9);
      const color = rng.pick([color1, color2, "#ffffff"]);

      svg += `
  <rect x="${x}" y="${trailY}" width="${width}" height="${height}" fill="${color}" opacity="${rng.range(0.45, 0.85)}" filter="url(#glowFilter)" rx="2" />`;
    }

  } else if (category === "nature") {
    // Detailed botanical leaves overlay
    svg += `\n  <!-- Detailed Leaf Stems -->`;
    for (let s = 0; s < 4; s++) {
      const stemX = rng.range(150, 930);
      const stemY = rng.range(800, 1500);
      const length = rng.range(450, 750);
      const rot = rng.range(-30, 30);

      svg += `
  <g transform="translate(${stemX}, ${stemY}) rotate(${rot})" stroke="${color1}" stroke-width="3" fill="none" opacity="0.7">
    <!-- Main stem -->
    <path d="M 0 0 C 50 -100, 20 -300, 50 -${length}" />`;

      // Leaflets along the stem
      for (let lf = 60; lf < length - 50; lf += 70) {
        svg += `
    <path d="M ${0.05 * lf} -${lf} C -45 -${lf + 35}, -65 -${lf + 12}, -85 -${lf + 45} C -55 -${lf + 65}, -25 -${lf + 45}, ${0.05 * lf} -${lf}" fill="url(#shapeGrad2)" stroke="none" />
    <path d="M ${0.05 * lf} -${lf} C 45 -${lf + 35}, 65 -${lf + 12}, 85 -${lf + 45} C 55 -${lf + 65}, 25 -${lf + 45}, ${0.05 * lf} -${lf}" fill="url(#shapeGrad2)" stroke="none" />`;
      }
      svg += `\n  </g>`;
    }

  } else {
    // Default / Organic / Nature / Dragon / Wolf
    // Abstract flowing node ribbon curves
    for (let rb = 0; rb < 5; rb++) {
      const color = rb % 2 === 0 ? "url(#shapeGrad1)" : "url(#shapeGrad2)";
      const width = rng.range(35, 90);
      const op = rng.range(0.35, 0.7);

      const x1 = rng.range(-100, 300);
      const y1 = rng.range(300, 600);

      const cx1 = rng.range(200, 800);
      const cy1 = rng.range(500, 900);
      const cx2 = rng.range(200, 800);
      const cy2 = rng.range(1200, 1600);

      const x2 = rng.range(700, 1180);
      const y2 = rng.range(1700, 2100);

      svg += `
  <path d="M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" opacity="${op}" filter="url(#glowFilter)" />`;
    }
  }

  // Twinkling stars / Premium night sparkles
  svg += `
  <!-- Sparkles -->`;
  for (let sp = 0; sp < 30; sp++) {
    const sx = rng.range(50, 1030);
    const sy = rng.range(50, 2290);
    const sr = rng.range(1.5, 5);
    svg += `
  <circle cx="${sx}" cy="${sy}" r="${sr}" fill="#ffffff" opacity="${rng.range(0.2, 0.8)}" />`;
  }

  // Grain / Noise Overlay
  svg += `
  <!-- Professional finishing overlays -->
  <rect width="${ARTBOARD_WIDTH}" height="${ARTBOARD_HEIGHT}" fill="url(#premiumSweep)" opacity="0.18" style="mix-blend-mode: screen;" />
  <rect width="${ARTBOARD_WIDTH}" height="${ARTBOARD_HEIGHT}" fill="url(#vignetteGrad)" style="mix-blend-mode: multiply;" />
  <!-- Texture Noise -->
  <rect width="${ARTBOARD_WIDTH}" height="${ARTBOARD_HEIGHT}" filter="url(#noiseFilter)" style="mix-blend-mode: overlay;" />
</svg>`;

  return svg;
}

// Generates N random wallpapers and writes them to disk
export async function generateWallpapers(
  connection: any,
  categorySlug: string,
  count: number
): Promise<{ success: boolean; createdCount: number }> {
  const dir = path.join(process.cwd(), "public", "wallpapers", "generated");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const categorySwatches = CATEGORY_COLORS[categorySlug] || ["#ffffff", "#aaaaaa", "#333333"];
  const categoryThemes = THEMES[categorySlug] || [{ en: "Minimal Abstract Art", th: "ศิลปะนามธรรมมินิมอล" }];

  let createdCount = 0;

  for (let i = 0; i < count; i++) {
    // 1. Pick metadata values
    const device = DEVICES[Math.floor(Math.random() * DEVICES.length)];
    const theme = categoryThemes[Math.floor(Math.random() * categoryThemes.length)];
    
    const randomHex = crypto.randomBytes(3).toString("hex");
    const slug = `${categorySlug}-wallpaper-${device.keyword}-${randomHex}`;

    // Colors
    const color1 = categorySwatches[Math.floor(Math.random() * categorySwatches.length)];
    let color2 = categorySwatches[Math.floor(Math.random() * categorySwatches.length)];
    let color3 = categorySwatches[Math.floor(Math.random() * categorySwatches.length)];
    if (color2 === color1) color2 = categorySwatches[(categorySwatches.indexOf(color1) + 1) % categorySwatches.length];
    if (color3 === color2) color3 = categorySwatches[(categorySwatches.indexOf(color2) + 1) % categorySwatches.length];

    // Generate physical SVG file
    const svgContent = generateSvgContent(categorySlug, color1, color2, color3);
    const filename = `${slug}.svg`;
    const filePath = path.join(dir, filename);
    fs.writeFileSync(filePath, svgContent, "utf8");

    // File source
    const src = `/wallpapers/generated/${filename}`;

    // 2. Compute SEO Titles & Descriptions
    const title = LOCALIZED_SEO_TEMPLATES.en.title
      .replace("{theme}", theme.en)
      .replace("{device}", device.name);

    const descriptions: Record<string, string> = {};
    for (const [locale, template] of Object.entries(LOCALIZED_SEO_TEMPLATES)) {
      const themeText = theme[locale as keyof typeof theme] || theme.en;
      descriptions[locale] = template.desc
        .replace("{theme}", themeText)
        .replace("{device}", device.name);
    }

    // 3. Define tags
    const tags = [
      categorySlug,
      "wallpaper",
      "amoled",
      device.keyword.replace(/-/g, " "),
      "8k",
      "premium",
      "lock screen",
      theme.en.toLowerCase().split(" ").slice(-1)[0],
    ].filter(Boolean);

    // 4. Save to Database
    const width = EXPORT_WIDTH;
    const height = EXPORT_HEIGHT;
    const pubDate = new Date().toISOString().split("T")[0];

    const [wpResult] = await connection.query(
      `INSERT INTO wallpapers (slug, category_slug, color, src, width, height, published_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [slug, categorySlug, color1, src, width, height, pubDate]
    );
    const wpId = wpResult.insertId;

    // Insert Translations
    const locales = ["en", "th", "my", "lo", "km", "vi"];
    for (const loc of locales) {
      const descText = descriptions[loc] || descriptions.en;
      const titleText = LOCALIZED_SEO_TEMPLATES[loc].title
        .replace("{theme}", theme[loc as keyof typeof theme] || theme.en)
        .replace("{device}", device.name);
      
      await connection.query(
        `INSERT INTO wallpaper_translations (wallpaper_id, locale, title, description) VALUES (?, ?, ?, ?)`,
        [wpId, loc, titleText, descText]
      );
    }

    // Insert Tags
    for (const tag of tags) {
      await connection.query(
        `INSERT IGNORE INTO wallpaper_tags (wallpaper_id, tag) VALUES (?, ?)`,
        [wpId, tag]
      );
    }

    createdCount++;
  }

  return { success: true, createdCount };
}
