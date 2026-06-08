const fs = require("fs");
const path = require("path");
const https = require("https");

const WALLPAPERS_FILE = path.join(__dirname, "../src/lib/wallpapers.ts");
const OUTPUT_DIR = path.join(__dirname, "../public/wallpapers");

const newWallpapers = [
  // space (needs 6 more to reach 10)
  {
    slug: "nebula-heart", title: "Nebula Heart", category: "space", color: "#b630a8",
    url: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=1080&auto=format&fit=crop&q=80",
    tags: ["space", "nebula", "pink"], downloads: 12450, published: "2026-05-10",
    desc: {
      en: "A vibrant cosmic nebula heart burning in the center of deep space.",
      th: "เนบิวลารูปหัวใจสีชมพูประกายเจิดจรัสใจกลางอวกาศลึก",
      vi: "Một tinh vân trái tim rực rỡ bùng cháy giữa không gian sâu thẳm.",
      my: "အာကာသနက်ထဲတွင် တောက်ပနေသော နှလုံးသားပုံသဏ္ဌာန် နက်ဗျူလာ။",
      lo: "ເນບິວລາຮູບຫົວໃຈສີຊົມພູປະກາຍຢູ່ໃຈກາງອະວະກາດເລິກ.",
      km: "ណេប៊ុឡារូបបេះដូងដ៏រស់រវើកឆេះនៅកណ្តាលលំហជ្រៅ។"
    }
  },
  {
    slug: "cosmic-gateway", title: "Cosmic Gateway", category: "space", color: "#5856d6",
    url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1080&auto=format&fit=crop&q=80",
    tags: ["space", "portal", "galaxy"], downloads: 15300, published: "2026-05-08",
    desc: {
      en: "Swirling dust lanes and distant galaxies creating a portal to another universe.",
      th: "เกลียวฝุ่นจักรวาลและดาราจักรอันไกลโพ้นประดุจประตูมิติสู่ต่างจักรวาล",
      vi: "Làn bụi xoáy và các thiên hà xa xôi tạo lối đi sang vũ trụ khác.",
      my: "အခြားစကြာဝဠာသို့ တံခါးပေါက်သဖွယ်ဖြစ်နေသော လှည့်ပတ်နေသည့် အမှုန်များ။",
      lo: "ກ້ຽວຝຸ່ນຈັກກະວານ ແລະ ດາລາຈັກອັນແສນໄກປະດຸດດັ່ງປະຕູມິຕິ.",
      km: "គន្លងធូលីនិងកាឡាក់ស៊ីឆ្ងាយបង្កើតច្រកផ្លូវទៅកាន់សកលលោកផ្សេង។"
    }
  },
  {
    slug: "stardust-river", title: "Stardust River", category: "space", color: "#1b6ca8",
    url: "https://images.unsplash.com/photo-1538370965046-79c0d6907d47?w=1080&auto=format&fit=crop&q=80",
    tags: ["space", "milkyway", "stars"], downloads: 17400, published: "2026-05-05",
    desc: {
      en: "The glowing Milky Way stretching like a river of stardust across the dark sky.",
      th: "ทางช้างเผือกทอประกายพาดผ่านผืนฟ้าราวกับแม่น้ำแห่งละอองดาว",
      vi: "Dải Ngân hà phát sáng trải dài như dòng sông bụi sao trên trời đêm.",
      my: "မှောင်မိုက်သော ကောင်းကင်တွင် ဖုန်မှုန့်မြစ်ကဲ့သို့ ဆန့်တန်းနေသော နဂါးငွေ့တန်း။",
      lo: "ທາງຊ້າງເຜືອກທໍປະກາຍພາດຜ່ານທ້ອງຟ້າຄືກັບແມ່ນ້ຳແຫ່ງດວງດາວ.",
      km: "ផ្លូវដំរីសរភ្លឺចែងចាំងលាតសន្ធឹងដូចទន្លេធូលីផ្កាយឆ្លងកាត់មេឃងងឹត។"
    }
  },
  {
    slug: "andromeda-spiral", title: "Andromeda Spiral", category: "space", color: "#2d6bff",
    url: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=1080&auto=format&fit=crop&q=80",
    tags: ["space", "spiral", "violet"], downloads: 19800, published: "2026-05-02",
    desc: {
      en: "The magnificent Andromeda spiral galaxy spinning in endless darkness.",
      th: "ดาราจักรชนิดก้นหอยแอนดရอมิดาอันงดงามหมุนวนในความมืดที่ไร้สิ้นสุด",
      vi: "Thiên hà xoắn ốc Andromeda tráng lệ quay trong bóng tối vô tận.",
      my: "အဆုံးမရှိသော အမှောင်ထုထဲတွင် လည်ပတ်နေသော အင်ဒရိုမီဒါ ဂလက်ဆီ။",
      lo: "ດາລາຈັກກົ້ນຫອຍແອນໂດຣເມດາອັນງົດງາມໝູນວົນໃນຄວາມມືດ.",
      km: "កាឡាក់ស៊ីរាងវង់ Andromeda ដ៏អស្ចារ្យវិលក្នុងភាពងងឹតគ្មានទីបញ្ចប់។"
    }
  },
  {
    slug: "stellar-nursery", title: "Stellar Nursery", category: "space", color: "#00f6ff",
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1080&auto=format&fit=crop&q=80",
    tags: ["space", "stars", "nebula"], downloads: 11200, published: "2026-04-28",
    desc: {
      en: "A dense cosmic nebula gas cloud where brand new stars are being born.",
      th: "กลุ่มก๊าซเนบิวลาหนาแน่น แหล่งกำเนิดของหมู่ดาวฤกษ์ดวงใหม่ในห้วงลึก",
      vi: "Đám mây bụi tinh vân dày đặc nơi những ngôi sao mới đang hình thành.",
      my: "ကြယ်သစ်များ မွေးဖွားရာ သိပ်သည်းသော နက်ဗျူလာ ဓာတ်ငွေ့တိမ်တိုက်။",
      lo: "ກຸ່ມກ໊າສເນບິວລາໜາແໜ້ນ ແຫຼ່ງກຳເນີດຂອງດວງດາວໃໝ່.",
      km: "ពពកឧស្ម័នណេប៊ុឡាដ៏ក្រាស់ ដែលផ្កាយថ្មីៗកំពុងត្រូវបានបង្កើតឡើង។"
    }
  },
  {
    slug: "cosmic-sea", title: "Cosmic Sea", category: "space", color: "#54f0ff",
    url: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=1080&auto=format&fit=crop&q=80",
    tags: ["space", "nebula", "violet"], downloads: 14590, published: "2026-04-25",
    desc: {
      en: "An abstract ocean of deep purple nebula gases drifting in dark space.",
      th: "มหาสมุทรแห่งกลุ่มก๊าซเนบิวลาสีม่วงเข้ม ลอยละล่องในความมืดมิด",
      vi: "Đại dương khí tinh vân màu tím đậm trôi dạt trong không gian.",
      my: "အမှောင်ထုထဲတွင် လွင့်မျောနေသော ခရမ်းရောင် နက်ဗျူလာဓာတ်ငွေ့ သမုဒ္ဒရာ။",
      lo: "ມະຫາສະໝຸດແຫ່ງກຸ່ມກ໊າສເນບິວລາສີມ່ວງເຂັ້ມ ລອຍຢູ່ກາງອະວະກາດ.",
      km: "មហាសមុទ្រឧស្ម័នណេប៊ុឡាពណ៌ស្វាយជ្រៅដែលអណ្តែតក្នុងលំហងងឹត។"
    }
  },

  // anime (needs 7 more to reach 10)
  {
    slug: "ghibli-meadow", title: "Ghibli Meadow", category: "anime", color: "#5fb03d",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1080&auto=format&fit=crop&q=80",
    tags: ["anime", "green", "landscape"], downloads: 13900, published: "2026-05-11",
    desc: {
      en: "A beautiful sunny meadow with lush green grass swaying under soft clouds.",
      th: "ทุ่งหญ้าเขียวขจีอาบแสงแดดอุ่น พลิ้วไหวใต้ปุยเมฆนุ่มสไตล์อนิเมะ",
      vi: "Đồng cỏ xanh tươi đầy nắng lay nhẹ dưới những đám mây mềm mại.",
      my: "နူးညံ့သော တိမ်တိုက်များအောက်တွင် စိမ်းလန်းသော မြက်ခင်းပြင်။",
      lo: "ທົ່ງຫຍ້າຂຽວຂະຈີອາບແສງແດດອຸ່ນ ພິ້ວໄຫວໃຕ້ປຸຍເມກນຸ່ມ.",
      km: "វាលស្មៅពណ៌បៃតងដ៏ស្រស់ស្អាតមានពន្លឺថ្ងៃយោលទៅមកក្រោមពពកទន់ៗ។"
    }
  },
  {
    slug: "cherry-railway", title: "Cherry Railway", category: "anime", color: "#d86b8f",
    url: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=1080&auto=format&fit=crop&q=80",
    tags: ["anime", "pink", "japan"], downloads: 21900, published: "2026-05-09",
    desc: {
      en: "Nostalgic train tracks framed by falling pink cherry blossoms.",
      th: "รางรถไฟย้อนวันวาน โอบล้อมด้วยซากุระสีชมพูร่วงหล่นอย่างอ่อนโยน",
      vi: "Đường ray tàu hỏa hoài niệm được bao quanh bởi hoa anh đào rơi.",
      my: "ပန်းရောင် ချယ်ရီပန်းများ ကြွေကျနေသော ရထားလမ်း။",
      lo: "ຮາງລົດໄຟຍ້ອນວັນວານ ອ້ອມຮອບດ້ວຍຊາກຸຣະສີຊົມພູຫຼົ່ນ.",
      km: "ផ្លូវរថភ្លើងដ៏គួរឱ្យនឹកនា ហ៊ុមព័ទ្ធដោយផ្កាសាគូរ៉ាពណ៌ផ្កាឈូកធ្លាក់ចុះ។"
    }
  },
  {
    slug: "mountain-shrine", title: "Mountain Shrine", category: "anime", color: "#bb8a44",
    url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1080&auto=format&fit=crop&q=80",
    tags: ["anime", "temple", "autumn"], downloads: 12100, published: "2026-05-06",
    desc: {
      en: "A quiet traditional mountain shrine surrounded by warm autumn leaves.",
      th: "ศาลเจ้าโบราณอันเงียบสงบบนภูเขา ล้อมรอบด้วยใบไม้เปลี่ยนสีโทนอุ่น",
      vi: "Ngôi đền núi truyền thống tĩnh lặng bao quanh bởi lá thu vàng ấm.",
      my: "နွေးထွေးသော ဆောင်းဦးရွက်များ ဝိုင်းရံထားသော တိတ်ဆိတ်သည့် တောင်ပေါ်ဘုရားကျောင်း။",
      lo: "ສານເຈົ້າບູຮານອັນສະຫງົບເທິງພູ ອ້ອມຮອບດ້ວຍໃບໄມ້ປ່ຽນສີ.",
      km: "វិហារភ្នំបែបប្រពៃណីដ៏ស្ងប់ស្ងាត់ ហ៊ុមព័ទ្ធដោយស្លឹកឈើជ្រុះពណ៌លឿង។"
    }
  },
  {
    slug: "summer-clouds", title: "Summer Clouds", category: "anime", color: "#54f0ff",
    url: "https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?w=1080&auto=format&fit=crop&q=80",
    tags: ["anime", "sky", "blue"], downloads: 18600, published: "2026-05-01",
    desc: {
      en: "Giant white cumulus clouds towering in a brilliant blue summer sky.",
      th: "เมฆคิวมูลัสก้อนใหญ่ตระหง่านฟ้า ในวันฤดูร้อนที่แสนสดใส",
      vi: "Đám mây tích trắng khổng lồ vươn cao trên bầu trời mùa hè xanh biếc.",
      my: "ပြာလွင်သော နွေရာသီကောင်းကင်တွင် မြင့်မားနေသော ဧရာမ တိမ်တိုက်ဖြူများ။",
      lo: "ເມກກ້ອນໃຫຍ່ສະຫງ່າເທິງທ້ອງຟ້າ ໃນວັນລະດູຮ້ອນອັນສົດໃສ.",
      km: "ពពកពណ៌សដ៏ធំលាតសន្ធឹងនៅលើមេឃរដូវក្តៅពណ៌ខៀវស្រងាត់។"
    }
  },
  {
    slug: "fuji-sunset", title: "Fuji Sunset", category: "anime", color: "#ff9500",
    url: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=1080&auto=format&fit=crop&q=80",
    tags: ["anime", "sunset", "mountain"], downloads: 15430, published: "2026-04-29",
    desc: {
      en: "Mount Fuji silhouette against a vibrant golden orange sunset sky.",
      th: "เงารูปภูเขาไฟฟูจิโดดเด่นตัดกับท้องฟ้าพระอาทิตย์ตกสีส้มทองประกาย",
      vi: "Hình bóng núi Phú Sĩ nổi bật trên nền trời hoàng hôn cam vàng rực rỡ.",
      my: "တောက်ပသော ရွှေဝါရောင် နေဝင်ချိန်တွင် မြင်ရသည့် ဖူဂျီတောင် အရိပ်။",
      lo: "ເງົາພູເຂົາໄຟຟູຈິຕັດກັບທ້ອງຟ້າຕາເວັນຕົກສີສົ້ມທອງ.",
      km: "រូបភាពស្រមោលភ្នំហ្វូជីទល់នឹងមេឃថ្ងៃលិចពណ៌មាសក្រហម។"
    }
  },
  {
    slug: "cozy-rain", title: "Cozy Rain", category: "anime", color: "#1c1c1e",
    url: "https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?w=1080&auto=format&fit=crop&q=80",
    tags: ["anime", "rain", "cozy"], downloads: 11980, published: "2026-04-24",
    desc: {
      en: "Raindrops sliding on window glass with soft out-of-focus city lights behind.",
      th: "หยาดฝนเกาะกระจกหน้าต่างเบื้องหน้าแสงไฟเมืองที่เบลอนุ่มนวลชวนฝัน",
      vi: "Những giọt mưa trượt trên cửa kính với ánh đèn thành phố mờ ảo phía sau.",
      my: "မြို့ပြမီးရောင်များနောက်ခံတွင် ပြတင်းပေါက်မှန်ပေါ်ရှိ မိုးစက်မိုးပေါက်များ။",
      lo: "ຢາດຝົນເກາະແກ້ວປ່ອງຢ້ຽມ ຕໍ່ໜ້າແສງໄຟເມືອງອັນອົບອຸ່ນ.",
      km: "ដំណក់ទឹកភ្លៀងរមៀលលើកញ្ចក់បង្អួច ដោយមានពន្លឺទីក្រុងព្រាលៗនៅពីក្រោយ។"
    }
  },
  {
    slug: "dreamy-forest", title: "Dreamy Forest", category: "anime", color: "#5fb03d",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1080&auto=format&fit=crop&q=80",
    tags: ["anime", "green", "forest"], downloads: 14210, published: "2026-04-21",
    desc: {
      en: "Beautiful sunbeams piercing through green canopy into a quiet ancient woods.",
      th: "ลำแสงอาทิตย์ส่องสลัวผ่านยอดไม้สูงลงสู่พื้นป่าโบราณอันเงียบสงบ",
      vi: "Tia nắng tuyệt đẹp chiếu xuyên qua tán lá xanh vào khu rừng cổ thụ tĩnh lặng.",
      my: "တိတ်ဆိတ်သော တောအုပ်ထဲသို့ သစ်ပင်များကြားမှ ဖြတ်သန်းလာသော နေရောင်ခြည်။",
      lo: "ແສງຕາເວັນສ່ອງຜ່ານຍອດໄມ້ສູງລົງສູ່ພື້ນປ່າບູຮານ.",
      km: "ពន្លឺព្រះអាទិត្យដ៏ស្រស់ស្អាតចាក់ទម្លុះតាមដំបូលបៃតងចូលទៅក្នុងព្រៃស្ងាត់។"
    }
  },

  // cyberpunk (needs 7 more to reach 10)
  {
    slug: "neon-tokyo", title: "Neon Tokyo", category: "cyberpunk", color: "#ff2d55",
    url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1080&auto=format&fit=crop&q=80",
    tags: ["cyberpunk", "tokyo", "neon"], downloads: 28400, published: "2026-05-12",
    desc: {
      en: "Tokyo streets flooded with towering neon billboards and holographic signs.",
      th: "ถนนเมืองโตเกียวท่วมท้นด้วยป้ายไฟนีออนยักษ์และป้ายโฮโลแกรมล้ำยุค",
      vi: "Đường phố Tokyo ngập tràn bảng hiệu neon cao chọc trời và bảng hiệu hologram.",
      my: "နီယွန်ဆိုင်းဘုတ်များနှင့် ဟိုလိုဂရမ်များဖြင့် ပြည့်နှက်နေသော တိုကျိုလမ်းမများ။",
      lo: "ຖະໜົນເມືອງໂຕກຽວທ້ວມທົ້ນດ້ວຍປ້າຍໄຟນີອອນຍັກ ແລະ ໂຮໂລແກຣມ.",
      km: "ផ្លូវតូក្យូដែលពោរពេញទៅដោយផ្ទាំងប៉ាណូណេអុងខ្ពស់ និងផ្លាកហូឡូក្រាម។"
    }
  },
  {
    slug: "cyber-alley", title: "Cyber Alley", category: "cyberpunk", color: "#7b4bd6",
    url: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?w=1080&auto=format&fit=crop&q=80",
    tags: ["cyberpunk", "neon", "rain"], downloads: 22100, published: "2026-05-07",
    desc: {
      en: "A narrow rainy back alley lit by electric pink and deep purple neon tubes.",
      th: "ตรอกซอยแคบเปียกฝน สว่างไสวด้วยหลอดไฟนีออนสีชมพูและม่วงเข้มสะท้อนเงา",
      vi: "Hẻm nhỏ mưa ướt được chiếu sáng bởi đèn ống neon màu hồng và tím đậm.",
      my: "ပန်းရောင်နှင့် ခရမ်းရောင် နီယွန်မီးများ လင်းထိန်နေသော ကျဉ်းမြောင်းသည့် မိုးရွာသော လမ်းကြား။",
      lo: "ຊອຍແຄບປຽກຝົນ ສະຫວ່າງດ້ວຍຫຼອດໄຟນີອອນສີຊົມພູ ແລະ ສີມ່ວງ.",
      km: "ផ្លូវលំតូចចង្អៀតមានភ្លៀងធ្លាក់បំភ្លឺដោយបំពង់ណេអុងពណ៌ផ្កាឈូកនិងស្វាយ។"
    }
  },
  {
    slug: "synthwave-drive", title: "Synthwave Drive", category: "cyberpunk", color: "#5856d6",
    url: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=1080&auto=format&fit=crop&q=80",
    tags: ["cyberpunk", "synthwave", "blue"], downloads: 16900, published: "2026-05-04",
    desc: {
      en: "A retro-futuristic synthwave horizon outline of a virtual grid city skyline.",
      th: "ขอบฟ้าเรโทรล้ำยุคแสดงเงาตึกสูงของเมืองในโครงข่ายตารางดิจิทัล",
      vi: "Đường chân trời synthwave retro phác họa thành phố mạng ảo.",
      my: "ဒစ်ဂျစ်တယ်မြို့ပြ ကောင်းကင်ယံနောက်ခံတွင် ရိုးရှင်းသော အနာဂတ်ပုံရိပ်။",
      lo: "ຂອບຟ້າເຣໂທຣລ້ຳສະໄໝສະແດງເງົາຕຶກສູງຂອງເມືອງດິຈິຕໍ.",
      km: "គ្រោងមេឃទីក្រុងបែបសិប្បនិម្មិត Synthwave បែបបុរាណ-អនាគត។"
    }
  },
  {
    slug: "neon-motorcycle", title: "Neon Motorcycle", category: "cyberpunk", color: "#ff2d55",
    url: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1080&auto=format&fit=crop&q=80",
    tags: ["cyberpunk", "bike", "neon"], downloads: 25400, published: "2026-04-30",
    desc: {
      en: "A sleek high-tech motorcycle parked in a neon-lit futuristic garage.",
      th: "มอเตอร์ไซค์เทคโนโลยีสูงดีไซน์เฉียบ จอดในอู่รถยนต์เรืองแสงไฟนีออน",
      vi: "Xe máy công nghệ cao đỗ trong gara tương lai ngập tràn ánh sáng neon.",
      my: "နီယွန်မီးများလင်းနေသော အနာဂတ်ဂိုဒေါင်တွင် ရပ်ထားသည့် ဆိုင်ကယ်။",
      lo: "ມໍເຕີໄຊເຕັກໂນໂລຊີສູງ ຈອດຢູ່ໃນອູ່ລົດເຮືອງແສງໄຟນີອອນ.",
      km: "ម៉ូតូបច្ចេកវិទ្យាខ្ពស់ដ៏ប្រណីតចតនៅក្នុងយានដ្ឋានអនាគតបំភ្លឺដោយណេអុង។"
    }
  },
  {
    slug: "megacity-spire", title: "Megacity Spire", category: "cyberpunk", color: "#1c1c1e",
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1080&auto=format&fit=crop&q=80",
    tags: ["cyberpunk", "city", "tall"], downloads: 14320, published: "2026-04-27",
    desc: {
      en: "Massive dark corporate skyscrapers towering above the low-level neon sprawl.",
      th: "ตึกระฟ้าขององค์กรยักษ์ใหญ่สีทึม ตระหง่านเหนือย่านชุมชนนีออนเบื้องล่าง",
      vi: "Các tòa nhà chọc trời tập đoàn khổng lồ vươn cao trên khu phố neon bên dưới.",
      my: "အောက်ခြေနီယွန်ရပ်ကွက်များအထက်တွင် မြင့်မားနေသော ကော်ပိုရေးရှင်း တိုက်ကြီးများ။",
      lo: "ຕຶກລະຟ້າຂອງອົງກອນຍັກໃຫຍ່ ຕັ້ງສະຫງ່າເໜືອຊຸມຊົນນີອອນເບື້ອງລຸ່ມ.",
      km: "អគារខ្ពស់ៗសាជីវកម្មងងឹតដ៏ធំស្កឹមស្កៃខ្ពស់ជាងតំបន់ណេអុងខាងក្រោម។"
    }
  },
  {
    slug: "cyber-bars", title: "Cyber Bars", category: "cyberpunk", color: "#8e8e93",
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1080&auto=format&fit=crop&q=80",
    tags: ["cyberpunk", "tech", "abstract"], downloads: 19820, published: "2026-04-23",
    desc: {
      en: "Macro close-up of glowing green fiber circuits inside a computer core.",
      th: "ภาพโคลสอัพลายวงจรไฟเบอร์ออปติกสีเขียวเรืองแสงในแกนประมวลผลคอมพิวเตอร์",
      vi: "Cận cảnh các mạch sợi quang phát sáng xanh lá bên trong lõi máy tính.",
      my: "ကွန်ပျူတာဗဟိုချက်အတွင်းရှိ တောက်ပနေသော အစိမ်းရောင် ပတ်လမ်းများ။",
      lo: "ພາບໂຄລສ໌ອັບລາຍວົງຈອນໄຟຟ້າສີຂຽວເຮືອງແສງໃນຄອມພິວເຕີ.",
      km: "រូបភាពម៉ាក្រូខិតជិតនៃសៀគ្វីសរសៃកញ្ចក់ភ្លឺពណ៌បៃតងនៅក្នុងស្នូលកុំព្យូទ័រ။"
    }
  },
  {
    slug: "glitch-city", title: "Glitch City", category: "cyberpunk", color: "#7b4bd6",
    url: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1080&auto=format&fit=crop&q=80",
    tags: ["cyberpunk", "glitch", "purple"], downloads: 13210, published: "2026-04-20",
    desc: {
      en: "An abstract error glitch pattern combining digital noise with violet hues.",
      th: "ลายศิลปะดิจิทัลกลิตช์ประดิษฐ์ ผสานคลื่นรบกวนสัญญาณและแสงสีม่วง",
      vi: "Mẫu nhiễu sóng kỹ thuật số trừu tượng kết hợp với tông màu tím.",
      my: "ဒစ်ဂျစ်တယ် အမှားအယွင်းများဖြင့် ပေါင်းစပ်ထားသော ခရမ်းရောင် နောက်ခံပုံ။",
      lo: "ລາຍສິລະປະດິຈິຕໍກລິດຊ໌ ຜະສານຄື້ນລົບກວນ ແລະ ແສງສີມ່ວງ.",
      km: "លំនាំកំហុសឌីជីថល (Glitch) បែបអរូបីរួមបញ្ចូលគ្នានូវសំឡេងឌីជីថលជាមួយពណ៌ស្វាយ។"
    }
  },

  // robot (needs 8 more to reach 10)
  {
    slug: "android-portrait", title: "Android Portrait", category: "robot", color: "#ff2d55",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1080&auto=format&fit=crop&q=80",
    tags: ["robot", "face", "glow"], downloads: 14300, published: "2026-05-13",
    desc: {
      en: "A beautiful abstract 3D metallic face representing synthetic intelligence.",
      th: "ภาพสามมิติของดวงหน้าโลหะเรียบหรู สื่อถึงปัญญาประดิษฐ์สังเคราะห์",
      vi: "Khuôn mặt kim loại 3D trừu tượng tuyệt đẹp đại diện cho trí tuệ nhân tạo.",
      my: "ဉာဏ်ရည်တုကို ကိုယ်စားပြုသော လှပသည့် သတ္တုမျက်နှာပုံစံ 3D အနုပညာ။",
      lo: "ພາບສາມມິຕິຂອງໃບໜ້າໂລຫະຮຽບຫຣູ ສື່ເຖິງປັນຍາປະດິດ.",
      km: "ទម្រង់មុខលោហៈ 3D បែបអរូបីដ៏ស្រស់ស្អាតតំណាងឱ្យបញ្ញាសិប្បនិម្មិត។"
    }
  },
  {
    slug: "cybernetic-hand", title: "Cybernetic Hand", category: "robot", color: "#8e8e93",
    url: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=1080&auto=format&fit=crop&q=80",
    tags: ["robot", "hand", "tech"], downloads: 18220, published: "2026-05-03",
    desc: {
      en: "A high-precision robotic hand with exposed metallic joints and hydraulic parts.",
      th: "มือกลอนาคตความละเอียดสูง เผยให้เห็นข้อต่อเหล็กและระบบไฮดรอลิกส์",
      vi: "Bàn tay robot độ chính xác cao với các khớp nối kim loại và bộ phận thủy lực.",
      my: "သတ္တုအဆစ်များနှင့် ဟိုက်ဒရောလစ် အစိတ်အပိုင်းများပါဝင်သော စက်ရုပ်လက်။",
      lo: "ມືກົນອະນາຄົດຄວາມລະອຽດສູງ ເຜີຍໃຫ້ເຫັນຂໍ້ຕໍ່ເຫຼັກ.",
      km: "ដៃរ៉ូបូតដែលមានភាពជាក់លាក់ខ្ពស់ បង្ហាញពីសន្លាក់លោហៈ និងផ្នែកធារាសាស្ត្រ។"
    }
  },
  {
    slug: "ai-brain", title: "AI Neural Brain", category: "robot", color: "#5856d6",
    url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1080&auto=format&fit=crop&q=80",
    tags: ["robot", "brain", "glow"], downloads: 25410, published: "2026-04-26",
    desc: {
      en: "A glowing blue digital mesh neural network representing a thinking artificial brain.",
      th: "เครือข่ายใยประสาทดิจิทัลสีน้ำเงินเรืองแสง จำลองสมองกลปัญญาประดิษฐ์ขณะคิด",
      vi: "Mạng lưới thần kinh kỹ thuật số màu xanh phát sáng đại diện cho bộ não nhân tạo.",
      my: "တွေးတောနေသော ဉာဏ်ရည်တုဦးနှောက်ကို ကိုယ်စားပြုသည့် တောက်ပသော ကွန်ရက်။",
      lo: "ເຄືອຂ່າຍໃຍປະສາດດິຈິຕໍສີນ້ຳເງິນເຮືອງແສງ ຈຳລອງສະໝອງກົນ.",
      km: "បណ្តាញសរសៃប្រសាទឌីជីថលពណ៌ខៀវភ្លឺ តំណាងឱ្យខួរក្បាលសិប្បនិម្មិតកំពុងគិត။"
    }
  },
  {
    slug: "nanotech-core", title: "Nanotech Core", category: "robot", color: "#00f6ff",
    url: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1080&auto=format&fit=crop&q=80",
    tags: ["robot", "core", "light"], downloads: 13980, published: "2026-04-22",
    desc: {
      en: "A glowing fusion energy reactor core powered by advanced nanotech assembly.",
      th: "แกนเตาปฏิกรณ์พลังงานฟิวชันเรืองแสง ขับเคลื่อนด้วยนาโนเทคโนโลยีขั้นสูง",
      vi: "Lõi lò phản ứng năng lượng nhiệt hạch phát sáng hoạt động bằng công nghệ nano.",
      my: "အဆင့်မြင့် နာနိုနည်းပညာဖြင့် မောင်းနှင်ထားသော စွမ်းအင်ဗဟိုချက်။",
      lo: "ແກນເຕົາປະຕິກອນພະລັງງານຟິວຊັນ ຂັບເຄື່ອນດ້ວຍນາໂນເຕັກໂນໂລຊີ.",
      km: "ស្នូលម៉ាស៊ីនប្រតិកម្មថាមពលហ្វ្យូសិនភ្លឺ ដំណើរការដោយបច្ចេកវិទ្យាណាណូកម្រិតខ្ពស់។"
    }
  },
  {
    slug: "chrome-spheres", title: "Chrome Spheres", category: "robot", color: "#54f0ff",
    url: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=1080&auto=format&fit=crop&q=80",
    tags: ["robot", "chrome", "abstract"], downloads: 11090, published: "2026-04-19",
    desc: {
      en: "Perfectly polished liquid chrome metallic spheres reflecting a futuristic sky.",
      th: "ลูกทรงกลมโลหะโครเมียมเหลวผิวมันเงา สะท้อนเงาของผืนฟ้าแห่งโลกอนาคต",
      vi: "Các khối cầu kim loại crôm lỏng nhẵn bóng phản chiếu bầu trời tương lai.",
      my: "အနာဂတ်ကောင်းကင်ယံကို ထင်ဟပ်နေသော အရည်ကြည် ခရိုမီယမ် သတ္တုလုံးများ။",
      lo: "ໜ່ວຍມົນໂລຫະໂຄຣມຽມເຫຼື້ອມເງົາ ສະທ້ອນທ້ອງຟ້າອະນາຄົດ.",
      km: "ស្វ៊ែរលោហៈក្រូមរាវដែលប៉ូលាខាត់យ៉ាងល្អឥតខ្ចោះ ឆ្លុះបញ្ចាំងពីមេឃអនាគត។"
    }
  },
  {
    slug: "mecha-armor", title: "Mecha Armor", category: "robot", color: "#ffffff",
    url: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=1080&auto=format&fit=crop&q=80",
    tags: ["robot", "mecha", "white"], downloads: 15440, published: "2026-04-16",
    desc: {
      en: "A pristine white robotic armor plate section with precise division panels.",
      th: "แผงเกราะหุ่นยนต์สีขาวบริสุทธิ์ จัดวางรอยต่อแบ่งส่วนอย่างแม่นยำล้ำยุค",
      vi: "Phần giáp robot màu trắng tinh khôi với các bảng phân chia chính xác.",
      my: "တိကျသော အစိတ်အပိုင်းများပါဝင်သော ဖြူစင်သည့် စက်ရုပ်ဝတ်စုံ။",
      lo: "ແຜງເກາະຫຸ່ນຍົນສີຂາວບໍລິສຸດ ຈັດວາງຮອຍຕໍ່ຢ່າງເປັນລະບຽບ.",
      km: "ផ្នែកបន្ទះពាសដែករ៉ូបូតពណ៌សស្អាត ជាមួយនឹងបន្ទះបែងចែកដ៏ជាក់លាក់។"
    }
  },
  {
    slug: "mech-sentinel", title: "Mech Sentinel", category: "robot", color: "#8e8e93",
    url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1080&auto=format&fit=crop&q=80",
    tags: ["robot", "arm", "cyber"], downloads: 12690, published: "2026-04-12",
    desc: {
      en: "An automated heavy mechanical cyber arm calibrating in a research lab.",
      th: "แขนกลจักรกลหนักอัตโนมัติ กำลังปรับเทียบค่าเซ็นเซอร์ในห้องปฏิบัติการวิจัย",
      vi: "Cánh tay robot cơ khí nặng tự động đang hiệu chuẩn trong phòng thí nghiệm.",
      my: "သုတေသနဓာတ်ခွဲခန်းတွင် စမ်းသပ်နေသော အလိုအလျောက် စက်ရုပ်လက်တံကြီး။",
      lo: "ແຂນກົນຈັກກົນໜັກອັດຕະໂນມັດ ກຳລັງທົດສອບໃນຫ້ອງທົດລອງ.",
      km: "ដៃមេកានិចធុនធ្ងន់ស្វ័យប្រវត្តិកំពុងក្រិតតាមខ្នាតនៅក្នុងមន្ទីរពិសោធន៍ស្រាវជ្រាវ។"
    }
  },
  {
    slug: "cyber-circuit", title: "Cyber Circuit", category: "robot", color: "#5c7b52",
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1080&auto=format&fit=crop&q=80",
    tags: ["robot", "tech", "green"], downloads: 17420, published: "2026-04-09",
    desc: {
      en: "Green circuit motherboard paths linking components in a digital system.",
      th: "ลายเส้นแผงวงจรมาเธอร์บอร์ดสีเขียว เชื่อมต่อส่วนประกอบคอมพิวเตอร์",
      vi: "Các đường mạch trên bo mạch chủ màu xanh lá kết nối các linh kiện.",
      my: "ဒစ်ဂျစ်တယ်စနစ်တွင် အစိတ်အပိုင်းများကို ချိတ်ဆက်ထားသော အစိမ်းရောင် ပတ်လမ်းပြား။",
      lo: "ລາຍເສັ້ນແຜງວົງຈອນສີຂຽວ ເຊື່ອມຕໍ່ອຸປະກອນດິຈິຕໍ.",
      km: "គន្លងបន្ទះសៀគ្វីពណ៌បៃតងតភ្ជាប់សមាសធាតុនៅក្នុងប្រព័ន្ធឌីជីថល។"
    }
  }
];

function populate() {
  console.log("Reading existing wallpapers.ts...");
  let code = fs.readFileSync(WALLPAPERS_FILE, "utf8");

  // Parse current array content
  const startMark = "export const wallpapers: Wallpaper[] = [";
  const endMark = "];";
  
  const startIndex = code.indexOf(startMark);
  const endIndex = code.indexOf(endMark, startIndex);

  if (startIndex === -1 || endIndex === -1) {
    console.error("Could not find wallpapers array in file.");
    return;
  }

  const arrayContent = code.slice(startIndex + startMark.length, endIndex);
  
  // Clean up and rebuild array content
  let newEntriesCode = "";
  for (const wp of newWallpapers) {
    // Generate local path where it will be saved as PNG
    const filename = `${wp.slug}.png`;
    const localSrc = `/wallpapers/${filename}`;
    
    const entry = `  {\n` +
      `    slug: "${wp.slug}", title: "${wp.title}", category: "${wp.category}", color: "${wp.color}",\n` +
      `    src: "${localSrc}", width: 1080, height: 2340,\n` +
      `    tags: ${JSON.stringify(wp.tags)}, downloads: ${wp.downloads}, published: "${wp.published}",\n` +
      `    desc: {\n` +
      `      en: "${wp.desc.en}",\n` +
      `      th: "${wp.desc.th}",\n` +
      `      vi: "${wp.desc.vi}",\n` +
      `      my: "${wp.desc.my}",\n` +
      `      lo: "${wp.desc.lo}",\n` +
      `      km: "${wp.desc.km}"\n` +
      `    }\n` +
      `  }`;
      
    newEntriesCode += `,\n` + entry;
  }

  const updatedArrayContent = arrayContent.trim() + newEntriesCode;
  
  const newCode = code.slice(0, startIndex + startMark.length) + "\n" + updatedArrayContent + "\n" + code.slice(endIndex);
  
  fs.writeFileSync(WALLPAPERS_FILE, newCode, "utf8");
  console.log("Successfully added 28 wallpaper records to wallpapers.ts!");
}

populate();
