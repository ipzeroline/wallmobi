import { type Locale } from "@/i18n/config";

export interface AboutSection {
  heroTitle: string;
  heroSubtitle: string;
  
  philosophyTitle: string;
  philosophyText1: string;
  philosophyText2: string;
  
  processTitle: string;
  processStep1Title: string;
  processStep1Desc: string;
  processStep2Title: string;
  processStep2Desc: string;
  processStep3Title: string;
  processStep3Desc: string;
  
  featuresTitle: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  
  compatibilityTitle: string;
  compatibilityDesc: string;
  compatibilityList: string[];
}

export const ABOUT_CONTENT: Record<Locale, AboutSection> = {
  th: {
    heroTitle: "ภาพพื้นหลังมือถือระดับพรีเมียม คัดสรรเพื่อหน้าจอของคุณ",
    heroSubtitle: "ที่ WallMobi เราผสมผสานความคิดสร้างสรรค์ของ AI เข้ากับการคัดสรรด้วยมือของมนุษย์ เพื่อมอบวอลเปเปอร์แนวตั้งที่ดีที่สุดให้กับสมาร์ทโฟนทุกรุ่น",
    
    philosophyTitle: "ปรัชญาการออกแบบของเรา",
    philosophyText1: "วอลเปเปอร์ที่ดีต้องไม่แย่งความโดดเด่นไปจากไอคอนแอปและวิดเจ็ตของคุณ ในปัจจุบันรูปภาพทั่วไปบนอินเทอร์เน็ตมักมีรายละเอียดที่รกเกินไปหรือมีแสงเงาที่รบกวนการอ่านชื่อแอป ทำให้หน้าจอโฮมดูไม่เป็นระเบียบ",
    philosophyText2: "ที่ WallMobi เราให้ความสำคัญกับการคัดสรรรูปภาพที่มีคอนทราสต์ที่พอดี สีสันที่สมดุล และจุดโฟกัสที่จัดวางอย่างชาญฉลาด เพื่อให้แน่ใจว่ามันจะดูสวยงาม สงบตา และทำหน้าที่เป็นฉากหลังที่เป็นมิตรกับนาฬิกาและไอคอนมือถือของคุณอย่างแท้จริง",
    
    processTitle: "ขั้นตอนการสร้างสรรค์ผลงานของเรา",
    processStep1Title: "1. การสร้างสรรค์ด้วย AI ขั้นสูง",
    processStep1Desc: "เราเขียน prompt และควบคุมทฤษฎีสีร่วมกับปัญญาประดิษฐ์ระดับแนวหน้า เพื่อสร้างแนวคิดศิลปะที่เป็นเอกลักษณ์ เช่น ภาพแนวแอ็บสแตรกต์ 3D มินิมอล นีออน หรือ AMOLED",
    processStep2Title: "2. การทดสอบและคัดสรรด้วยมือ",
    processStep2Desc: "รูปภาพทุกชิ้นจะผ่านการคัดเลือกโดยมนุษย์ ดีไซเนอร์ของเราจะลองจำลองไอคอนแอปและระบบเวลาวางทับบนภาพ เพื่อคัดทิ้งภาพที่รกเกินไปและเก็บเฉพาะภาพที่เหมาะสมสำหรับเป็นภาพพื้นหลังจริงๆ",
    processStep3Title: "3. การปรับขนาดแบบไร้พิกเซล",
    processStep3Desc: "เราจัดอัตราส่วนองค์ประกอบภาพให้เป็น 9:16 แนวตั้งสำหรับโทรศัพท์รุ่นใหม่ และใช้ฟอร์แมตคุณภาพสูง (เช่น SVG หรือ HD) ทำให้รูปภาพมีความคมชัดสูงสุดในทุกขนาดหน้าจอโดยภาพไม่แตก",
    
    featuresTitle: "ทำไมต้องเลือกวอลเปเปอร์จาก WallMobi?",
    feature1Title: "ดาวน์โหลดฟรี ไม่มีค่าใช้จ่ายแอบแฝง",
    feature1Desc: "คุณสามารถเข้าถึงคอลเลกชันวอลเปเปอร์ระดับพรีเมียมทั้งหมดได้ฟรี 100% ดาวน์โหลดได้ในคลิกเดียวโดยไม่ต้องลงทะเบียนหรือผ่านโฆษณาที่น่ารำคาญ",
    feature2Title: "ปลอดภัยและปรับขนาดให้พอดีจอ",
    feature2Desc: "รูปภาพทั้งหมดได้รับการจัดตำแหน่งกึ่งกลางอย่างเหมาะสม เพื่อให้เข้ากับระบบการครอปอัตโนมัติของทั้ง iOS และ Android ได้อย่างสมบูรณ์แบบ",
    feature3Title: "เป็นมิตรกับหน้าจอ AMOLED",
    feature3Desc: "เรามีคอลเลกชันภาพโทนมืดและ AMOLED ที่แท้จริง (มีพิกเซลสีดำสนิทมากกว่า 50%) ช่วยลดการใช้พลังงานและยืดอายุการใช้งานแบตเตอรี่มือถือของคุณ",
    
    compatibilityTitle: "อุปกรณ์สมาร์ทโฟนที่รองรับการใช้งาน",
    compatibilityDesc: "วอลเปเปอร์แนวตั้งความละเอียดสูงของเรารองรับและพอดีกับหน้าจอของอุปกรณ์สมาร์ทโฟนรุ่นใหม่ยอดนิยมทุกรุ่น ไม่ว่าจะเป็นระบบปฏิบัติการ iOS หรือ Android:",
    compatibilityList: [
      "iPhone ทุกรุ่น (รวมถึง iPhone 15 Pro Max, 15 Pro, 14, 13, 12, SE)",
      "Samsung Galaxy ทุกซีรีส์ (S24 Ultra, S24+, S23, Z Fold, Z Flip, A-Series)",
      "Google Pixel (รวมถึง Pixel 8 Pro, 8, 7 Pro, 7a)",
      "Xiaomi, Redmi, POCO ทุกรุ่นที่ใช้หน้าจอแนวตั้ง",
      "OPPO, vivo, realme, OnePlus และสมาร์ทโฟน Android ชั้นนำอื่นๆ",
    ],
  },
  en: {
    heroTitle: "Premium Mobile Wallpapers, Curated for Your Screen",
    heroSubtitle: "At WallMobi, we combine AI-driven creativity with human curation to deliver the absolute best portrait wallpapers for modern smartphones.",
    
    philosophyTitle: "Our Design Philosophy",
    philosophyText1: "A great wallpaper should elevate your phone's screen, not fight your app icons and widgets. Many high-resolution images online are too busy, causing readability issues and visual clutter on your home screen.",
    philosophyText2: "At WallMobi, we focus on balanced contrast, calm focal points, and harmonious color palettes. We test every image to ensure it serves as a peaceful, beautiful background that plays nice with your notifications and clock.",
    
    processTitle: "Our Curation & Creative Process",
    processStep1Title: "1. Advanced AI Generation",
    processStep1Desc: "We craft custom prompts and leverage state-of-the-art AI generators with strict color theory to produce unique artistic concepts, from minimalist abstracts to neon cyberpunks.",
    processStep2Title: "2. Real-World Curation",
    processStep2Desc: "Every wallpaper is human-selected. We test mockups with UI overlays, discarding overly busy graphics and keeping only those that feel natural and functional as actual backgrounds.",
    processStep3Title: "3. Precision Optimization",
    processStep3Desc: "We compile assets in perfect vertical ratios and convert them to modern scalable vector formats (like SVG) or clean HD files, ensuring maximum crispness with zero pixelation.",
    
    featuresTitle: "Why Download from WallMobi?",
    feature1Title: "100% Free & No Registration",
    feature1Desc: "Access our entire catalog of premium creative wallpapers completely free of charge. Enjoy fast downloads with zero ads or hidden paywalls.",
    feature2Title: "Perfect Positioning & Scaling",
    feature2Desc: "Every asset is centered and composed so it adapts gracefully to both iOS and Android parallax effects and automatic system cropping.",
    feature3Title: "AMOLED & Battery Friendly",
    feature3Desc: "We offer dedicated dark themes and AMOLED wallpapers (featuring deep true blacks) designed to save battery life on modern organic LED displays.",
    
    compatibilityTitle: "Compatible Devices",
    compatibilityDesc: "Our high-resolution vertical wallpapers are fully optimized for all modern mobile screens and aspect ratios across major iOS and Android systems:",
    compatibilityList: [
      "All Apple iPhones (including iPhone 15 Pro Max, 15 Pro, 14, 13, 12, SE)",
      "Samsung Galaxy Series (S24 Ultra, S24+, S23, Z Fold, Z Flip, A-Series)",
      "Google Pixel phones (including Pixel 8 Pro, 8, 7 Pro, 7a)",
      "Xiaomi, Redmi, and POCO smartphones",
      "OPPO, vivo, realme, OnePlus, and other popular Android devices",
    ],
  },
  vi: {
    heroTitle: "Hình nền điện thoại cao cấp, tuyển chọn cho màn hình của bạn",
    heroSubtitle: "Tại WallMobi, chúng tôi kết hợp sự sáng tạo của AI với sự tuyển chọn của con người để mang lại những hình nền dọc tốt nhất cho điện thoại thông minh.",
    
    philosophyTitle: "Triết lý thiết kế của chúng tôi",
    philosophyText1: "Một hình nền tuyệt vời nên làm nổi bật màn hình điện thoại của bạn, chứ không phải tranh chấp với các biểu tượng ứng dụng và tiện ích của bạn.",
    philosophyText2: "Tại WallMobi, chúng tôi tập trung vào độ tương phản cân bằng, các điểm lấy nét yên tĩnh và bảng màu hài hòa để đảm bảo nó hoạt động tốt với giao diện hệ thống.",
    
    processTitle: "Quy trình sáng tạo và tuyển chọn",
    processStep1Title: "1. Tạo bằng AI nâng cao",
    processStep1Desc: "Chúng tôi viết các câu lệnh tùy chỉnh và tận dụng các công nghệ AI hàng đầu để tạo ra các khái niệm nghệ thuật độc đáo.",
    processStep2Title: "2. Tuyển chọn thực tế",
    processStep2Desc: "Mỗi hình nền đều được con người lựa chọn và thử nghiệm với các lớp phủ ứng dụng để đảm bảo tính thực tiễn cao.",
    processStep3Title: "3. Tối ưu hóa độ phân giải",
    processStep3Desc: "Chúng tôi tối ưu hóa hình ảnh theo tỷ lệ dọc hoàn hảo và sử dụng các định dạng hiện đại (như SVG) để đảm bảo độ sắc nét cao nhất.",
    
    featuresTitle: "Tại sao chọn WallMobi?",
    feature1Title: "Miễn phí 100% & Không cần đăng ký",
    feature1Desc: "Truy cập toàn bộ danh mục hình nền cao cấp của chúng tôi hoàn toàn miễn phí mà không có quảng cáo hoặc đăng ký phức tạp.",
    feature2Title: "Định vị & Tỷ lệ hoàn hảo",
    feature2Desc: "Mọi hình nền được thiết kế để tự động thích ứng với cơ chế cắt ảnh trên cả iOS và Android.",
    feature3Title: "Thân thiện với màn hình AMOLED",
    feature3Desc: "Các hình nền tối và AMOLED của chúng tôi giúp tiết kiệm pin cho màn hình OLED nhờ độ đen sâu thực tế.",
    
    compatibilityTitle: "Các thiết bị tương thích",
    compatibilityDesc: "Hình nền dọc độ phân giải cao của chúng tôi tương thích hoàn hảo với các thiết bị di động phổ biến hiện nay:",
    compatibilityList: [
      "Tất cả các dòng Apple iPhone (bao gồm iPhone 15 Pro Max, 14, 13, 12...)",
      "Dòng Samsung Galaxy (S24 Ultra, S23, dòng Z, dòng A...)",
      "Điện thoại Google Pixel (Pixel 8 Pro, 8, 7...)",
      "Các dòng điện thoại Xiaomi, Redmi và POCO",
      "OPPO, vivo, realme, OnePlus và các thiết bị Android khác",
    ],
  },
  my: {
    heroTitle: "သင့်ဖုန်းမျက်နှာပြင်အတွက် အထူးရွေးချယ်ထားသော ပရီမီယံနောက်ခံပုံများ",
    heroSubtitle: "WallMobi တွင် ကျွန်ုပ်တို့သည် AI နည်းပညာနှင့် လူသားတို့၏ စိစစ်ရွေးချယ်မှုကို ပေါင်းစပ်ကာ ခေတ်မီစမတ်ဖုန်းများအတွက် အကောင်းဆုံးနောက်ခံပုံများကို ပေးစွမ်းပါသည်။",
    
    philosophyTitle: "ကျွန်ုပ်တို့၏ ဒီဇိုင်းအတွေးအခေါ်",
    philosophyText1: "ကောင်းမွန်သောနောက်ခံပုံသည် ဖုန်းမျက်နှာပြင်ကို ပိုမိုလှပစေရမည်ဖြစ်ပြီး အိုင်ကွန်များနှင့် ဝစ်ဂျက်များ၏ မြင်ကွင်းကို မနှောင့်ယှက်စေရပါ။",
    philosophyText2: "ကျွန်ုပ်တို့သည် သင့်ဖုန်း၏နာရီနှင့် အိုင်ကွန်များကို လိုက်ဖက်ညီစွာ ပြသနိုင်ရန် အရောင်အသွေးနှင့် အလင်းအမှောင်တို့ကို အထူးစမ်းသပ်ပြုလုပ်ပါသည်။",
    
    processTitle: "ကျွန်ုပ်တို့၏ ဖန်တီးမှုလုပ်ငန်းစဉ်",
    processStep1Title: "၁။ အဆင့်မြင့် AI ဖြင့် ဖန်တီးခြင်း",
    processStep1Desc: "ကျွန်ုပ်တို့သည် ဆန်းသစ်သော အနုပညာဒီဇိုင်းများ ဖန်တီးရန် ခေတ်မီဆန်းသစ်သော AI နည်းပညာများကို အသုံးပြုပါသည်။",
    processStep2Title: "၂။ လူသားကိုယ်တိုင် စိစစ်ခြင်း",
    processStep2Desc: "နောက်ခံပုံတစ်ခုချင်းစီကို အမှန်တကယ်အသုံးပြုရန် သင့်တော်မှုရှိမရှိကို လူသားဒီဇိုင်နာများကိုယ်တိုင် စစ်ဆေးရွေးချယ်ပါသည်။",
    processStep3Title: "၃။ အကောင်းဆုံးအရွယ်အစား ပြုပြင်ခြင်း",
    processStep3Desc: "ဖုန်းအမျိုးမျိုးတွင် ပုံထွက်ကြည်လင်စေရန် ဒေါင်လိုက်အချိုးအစားနှင့် အရည်အသွေးမြင့် ဖော်မက်များ (ဥပမာ SVG) ဖြင့် ပြုလုပ်ထားပါသည်။",
    
    featuresTitle: "ဘာကြောင့် WallMobi ကို ရွေးချယ်သင့်သလဲ။",
    feature1Title: "လုံးဝအခမဲ့ဖြစ်ပြီး မှတ်ပုံတင်ရန်မလိုပါ",
    feature1Desc: "ကျွန်ုပ်တို့၏ ပရီမီယံနောက်ခံပုံများအားလုံးကို မည်သည့်ကြော်ငြာနှင့် ဝှက်ထားသောအခကြေးငွေမျှမရှိဘဲ အလွယ်တကူ ဒေါင်းလုဒ်ဆွဲနိုင်ပါသည်။",
    feature2Title: "ကိုက်ညီသော အချိုးအစားရှိခြင်း",
    feature2Desc: "iOS နှင့် Android ဖုန်းအမျိုးမျိုး၏ စနစ်များနှင့် အလိုအလျောက်ကိုက်ညီအောင် ပြုလုပ်ထားပါသည်။",
    feature3Title: "AMOLED မျက်နှာပြင်များအတွက် သင့်တော်ခြင်း",
    feature3Desc: "အနက်ရောင်နောက်ခံပုံများသည် AMOLED ဖုန်းများ၏ ဘက်ထရီသက်တမ်းကို သက်သာစေရန် ကူညီပေးပါသည်။",
    
    compatibilityTitle: "အသုံးပြုနိုင်သော ဖုန်းအမျိုးအစားများ",
    compatibilityDesc: "ကျွန်ုပ်တို့၏ နောက်ခံပုံများသည် အောက်ပါခေတ်မီဖုန်းမျက်နှာပြင်များအားလုံးနှင့် ကိုက်ညီမှုရှိပါသည် -",
    compatibilityList: [
      "Apple iPhone အားလုံး (iPhone 15 Pro Max, 14, 13, 12, SE စသည်)",
      "Samsung Galaxy စီးရီးများ (S24 Ultra, S23, Z Fold, Z Flip, A-Series)",
      "Google Pixel ဖုန်းများ (Pixel 8 Pro, 8, 7 စသည်)",
      "Xiaomi, Redmi နှင့် POCO ဖုန်းများ",
      "OPPO, vivo, realme, OnePlus နှင့် အခြား Android ဖုန်းများ",
    ],
  },
  lo: {
    heroTitle: "ວໍເປເປີມືຖືລະດັບພຣີມຽມ ຄັດສັນເພື່ອໜ້າຈໍຂອງທ່ານ",
    heroSubtitle: "ຢູ່ WallMobi ພວກເຮົາມີການປະສົມປະສານຄວາມຄິດສ້າງສັນຂອງ AI ແລະ ການຄັດເລືອກດ້ວຍມືຂອງມະນຸດ ເພື່ອມອບວໍເປເປີແນວຕັ້ງທີ່ດີທີ່ສຸດໃຫ້ກັບມືຖືທຸກລຸ້ນ.",
    
    philosophyTitle: "ປັດຊະຍາການອອກແບບຂອງພວກເຮົາ",
    philosophyText1: "ວໍເປເປີທີ່ດີຕ້ອງບໍ່ແຍ່ງຄວາມໂດດເດັ່ນໄປຈາກໄອຄອນແອັບ ແລະ ວິດເຈັດຂອງທ່ານ ເພື່ອໃຫ້ໜ້າຈໍໂຮມເບິ່ງເປັນລະບຽບ.",
    philosophyText2: "ພວກເຮົາໃຫ້ຄວາມສຳຄັນກັບຄວາມສົມດຸນຂອງຄອນທຣາສ, ໂທນສີທີ່ສະຫງົບຕາ ແລະ ເຂົ້າກັນໄດ້ດີກັບລະບົບການສະແດງຜົນຂອງມືຖື.",
    
    processTitle: "ຂັ້ນຕອນການສ້າງສັນຜົນງານ",
    processStep1Title: "1. ການສ້າງສັນດ້ວຍ AI ຂັ້ນສູງ",
    processStep1Desc: "ພວກເຮົາຂຽນ prompt ແລະ ຄວບຄຸມໂທນສີຮ່ວມກັບ AI ລະດັບແນວໜ້າ ເພື່ອສ້າງສັນແນວຄິດສິລະປະທີ່ເປັນເອກະລັກ.",
    processStep2Title: "2. ການທົດສອບແລະຄັດເລືອກດ້ວຍມື",
    processStep2Desc: "ຮູບທຸກໃບຈະຖືກທົດສອບການວາງໄອຄອນເພື່ອຮັບປະກັນວ່າມັນເໝາະສົມທີ່ຈະເປັນພາບພື້ນຫຼັງແທ້ໆ.",
    processStep3Title: "3. ການປັບຂະໜາດທີ່ຄົມຊັດ",
    processStep3Desc: "ພວກເຮົາຈັດອັດຕາສ່ວນໃຫ້ເປັນ 9:16 ແນວຕັ້ງ ແລະ ໃຊ້ຟໍແມັດຄຸນນະພາບສູງ (ເຊັ່ນ SVG) ເພື່ອໃຫ້ຮູບຄົມຊັດທີ່ສຸດ.",
    
    featuresTitle: "ເປັນຫຍັງຕ້ອງເລືອກ WallMobi?",
    feature1Title: "ດາວໂຫຼດຟຣີ ບໍ່ມີຄ່າໃຊ້ຈ່າຍເພີ່ມເຕີມ",
    feature1Desc: "ທ່ານສາມາດເຂົ້າເຖິງຄໍເລັກຊັນທັງໝົດໄດ້ຟຣີ 100% ໂດຍບໍ່ມີໂຄສະນາລົບກວນ ຫຼື ຕ້ອງສະໝັກສະມາຊິກ.",
    feature2Title: "ປັບຂະໜາດໃຫ້ພໍດີກັບໜ້າຈໍ",
    feature2Desc: "ຮູບທັງໝົດຖືກຈັດວາງຕຳແໜ່ງຢ່າງເໝາະສົມເພື່ອໃຫ້ເຂົ້າກັບລະບົບການຄອບຕັດຂອງ iOS ແລະ Android.",
    feature3Title: "ເປັນມິດກັບໜ້າຈໍ AMOLED",
    feature3Desc: "ພວກເຮົາຄໍເລັກຊັນພາບໂທນມືດທີ່ຊ່ວຍປະຢັດພະລັງງານ ແລະ ຍືດອາຍຸການໃຊ້ງານແບັດເຕີຣີມືຖືຂອງທ່ານ.",
    
    compatibilityTitle: "ອຸປະກອນມືຖືທີ່ຮອງຮັບ",
    compatibilityDesc: "ວໍເປເປີແນວຕັ້ງຄວາມລະອຽດສູງຂອງພວກເຮົານັ້ນເໝາະສົມກັບໜ້າຈໍຂອງມືຖືລຸ້ນໃໝ່ທຸກລຸ້ນ:",
    compatibilityList: [
      "iPhone ທຸກລຸ້ນ (ລວມທັງ iPhone 15 Pro Max, 14, 13, 12, SE)",
      "Samsung Galaxy ທຸກຊີຣີ (S24 Ultra, S23, ຕະກູນ Z ແລະ A)",
      "Google Pixel (Pixel 8 Pro, 8, 7...)",
      "Xiaomi, Redmi ແລະ POCO ທຸກລຸ້ນ",
      "OPPO, vivo, realme, OnePlus ແລະມືຖື Android ອື່ນໆ",
    ],
  },
  km: {
    heroTitle: "ផ្ទាំងរូបភាពទូរស័ព្ទកម្រិតខ្ពស់ សម្រិតសម្រាំងសម្រាប់អេក្រង់របស់អ្នក",
    heroSubtitle: "នៅ WallMobi យើងរួមបញ្ចូលគ្នានូវភាពច្នៃប្រឌិតរបស់ AI ជាមួយនឹងការជ្រើសរើសដោយដៃរបស់មនុស្ស ដើម្បីផ្តល់នូវផ្ទាំងរូបភាពបញ្ឈរដ៏ល្អបំផុត។",
    
    philosophyTitle: "ទស្សនវិជ្ជានៃការរចនារបស់យើង",
    philosophyText1: "ផ្ទាំងរូបភាពដ៏ល្អមិនគួរដណ្តើមភាពលេចធ្លោពីអိုင်ខនកម្មវិធី និង widget របស់អ្នកឡើយ ដើម្បីឱ្យអេក្រង់របស់អ្នកមានរបៀបរៀបរយ។",
    philosophyText2: "យើងយកចិត្តទុកដាក់លើតុល្យភាពនៃកម្រិតពន្លឺ និងពណ៌ ដើម្បីធានាថាវាជាផ្ទៃខាងក្រោយដ៏ស្រស់ស្អាត និងងាយស្រួលមើល។",
    
    processTitle: "ដំណើរការច្នៃប្រឌិតរបស់យើង",
    processStep1Title: "១. ការបង្កើតឡើងដោយ AI កម្រិតខ្ពស់",
    processStep1Desc: "យើងបង្កើត prompt ពិសេស និងគ្រប់គ្រងទ្រឹស្តីពណ៌ជាមួយ AI ឈានមុខគេ ដើម្បីបង្កើតគំនិតសិល្បៈប្លែកៗ។",
    processStep2Title: "២. ការជ្រើសរើសដោយដៃផ្ទាល់",
    processStep2Desc: "រាល់ផ្ទាំងរូបភាពទាំងអស់ត្រូវបានសាកល្បងដោយអ្នករចនាម៉ូដ ដើម្បីធានាថាវាពិតជាស័ក្តិសមជាផ្ទៃខាងក្រោយទូរស័ព្ទ។",
    processStep3Title: "៣. ការបង្កើនគុណភាពរូបភាព",
    processStep3Desc: "យើងកំណត់សមាមាត្ររូបភាពជា 9:16 បញ្ឈរ និងប្រើប្រាស់ទម្រង់គុណភាពខ្ពស់ (ដូចជា SVG) ដើម្បីកុំឱ្យរូបភាពបែក។",
    
    featuresTitle: "ហេតុអ្វីត្រូវជ្រើសរើស WallMobi?",
    feature1Title: "ទាញយកដោយសេរី គ្មានតម្លៃលាក់កំបាំង",
    feature1Desc: "អ្នកអាចចូលទៅកាន់ការប្រមូលផ្ដុំផ្ទាំងរូបភាពទាំងអស់បានដោយឥតគិតថ្លៃ 100% ដោយគ្មានការផ្សាយពាណិជ្ជកម្មរំខាន។",
    feature2Title: "សមស្របសម្រាប់អេក្រង់ទូរស័ព្ទ",
    feature2Desc: "រូបភាពទាំងអស់ត្រូវបានរៀបចំឡើងដើម្បីឱ្យត្រូវទៅនឹងប្រព័ន្ធកាត់តម្រឹមរបស់ iOS និង Android។",
    feature3Title: "ល្អសម្រាប់អេក្រង់ AMOLED",
    feature3Desc: "យើងមានផ្ទាំងរូបភាពពណ៌ខ្មៅដិត ដែលជួយសន្សំសំចៃថ្មទូរស័ព្ទរបស់អ្នកបានយ៉ាងច្រើន។",
    
    compatibilityTitle: "ឧបករណ៍ដែលអាចប្រើប្រាស់បាន",
    compatibilityDesc: "ផ្ទាំងរូបភាពបញ្ឈរគុណភាពខ្ពស់របស់យើងអាចប្រើប្រាស់បានយ៉ាងល្អជាមួយទូរស័ព្ទទំនើបៗរួមមាន៖",
    compatibilityList: [
      "Apple iPhone គ្រប់ជំនាន់ (រួមទាំង iPhone 15 Pro Max, 14, 13, 12, SE)",
      "Samsung Galaxy គ្រប់ស៊េរី (S24 Ultra, S23, Z Fold, Z Flip, ស៊េរី A)",
      "ទូរស័ព្ទ Google Pixel (Pixel 8 Pro, 8, 7...)",
      "ទូរស័ព្ទ Xiaomi, Redmi និង POCO",
      "OPPO, vivo, realme, OnePlus និងទូរស័ព្ទ Android ផ្សេងទៀត",
    ],
  },
};
