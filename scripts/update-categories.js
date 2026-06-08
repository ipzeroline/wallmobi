const fs = require("fs");
const path = require("path");

const SITE_FILE = path.join(__dirname, "../src/lib/site.ts");
const DICT_DIR = path.join(__dirname, "../src/i18n/dictionaries");

const categorySlugs = [
  "anime",
  "dragon",
  "black",
  "amoled",
  "aesthetic",
  "cyberpunk",
  "samurai",
  "oni",
  "wolf",
  "car",
  "nature",
  "space",
  "gaming",
  "cute",
  "dark",
  "fantasy",
  "japanese",
  "neon",
  "supercar",
  "luxury"
];

// Translations dictionary map with SEO-optimized names containing "Wallpapers" / local equivalents
const categoryTranslations = {
  en: {
    anime: { name: "Anime Wallpapers", blurb: "Cozy hand-painted illustrations, summer clouds, and warm nostalgic landscapes." },
    dragon: { name: "Dragon Wallpapers", blurb: "Majestic dragons, mythical fire-breathers, and legendary beasts of fantasy." },
    black: { name: "Black Wallpapers", blurb: "Deep, pure black backgrounds and monochrome designs for a stealthy look." },
    amoled: { name: "AMOLED Wallpapers", blurb: "True pitch-black wallpapers designed to save battery and make colors pop." },
    aesthetic: { name: "Aesthetic Wallpapers", blurb: "Beautiful vaporwave, dreamscapes, and soft nostalgic visual aesthetics." },
    cyberpunk: { name: "Cyberpunk Wallpapers", blurb: "Electric colors, rain-slicked neon streets, and dark futuristic cities." },
    samurai: { name: "Samurai Wallpapers", blurb: "Noble warriors, steel katanas, and historic Japanese martial spirits." },
    oni: { name: "Oni Wallpapers", blurb: "Mythical Japanese demons, traditional masks, and dark folklore art." },
    wolf: { name: "Wolf Wallpapers", blurb: "Majestic wolves, wild predators, and howling alphas under the moon." },
    car: { name: "Car Wallpapers", blurb: "Stunning daily drivers, retro classics, and high-performance road cars." },
    nature: { name: "Nature Wallpapers", blurb: "Breathtaking landscapes, misty forests, and peaceful natural escapes." },
    space: { name: "Space Wallpapers", blurb: "Deep space nebulas, mystical stars, and otherworldly celestial portals." },
    gaming: { name: "Gaming Wallpapers", blurb: "Epic gaming setups, virtual realms, and controller/console art." },
    cute: { name: "Cute Wallpapers", blurb: "Chibi characters, adorable animals, and pastel claymorphic art." },
    dark: { name: "Dark Wallpapers", blurb: "Moody shadows, gothic designs, and dark mysterious phone themes." },
    fantasy: { name: "Fantasy Wallpapers", blurb: "Magical landscapes, hidden temples, and surreal dream realms." },
    japanese: { name: "Japanese Wallpapers", blurb: "Traditional shrines, cherry blossoms, and classic ukiyo-e vibes." },
    neon: { name: "Neon Wallpapers", blurb: "Glowing vector lines, vibrant signboards, and electric light shapes." },
    supercar: { name: "Supercar Wallpapers", blurb: "Exotic hypercars, track monsters, and futuristic concept vehicles." },
    luxury: { name: "Luxury Wallpapers", blurb: "Gold accents, premium marble, and elegant high-class aesthetics." }
  },
  th: {
    anime: { name: "วอลเปเปอร์อนิเมะ", blurb: "ภาพวาดสไตล์อบอุ่น เมฆฤดูร้อน และทิวทัศน์ย้อนวันวันที่แสนคิดถึง" },
    dragon: { name: "วอลเปเปอร์มังกร", blurb: "มังกรที่สง่างาม สัตว์พ่นไฟในตำนาน และสัตว์ร้ายในจินตนาการ" },
    black: { name: "วอลเปเปอร์โทนดำ", blurb: "พื้นหลังสีดำสนิทและการออกแบบขาวดำเพื่อลุคที่เรียบหรู" },
    amoled: { name: "วอลเปเปอร์ AMOLED", blurb: "วอลล์เปเปอร์สีดำสนิทออกแบบมาเพื่อประหยัดแบตเตอรี่และทำให้สีสันโดดเด่น" },
    aesthetic: { name: "วอลเปเปอร์เอสเธติก", blurb: "ภาพแนวเวเปอร์เวฟ แดนฝัน และความงามของภาพย้อนยุคที่นุ่มนวล" },
    cyberpunk: { name: "วอลเปเปอร์ไซเบอร์พังก์", blurb: "สีสันไฟฟ้า ตรอกซอกซอยเปียกฝนสะท้อนแสงไฟนีออน และเมืองอนาคต" },
    samurai: { name: "วอลเปเปอร์ซามูไร", blurb: "นักรบผู้สูงศักดิ์ ดาบคะตะนะเหล็ก และจิตวิญญาณการต่อสู้แบบญี่ปุ่นโบราณ" },
    oni: { name: "วอลเปเปอร์ยักษ์โอนิ", blurb: "ยักษ์โอนิในตำนาน หน้ากากญี่ปุ่นโบราณ และศิลปะพื้นบ้านโทนมืด" },
    wolf: { name: "วอลเปเปอร์หมาป่า", blurb: "หมาป่าที่สง่างาม นักล่าในป่ากว้าง และจ่าฝูงที่หอนใต้แสงจันทร์" },
    car: { name: "วอลเปเปอร์รถยนต์", blurb: "รถยนต์ใช้งานทั่วไปที่โดดเด่น คลาสสิกย้อนยุค และรถสมรรถนะสูง" },
    nature: { name: "วอลเปเปอร์ธรรมชาติ", blurb: "ทิวทัศน์ธรรมชาติอันงดงาม ป่าหมอก และการเดินทางสู่ความสงบ" },
    space: { name: "วอลเปเปอร์อวกาศ", blurb: "เนบิวลาห้วงอวกาศลึก ดวงดาวลึกลับ และประตูมิติแห่งดวงดาว" },
    gaming: { name: "วอลเปเปอร์เกมมิ่ง", blurb: "มุมจัดโต๊ะคอมในฝัน โลกเสมือนจริง และศิลปะเกี่ยวกับเกมเมอร์" },
    cute: { name: "วอลเปเปอร์น่ารัก", blurb: "ตัวละครชิบิ สัตว์เลี้ยงแสนน่ารัก และศิลปะโทนสีพาสเทลแสนหวาน" },
    dark: { name: "วอลเปเปอร์โทนมืด", blurb: "เงาที่ดูมีอารมณ์ การออกแบบสไตล์โกธิค และธีมโทรศัพท์ลึกลับโทนมืด" },
    fantasy: { name: "วอลเปเปอร์แฟนตาซี", blurb: "ทิวทัศน์มหัศจรรย์ วิหารลับ และดินแดนแห่งความฝันที่อยู่เหนือจริง" },
    japanese: { name: "วอลเปเปอร์สไตล์ญี่ปุ่น", blurb: "ศาลเจ้าดั้งเดิม ดอกซากุระบาน และบรรยากาศภาพพิมพ์คลาสสิกของญี่ปุ่น" },
    neon: { name: "วอลเปเปอร์นีออน", blurb: "เส้นเวกเตอร์เรืองแสง ป้ายไฟสีสันสดใส และรูปทรงแสงนีออนไฟฟ้า" },
    supercar: { name: "วอลเปเปอร์ซูเปอร์คาร์", blurb: "ไฮเปอร์คาร์ที่แปลกตา สัตว์ร้ายในสนามแข่ง และรถแนวคิดแห่งอนาคต" },
    luxury: { name: "วอลเปเปอร์ความหรูหรา", blurb: "การตกแต่งสีทอง หินอ่อนพรีเมียม และสุนทรียภาพแห่งความหรูหรา" }
  },
  vi: {
    anime: { name: "Hình nền Anime", blurb: "Hình minh họa vẽ tay ấm áp, mây mùa hè và phong cảnh hoài niệm." },
    dragon: { name: "Hình nền Rồng", blurb: "Rồng uy nghi, sinh vật phun lửa trong truyền thuyết và quái thú huyền thoại." },
    black: { name: "Hình nền Màu đen", blurb: "Nền đen thuần khiết và thiết kế đơn sắc cho vẻ ngoài tối giản, bí ẩn." },
    amoled: { name: "Hình nền AMOLED", blurb: "Hình nền đen tuyệt đối giúp tiết kiệm pin và làm nổi bật màu sắc." },
    aesthetic: { name: "Hình nền Aesthetic", blurb: "Phong cách vaporwave đẹp mắt, cảnh mộng mơ và nghệ thuật hoài niệm dịu dàng." },
    cyberpunk: { name: "Hình nền Cyberpunk", blurb: "Màu sắc điện tử rực rỡ, đường phố neon mưa ẩm ướt và thành phố tương lai." },
    samurai: { name: "Hình nền Samurai", blurb: "Chiến binh cao quý, kiếm katana sắc bén và tinh thần võ sĩ đạo Nhật Bản." },
    oni: { name: "Hình nền Quỷ Oni", blurb: "Quỷ thần trong truyền thuyết Nhật Bản, mặt nạ truyền thống và nghệ thuật dân gian tối tăm." },
    wolf: { name: "Hình nền Sói", blurb: "Những con sói uy nghiêm, kẻ săn mồi hoang dã và thủ lĩnh hú dưới trăng." },
    car: { name: "Hình nền Ô tô", blurb: "Những mẫu xe lái hàng ngày tuyệt đẹp, xe cổ điển retro và siêu xe hiệu suất cao." },
    nature: { name: "Hình nền Thiên nhiên", blurb: "Phong cảnh ngoạn mục, rừng sương mù và những lối thoát thiên nhiên thanh bình." },
    space: { name: "Hình nền Vũ trụ", blurb: "Tinh vân không gian sâu thẳm, những ngôi sao huyền bí và cổng trời thế giới khác." },
    gaming: { name: "Hình nền Gaming", blurb: "Góc chơi game hoành tráng, thế giới ảo và nghệ thuật tay cầm điều khiển." },
    cute: { name: "Hình nền Dễ thương", blurb: "Nhân vật chibi, động vật đáng yêu và nghệ thuật đất sét màu pastel ngọt ngào." },
    dark: { name: "Hình nền Tối tăm", blurb: "Bóng tối tâm trạng, thiết kế gothic và chủ đề điện thoại bí ẩn." },
    fantasy: { name: "Hình nền Fantasy", blurb: "Phong cảnh huyền diệu, ngôi đền ẩn giấu và cõi mộng mơ siêu thực." },
    japanese: { name: "Hình nền Kiểu Nhật", blurb: "Ngôi đền truyền thống, hoa anh đào và bầu không khí ukiyo-e cổ điển." },
    neon: { name: "Hình nền Neon", blurb: "Đường vector phát sáng, bảng hiệu rực rỡ và hình khối ánh sáng điện tử." },
    supercar: { name: "Hình nền Siêu xe", blurb: "Siêu xe hypercar kỳ lạ, quái vật đường đua và phương tiện ý tưởng tương lai." },
    luxury: { name: "Hình nền Sang trọng", blurb: "Điểm nhấn bằng vàng, đá cẩm thạch cao cấp và tính thẩm mỹ thanh lịch đẳng cấp." }
  },
  lo: {
    anime: { name: "ວໍລເປເປີອານີເມະ", blurb: "ພາບວາດສະໄຕລ໌ອົບອຸ່ນ ເມກລະດູຮ້ອນ ແລະທິວທັດຍ້ອນວັນວານ." },
    dragon: { name: "ວໍລເປເປີມັງກອນ", blurb: "ມັງກອນສະຫງ່າງາມ ສັດພົ່ນໄຟໃນຕຳນານ ແລະສັດຮ້າຍໃນຈິນຕະນາການ." },
    black: { name: "ວໍລເປເປີໂທນດຳ", blurb: "ພື້ນຫຼັງສີດຳສະໜິດ ແລະການອອກແບບຂາວດຳເພື່ອລຸກຄ໌ທີ່ລຽບງ່າຍ." },
    amoled: { name: "ວໍລເປເປີ AMOLED", blurb: "ວໍລເປເປີສີດຳສະໜິດອອກແບບມາເພື່ອປະຢັດແບັດເຕີຣີ ແລະເຮັດໃຫ້ສີສັນໂດດເດັ່ນ." },
    aesthetic: { name: "ວໍລເປເປີເອສເທຕິກ", blurb: "ພາບແນວເວເປີເວຟ ແດນຝັນ ແລະຄວາມງາມຂອງພາບຍ້ອນຍຸກທີ່ນຸ່ມນວນ." },
    cyberpunk: { name: "ວໍລເປເປີໄຊເບີພັງກ໌", blurb: "ສີສันໄຟຟ້າ ຕຣອກຊອຍປຽກຝົນສະທ້ອນແສງໄຟນີອອນ ແລະເມືອງອະນາຄົດ." },
    samurai: { name: "ວໍລເປເປີຊາມູໄຣ", blurb: "ນັກຮົບຜູ້ສູງສັກ ດາບຄາຕານะເຫຼັກ ແລະຈິດວິນຍານການຕໍ່ສູ້ແບບຍີ່ປຸ່ນບູຮານ." },
    oni: { name: "ວໍລເປເປີຍັກໂອນິ", blurb: "ຍັກໂອນິໃນຕຳນານ ໜ້າກາກຍີ່ປุ່ນບູຮານ ແລະສິລະປະພື້ນບ້ານໂທນມືດ." },
    wolf: { name: "ວໍລເປເປີໝາປ່າ", blurb: "ໝາປ່າສະຫງ່າງາມ ນັກລ້າໃນປ່າກວ້າງ ແລະຈົ່ວຝູງທີ່ຫອນໃຕ້ແສງຈັນ." },
    car: { name: "ວໍລເປເປີລົດຍົນ", blurb: "ລົດຍົນທີ່ໂດດເດັ່ນ ຄລາສສິກຍ້ອນຍຸກ ແລະລົດສະມັດຖະນະສູງ." },
    nature: { name: "ວໍລເປເປີທຳມະຊາດ", blurb: "ທິວທັດທຳມະຊາດອັນງົດງາມ ປ່າໝອກ ແລະການເດີນທາງສູ່ຄວາມສະຫງົບ." },
    space: { name: "ວໍລເປເປີອະວະກາດ", blurb: "ເນບິວລາຫ້ວງອະວະກາດເລິກ ດວງດາວລຶກລັບ ແລະປະຕູມິຕິແຫ່ງດວງດາວ." },
    gaming: { name: "ວໍລເປເປີເກມມິ່ງ", blurb: "ມຸມຈັດໂຕະຄອມໃນຝັນ ໂລກສະເໝືອນຈິງ ແລະສິລະປະການຄວບຄຸມເກມ." },
    cute: { name: "ວໍລເປເປີໜ້າຮັກ", blurb: "ຕົວລະຄອນຊິບິ ສັດລ້ຽງແສນໜ້າຮັກ ແລະສິລະປະໂທນສີພັສເທລ." },
    dark: { name: "ວໍລເປປີໂທນມືດ", blurb: "ເງົາທີ່ມີອາລົມ ການອອກແບບສະໄຕລ໌ໂກທິກ ແລະທີມໂທລະສັບລຶກລັບ." },
    fantasy: { name: "ວໍລເປເປີແຟນຕາຊີ", blurb: "ທິວທັດມະຫັດສະຈັນ ວິຫານລັບ ແລະດິນແດນແຫ່ງຄວາມຝັນເໜືອຈິງ." },
    japanese: { name: "ວໍລເປເປີສະໄຕລ໌ຍີ່ປຸ່ນ", blurb: "ສານເຈົ້າດັ້ງເດີມ ດອກຊາກຸຣະບານ ແລະບັນຍາກາດຍີ່ປຸ່ນຄລາສສິກ." },
    neon: { name: "ວໍລເປເປີມນີອອນ", blurb: "ເສັ້ນເວັກເຕີເຮືອງແສງ ປ້າຍໄຟສີສັນສົດໃສ ແລະຮູບຊົງແສງນີອອນໄຟຟ້າ." },
    supercar: { name: "ວໍລເປເປີຊູເປີຄາຣ໌", blurb: "ໄຮເປີຄາຣ໌ທີ່ແປກຕາ ສັດຮ້າຍໃນສະໜາມແข່ງ ແລະລົດແນວຄິດອະນາຄົດ." },
    luxury: { name: "ວໍລເປເປີຄວາມຫຣູຫຣາ", blurb: "ການຕົບແຕ່ງສີທອງ ຫີນອ່ອນພຣີມຽມ ແລະຄວາມງາມລະດັບພຣີມຽມ." }
  },
  km: {
    anime: { name: "រូបភាពផ្ទៃក្រោយអានីម៉េ", blurb: "គំនូរគូរដោយដៃដ៏កក់ក្តៅ ពពកនារដូវក្តៅ និងទេសភាពអាឡោះអាល័យ។" },
    dragon: { name: "រូបភាពផ្ទៃក្រោយនាគ", blurb: "នាគដ៏មានអំណាច សត្វព្រួសភ្លើងក្នុងตำنان និងសត្វចម្លែកក្នុងរឿងព្រេង。" },
    black: { name: "រូបភាពផ្ទៃក្រោយពណ៌ខ្មៅ", blurb: "ផ្ទៃខាងក្រោយពណ៌ខ្មៅសុទ្ធ និងการរចនាពណ៌សខ្មៅសម្រាប់រូបរាងដ៏ប្រណីត។" },
    amoled: { name: "រូបភាពផ្ទៃក្រោយ AMOLED", blurb: "រូបភាពផ្ទៃក្រោយពណ៌ខ្មៅងងឹតពិតប្រាកដ រចនាឡើងដើម្បីសន្សំសំចៃថ្ម។" },
    aesthetic: { name: "រូបភាពផ្ទៃក្រោយសោភ័ណភាព", blurb: "រូបភាពបែប Vaporwave ទេសភាពក្នុងសុបិន និងសោភ័ណភាពដ៏ទន់ភ្លន់។" },
    cyberpunk: { name: "រូបភាពផ្ទៃក្រោយសាយបឺភាំង", blurb: "ពណ៌ភ្លឺផ្លេក ផ្លូវណេអុងសើមជោកដោយភ្លៀង និងទីក្រុងនាពេលអនាគត។" },
    samurai: { name: "រូបភាពផ្ទៃក្រោយសាមូរ៉ៃ", blurb: "អ្នកចម្បាំងដ៏ថ្លៃថ្នូរ ដាវកាតាណាដែកថែប និងស្មារតីយុទ្ធគុនជប៉ុនបុរាណ។" },
    oni: { name: "រូបភាពផ្ទៃក្រោយអូនី", blurb: "បិសាចជប៉ុនក្នុងរឿងព្រេង មុខរបាំងបុរាណ និងសិល្បៈប្រលោមលោកងងឹត។" },
    wolf: { name: "រូបភាពផ្ទៃក្រោយចចក", blurb: "សត្វចចកដ៏អស្ចារ្យ សត្វប្រមាញ់ព្រៃ និងចចកបន្លឺសំឡេងនៅក្រោមព្រះច័ន្ទ។" },
    car: { name: "រូបភាពផ្ទៃក្រោយឡាន", blurb: "រថយន្តប្រើប្រាស់ប្រចាំថ្ងៃដ៏ស្រស់ស្អាត រថយន្តបុរាណ និងរថយន្តកម្លាំងខ្លាំង។" },
    nature: { name: "រូបភាពផ្ទៃក្រោយធម្មជាតិ", blurb: "ទេសភាពដ៏ស្រស់ស្អាត ព្រៃឈើគ្របដណ្តប់ដោយអ័ព្ទ និងធម្មជាតិដ៏ស្ងប់ស្ងាត់។" },
    space: { name: "រូបភាពផ្ទៃក្រោយលំហ", blurb: "ណេប៊ុឡាលំហជ្រៅ ផ្កាយដ៏អាថ៌កំបាំង និងច្រកទ្វារសកលលោកផ្សេងទៀត។" },
    gaming: { name: "រូបភាពផ្ទៃក្រោយហ្គេមមីង", blurb: "ការរៀបចំតុហ្គេមដ៏អស្ចาร្យ ពិភពសិប្បនិម្មិត និងសិល្បៈឧបករណ៍បញ្ជា។" },
    cute: { name: "រូបភាពផ្ទៃក្រោយគួរឱ្យស្រឡាញ់", blurb: "តួអង្គ Chibi សត្វគួរឱ្យស្រឡាញ់ និងសិល្បៈដីឥដ្ឋពណ៌ទន់ភ្លន់។" },
    dark: { name: "រូបភាពផ្ទៃក្រោយងងឹត", blurb: "ស្រមោលអាថ៌កំបាំង ការរចនាបែបហ្គោធិក និងស្បែកទូរស័ព្ទងងឹត។" },
    fantasy: { name: "រូបភាពផ្ទៃក្រោយរឿងនិទាន", blurb: "ទេសភាពវេទមន្ត វិហារលាក់កំបាំង និងពិភពសុបិនដ៏អស្ចារ្យ។" },
    japanese: { name: "រូបភាពផ្ទៃក្រោយជប៉ុន", blurb: "វិហារបុរាណ ផ្កាសាគូរ៉ា និងបរិយាកាសគំនូរបុរាណជប៉ុន Ukiyo-e។" },
    neon: { name: "រូបភាពផ្ទៃក្រោយណេអុង", blurb: "ខ្សែកោងណេអុងភ្លឺ បន្ទះសញ្ញាដ៏រស់រវើក និងរាងពន្លឺអគ្គិសនី。" },
    supercar: { name: "រូបភាពផ្ទៃក្រោយឡានទំនើប", blurb: "រថយន្តល្បឿនលឿន Hypercars និងរថយន្តគំនិតនាពេលអនាគត។" },
    luxury: { name: "រូបភាពផ្ទៃក្រោយប្រណីត", blurb: "ការរចនាពណ៌មាស ថ្មម៉ាបលំដាប់ខ្ពស់ និងសោភ័ណភាពដ៏ប្រណីត。" }
  },
  my: {
    anime: { name: "အန်နီမေး နောက်ခံပုံများ", blurb: "နွေးထွေးသော လက်ဆွဲပန်းချီများ၊ နွေရာသီ တိမ်တိုက်များနှင့် လွမ်းဆွတ်ဖွယ် ရှုခင်းများ။" },
    dragon: { name: "နဂါး နောက်ခံပုံများ", blurb: "ခန့်ညားသောနဂါးများ၊ မီးမှုတ်သတ္တဝါများနှင့် ဒဏ္ဍာရီလာ သတ္တုရိုင်းများ။" },
    black: { name: "အနက်ရောင် နောက်ခံပုံများ", blurb: "နက်ရှိုင်းသောအနက်ရောင်နောက်ခံများနှင့် ရိုးရှင်းလှပသော ဒီဇိုင်းများ။" },
    amoled: { name: "AMOLED နောက်ခံပုံများ", blurb: "ဘက်ထရီသက်သာစေပြီး အရောင်များကို တောက်ပစေမည့် အနက်စစ်စစ် နောက်ခံပုံများ။" },
    aesthetic: { name: "အနုပညာဆန်ဆန် နောက်ခံပုံများ", blurb: "လှပသော vaporwave၊ အိပ်မက်ဆန်သော ရှုခင်းများနှင့် နူးညံ့သော အနုပညာလက်ရာများ။" },
    cyberpunk: { name: "ဆိုက်ဘာပန့်ခ် နောက်ခံပုံများ", blurb: "လျှပ်စစ်အရောင်များ၊ မိုးရေစိုနေသော နီယွန်လမ်းများနှင့် အနာဂတ်မြို့ကြီးများ။" },
    samurai: { name: "ဆာမူရိုင်း နောက်ခံပုံများ", blurb: "မြင့်မြတ်သော စစ်သည်တော်များ၊ ကာတာနာဓားများနှင့် ဂျပန်ရိုးရာ စစ်စိတ်ဓာတ်။" },
    oni: { name: "အိုနီယက္ခတ် နောက်ခံပုံများ", blurb: "ဂျပန်ဒဏ္ဍာရီလာ ဘီလူးများ၊ ရိုးရာမျက်နှာဖုံးများနှင့် အမှောင်အနုပညာ။" },
    wolf: { name: "ဝံပုလွေ နောက်ခံပုံများ", blurb: "ခန့်ညားသောဝံပုလွေများ၊ တောရိုင်းသားကောင်များနှင့် လပြည့်ညအောက် အူသံများ။" },
    car: { name: "ကား နောက်ခံပုံများ", blurb: "လှပသောနေ့စဉ်သုံးကားများ၊ ရှေးဟောင်းကားများနှင့် စွမ်းဆောင်ရည်မြင့် ကားများ။" },
    nature: { name: "သဘာဝတရား နောက်ခံပုံများ", blurb: "ရင်သပ်ရှုမောဖွယ် ရှုခင်းများ၊ မြူခိုးဆိုင်းသောတောများနှင့် အေးချမ်းသော သဘာဝ။" },
    space: { name: "အာကာသ နောက်ခံပုံများ", blurb: "နက်ရှိုင်းသောအာကာသနက်ဗျူလာများ၊ ဆန်းကြယ်သောကြယ်များနှင့် အာကာသတံခါးပေါက်များ။" },
    gaming: { name: "ဂိမ်းကစားခြင်း နောက်ခံပုံများ", blurb: "ခန့်ညားသော ဂိမ်းဆော့သည့်နေရာများ၊ ဒစ်ဂျစ်တယ် ကမ္ဘာများနှင့် ဂိမ်းအနုပညာ။" },
    cute: { name: "ချစ်စရာ နောက်ခံပုံများ", blurb: "ချစ်စရာ Chibi ဇာတ်ကောင်များ၊ တိရစ္ဆာန်လေးများနှင့် နူးညံ့သော အရောင်များ။" },
    dark: { name: "အမှောင် နောက်ခံပုံများ", blurb: "ဆန်းကြယ်သောအမှောင်ရိပ်များ၊ ဂေါ့သစ်ဒီဇိုင်းများနှင့် လျှို့ဝှက်ဆန်းကြယ်သော ธีမများ။" },
    fantasy: { name: "စိတ်ကူးယဉ် နောက်ခံပုံများ", blurb: "မှော်ဆန်သော ရှုခင်းများ၊ ဝှက်ထားသော ဘုရားကျောင်းများနှင့် စိတ်ကူးယဉ် ကမ္ဘာများ။" },
    japanese: { name: "ဂျပန်စတိုင် နောက်ခံပုံများ", blurb: "ရိုးရာဘုရားကျောင်းများ၊ ချယ်ရီပန်းများနှင့် ဂျပန်ဂန္ထဝင် အငွေ့အသက်များ။" },
    neon: { name: "နီယွန် နောက်ခံပုံများ", blurb: "တောက်ပသော ဗက်တာမျဉ်းများ၊ တောက်ပသော ဆိုင်းဘုတ်များနှင့် လျှပ်စစ်မီးလုံးများ။" },
    supercar: { name: "စူပါကား နောက်ခံပုံများ", blurb: "ခေတ်မီဆန်းသစ်သော ဟိုက်ပါကားများ၊ ပြိုင်ကွင်းကားများနှင့် အနာဂတ်ကားများ။" },
    luxury: { name: "ဇိမ်ခံ နောက်ခံပုံများ", blurb: "ရွှေရောင်အဆင်တန်ဆာများ၊ အဆင့်မြင့် စကျင်ကျောက်များနှင့် အဆင့်အတန်းမြင့် အနုပညာ။" }
  }
};

// 1. Update src/lib/site.ts
function updateSiteFile() {
  console.log("Updating src/lib/site.ts...");
  let code = fs.readFileSync(SITE_FILE, "utf8");
  
  const startMark = "export const categorySlugs = [";
  const endMark = "] as const;";
  
  const startIndex = code.indexOf(startMark);
  const endIndex = code.indexOf(endMark, startIndex);
  
  if (startIndex === -1 || endIndex === -1) {
    console.error("Could not find categorySlugs in site.ts");
    return;
  }
  
  const newArrayCode = `${startMark}\n` + categorySlugs.map(s => `  "${s}",`).join("\n") + `\n${endMark}`;
  const newCode = code.slice(0, startIndex) + newArrayCode + code.slice(endIndex + endMark.length);
  
  fs.writeFileSync(SITE_FILE, newCode, "utf8");
  console.log("src/lib/site.ts updated successfully!");
}

// 2. Update all language dictionaries
function updateDictionaries() {
  console.log("Updating dictionaries...");
  const langs = Object.keys(categoryTranslations);
  
  for (const lang of langs) {
    const file = path.join(DICT_DIR, `${lang}.ts`);
    if (!fs.existsSync(file)) {
      console.warn(`Dictionary file ${file} does not exist.`);
      continue;
    }
    
    console.log(`Processing dictionary: ${file}`);
    let code = fs.readFileSync(file, "utf8");
    
    // Find the categories block
    const startMark = "  categories: {";
    const startIndex = code.indexOf(startMark);
    if (startIndex === -1) {
      console.error(`Could not find categories block in ${file}`);
      continue;
    }
    
    // Locate the end of categories block
    const searchFrom = startIndex + startMark.length;
    const endBlockIndex = code.indexOf("  },", searchFrom);
    const seoIndex = code.indexOf("  seo: {", searchFrom);
    
    if (endBlockIndex === -1 || endBlockIndex > seoIndex) {
      console.error(`Could not find correct end block for categories in ${file}`);
      continue;
    }
    
    // Rebuild the categories block text
    const trans = categoryTranslations[lang];
    let catBlock = "  categories: {\n";
    for (const slug of categorySlugs) {
      const entry = trans[slug];
      catBlock += `    ${slug}: { name: "${entry.name}", blurb: "${entry.blurb.replace(/"/g, '\\"')}" },\n`;
    }
    catBlock += "  },";
    
    const newCode = code.slice(0, startIndex) + catBlock + code.slice(endBlockIndex + 4);
    fs.writeFileSync(file, newCode, "utf8");
    console.log(`Updated ${file} successfully!`);
  }
}

updateSiteFile();
updateDictionaries();
