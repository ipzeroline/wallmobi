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

  faqTitle: string;
  faqs: { q: string; a: string }[];
}

export const ABOUT_CONTENT: Record<Locale, AboutSection> = {
  th: {
    heroTitle: "ภาพพื้นหลังมือถือระดับพรีเมียม คัดสรรเพื่อหน้าจอของคุณ",
    heroSubtitle: "ที่ WallMobi เราผสมผสานความคิดสร้างสรรค์ของเทคโนโลยีปัญญาประดิษฐ์ (AI) เข้ากับการตรวจสอบคัดเลือกด้วยฝีมือของมนุษย์ เพื่อส่งมอบวอลเปเปอร์แนวตั้งที่ดีที่สุดให้กับสมาร์ทโฟนทุกรุ่น",
    
    philosophyTitle: "ปรัชญาการออกแบบภาพพื้นหลังมือถือของเรา",
    philosophyText1: "ภาพวอลเปเปอร์ที่ดีต้องทำหน้าที่ส่งเสริม ไม่ใช่แย่งความโดดเด่นไปจากไอคอนแอป ข้อมูลวิดเจ็ต และตัวเลขนาฬิกาบนหน้าจอมือถือของคุณ ปัจจุบันรูปภาพความละเอียดสูงบนอินเทอร์เน็ตส่วนใหญ่มีรายละเอียดที่รกเกินไป หรือมีองค์ประกอบแสงเงาที่รบกวนสายตา ส่งผลให้หน้าจอโฮมดูไม่เป็นระเบียบและทำให้อ่านชื่อแอปพลิเคชันได้ยาก",
    philosophyText2: "ที่ WallMobi เรายึดหลักการออกแบบที่ให้ความสำคัญกับคอนทราสต์ที่เหมาะสม การควบคุมระดับแสง โทนสีที่สมดุล และจุดโฟกัสที่จัดวางอย่างชาญฉลาด ดีไซเนอร์ของเราจะจำลององค์ประกอบ UI จริงวางทับบนภาพ เพื่อคัดทิ้งภาพที่รกและเก็บรักษาเฉพาะรูปภาพที่เหมาะสมและสวยงามสำหรับการใช้งานในชีวิตประจำวันอย่างแท้จริง",
    
    processTitle: "ขั้นตอนการสร้างสรรค์และการคัดกรองผลงาน",
    processStep1Title: "1. การสร้างสรรค์ด้วย Generative AI ขั้นสูง",
    processStep1Desc: "เราทำการเขียนคิวรีคีย์เวิร์ด (Prompt Crafting) และประยุกต์ทฤษฎีสีร่วมกับปัญญาประดิษฐ์ชั้นนำ เพื่อสร้างแนวคิดศิลปะดิจิทัลที่โดดเด่น ไม่ว่าจะเป็นสไตล์ 3D มินิมอล นีออน อะนิเมะ หรือ Amoled",
    processStep2Title: "2. การทดสอบด้วย Mockup ระบบปฏิบัติการจริง",
    processStep2Desc: "รูปภาพทุกชิ้นจะถูกทดสอบวางจำลองไอคอนแอปและนาฬิกาบอกเวลาของ iOS และ Android เพื่อวิเคราะห์ความกลมกลืนและความสบายตาของหน้าจอ โดยคัดเลือกภาพที่มีความลงตัวสมบูรณ์แบบที่สุดเท่านั้น",
    processStep3Title: "3. การส่งออกไฟล์คุณภาพสูงสัดส่วน 9:16",
    processStep3Desc: "เราปรับพิกเซลองค์ประกอบภาพให้อยู่ในอัตราส่วน 9:16 แนวตั้งสากล และใช้ฟอร์แมตภาพที่ไม่มีการบีบอัดคุณภาพสูง (เช่น SVG หรือ HD) ทำให้รูปภาพมีความคมชัดสูงสุดบนสมาร์ทโฟนยุคใหม่",
    
    featuresTitle: "ทำไมผู้ใช้ทั่วโลกถึงเลือกดาวน์โหลดวอลเปเปอร์จาก WallMobi?",
    feature1Title: "เข้าถึงคลังภาพฟรี 100% ไม่มีโฆษณาบังหน้าจอ",
    feature1Desc: "คุณสามารถเลือกดาวน์โหลดวอลเปเปอร์ระดับพรีเมียมทุกชิ้นในแกลเลอรีของเราได้ฟรีทันทีโดยไม่ต้องลงทะเบียนสมัครสมาชิก ไม่มีระบบจ่ายเงินปลดล็อก และไม่มีป๊อปอัปโฆษณามารบกวนเวลาดาวน์โหลด",
    feature2Title: "จัดวางตำแหน่งกึ่งกลางอย่างแม่นยำ (Perfect Centering)",
    feature2Desc: "ดีไซเนอร์ของเรากำหนดระยะปลอดภัย (Safe Zones) ให้กับจุดเด่นของภาพ เพื่อให้รองรับระบบการครอปรูปภาพอัตโนมัติและเอฟเฟกต์การเคลื่อนไหว (Parallax) ของทั้งระบบ iOS และ Android ได้อย่างสวยงาม",
    feature3Title: "คอลเลกชันประหยัดพลังงานหน้าจอ OLED/AMOLED",
    feature3Desc: "เรามีหมวดหมู่พิเศษสำหรับภาพวอลเปเปอร์ AMOLED สีดำสนิท (มีพิกเซลสีดำแท้มากกว่า 50%) ซึ่งช่วยประหยัดพลังงานแบตเตอรี่โทรศัพท์มือถือและลดความล้าของดวงตาในสภาพแสงน้อยได้อย่างดีเยี่ยม",
    
    compatibilityTitle: "การรองรับกับอุปกรณ์สมาร์ทโฟนในปัจจุบัน",
    compatibilityDesc: "วอลเปเปอร์แนวตั้งความละเอียดสูงของเรารองรับและทำงานได้อย่างสมบูรณ์แบบบนสมาร์ทโฟนและแท็บเล็ตแนวตั้งยอดนิยมทุกรุ่น:",
    compatibilityList: [
      "iPhone ทุกรุ่น (รวมถึง iPhone 15 Pro Max, 15 Pro, 14, 13, 12, SE)",
      "Samsung Galaxy ทุกซีรีส์ (S24 Ultra, S24+, S23, Z Fold, Z Flip, A-Series)",
      "Google Pixel (รวมถึง Pixel 8 Pro, 8, 7 Pro, 7a)",
      "Xiaomi, Redmi, POCO ทุกรุ่นที่ใช้หน้าจอแนวตั้งสากล",
      "OPPO, vivo, realme, OnePlus และสมาร์ทโฟนชั้นนำระบบ Android รุ่นอื่น ๆ"
    ],

    faqTitle: "คำถามที่พบบ่อยเกี่ยวกับทีมงาน WallMobi",
    faqs: [
      {
        q: "WallMobi คือใคร?",
        a: "WallMobi เป็นสตูดิโออิสระขนาดเล็กที่มีความหลงใหลในศิลปะดิจิทัลและเทคโนโลยีปัญญาประดิษฐ์ เรามุ่งมั่นที่จะพัฒนาแกลเลอรีภาพพื้นหลังแนวตั้งสำหรับสมาร์ทโฟนที่สวยงาม คมชัด และเหมาะกับการใช้งานจริงในชีวิตประจำวันฟรีสำหรับทุกคน"
      },
      {
        q: "วอลเปเปอร์บนเว็บดาวน์โหลดฟรีจริงหรือ มีเงื่อนไขอะไรบ้าง?",
        a: "ฟรี 100% ครับ! ภาพพื้นหลังทั้งหมดในระบบได้รับการปรับขนาดให้พอดีกับหน้าจอมือถือโดยเฉพาะ คุณสามารถดาวน์โหลดเพื่อนำไปใช้ตกแต่งหน้าจอโทรศัพท์ แท็บเล็ต หรืออุปกรณ์ดิจิทัลส่วนตัวของคุณได้ฟรีโดยไม่มีเงื่อนไขและไม่มีโฆษณารบกวน"
      },
      {
        q: "ทางสตูดิโออัปเดตวอลเปเปอร์ใหม่บ่อยแค่ไหน?",
        a: "เราทำการคัดเลือก ออกแบบ และอัปเดตวอลเปเปอร์ใหม่ ๆ เข้าสู่ระบบเป็นประจำทุกสัปดาห์ เพื่อให้คุณมีตัวเลือกที่ทันสมัยและหลากหลายตามเทรนด์อยู่เสมอ"
      }
    ]
  },
  en: {
    heroTitle: "Premium Mobile Wallpapers, Curated for Your Screen",
    heroSubtitle: "At WallMobi, we combine AI-driven creativity with human curation to deliver the absolute best portrait wallpapers for modern smartphones.",
    
    philosophyTitle: "Our Wallpaper Design Philosophy",
    philosophyText1: "A great wallpaper should elevate your phone's screen, not fight your app icons and widgets. Many high-resolution images online are too busy, causing readability issues and visual clutter on your home screen.",
    philosophyText2: "At WallMobi, we focus on balanced contrast, calm focal points, and harmonious color palettes. We test every image to ensure it serves as a peaceful, beautiful background that plays nice with your notifications and clock.",
    
    processTitle: "Our Curation & Creative Process",
    processStep1Title: "1. Advanced AI Generation",
    processStep1Desc: "We craft custom prompts and leverage state-of-the-art AI generators with strict color theory to produce unique artistic concepts, from minimalist abstracts to neon cyberpunks.",
    processStep2Title: "2. Real-World Curation & Mocking",
    processStep2Desc: "Every wallpaper is human-selected. We test mockups with UI overlays, discarding overly busy graphics and keeping only those that feel natural and functional as actual backgrounds.",
    processStep3Title: "3. Precision Curation & 9:16 Optimization",
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
      "OPPO, vivo, realme, OnePlus, and other popular Android devices"
    ],

    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        q: "What is WallMobi?",
        a: "WallMobi is an independent digital art studio specializing in high-resolution, AI-generated wallpapers. We hand-curate, test, and scale portrait background art specifically tailored for smartphone home and lock screens."
      },
      {
        q: "Are the wallpapers really free?",
        a: "Yes! All wallpapers on WallMobi are 100% free to download for personal device personalization with no hidden fees, paywalls, or registrations."
      },
      {
        q: "How often do you add new wallpapers?",
        a: "We regularly update our catalog with fresh designs and categories every week, ensuring a steady stream of trending digital backdrops."
      }
    ]
  },
  vi: {
    heroTitle: "Hình nền điện thoại cao cấp, tuyển chọn cho màn hình của bạn",
    heroSubtitle: "Tại WallMobi, chúng tôi kết hợp sự sáng tạo của AI với sự tuyển chọn của con người để mang lại những hình nền dọc tốt nhất cho điện thoại thông minh.",
    
    philosophyTitle: "Triết lý thiết kế hình nền của chúng tôi",
    philosophyText1: "Một hình nền tuyệt vời nên làm nổi bật màn hình điện thoại của bạn, chứ không phải tranh chấp với các biểu tượng ứng dụng và tiện ích của bạn. Nhiều hình ảnh trực tuyến quá rối mắt, làm mất độ tập trung.",
    philosophyText2: "Tại WallMobi, chúng tôi tập trung vào độ tương phản cân bằng, các điểm lấy nét yên tĩnh và bảng màu hài hòa để đảm bảo hình nền hoạt động tốt với giao diện hệ thống thực tế.",
    
    processTitle: "Quy trình sáng tạo và tuyển chọn",
    processStep1Title: "1. Tạo bằng AI nâng cao",
    processStep1Desc: "Chúng tôi viết các câu lệnh tùy chỉnh và tận dụng các công nghệ AI hàng đầu để tạo ra các khái niệm nghệ thuật độc đáo.",
    processStep2Title: "2. Tuyển chọn & Giả lập UI",
    processStep2Desc: "Mỗi hình nền đều được con người lựa chọn và thử nghiệm với các lớp phủ ứng dụng trên iOS và Android để đảm bảo tính thực tiễn cao.",
    processStep3Title: "3. Tối ưu hóa độ phân giải 9:16",
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
      "OPPO, vivo, realme, OnePlus và các thiết bị Android khác"
    ],

    faqTitle: "Câu hỏi thường gặp về WallMobi",
    faqs: [
      {
        q: "WallMobi là gì?",
        a: "WallMobi là một studio nghệ thuật kỹ thuật số độc lập chuyên về hình nền di động do AI tạo ra. Chúng tôi tuyển chọn, thử nghiệm và tối ưu hóa hình ảnh để làm hình nền điện thoại chất lượng cao."
      },
      {
        q: "Các hình nền có thực sự miễn phí không?",
        a: "Đúng vậy! Tất cả hình nền trên WallMobi đều miễn phí 100% để tải xuống và sử dụng cá nhân mà không cần đăng ký hoặc trả phí."
      },
      {
        q: "Các thiết kế mới được cập nhật bao lâu một lần?",
        a: "Chúng tôi cập nhật các bộ sưu tập và thiết kế mới hàng tuần để bạn luôn có những lựa chọn hình nền hợp xu hướng."
      }
    ]
  },
  my: {
    heroTitle: "သင့်ဖုန်းမျက်နှာပြင်အတွက် အထူးရွေးချယ်ထားသော နောက်ခံပုံများ",
    heroSubtitle: "WallMobi တွင် ကျွန်ုပ်တို့သည် AI နည်းပညာနှင့် လူသားတို့၏ စိစစ်ရွေးချယ်မှုကို ပေါင်းစပ်ကာ ခေတ်မီစမတ်ဖုန်းများအတွက် အကောင်းဆုံးနောက်ခံပုံများကို ပေးစွမ်းပါသည်။",
    
    philosophyTitle: "ကျွန်ုပ်တို့၏ ဖုန်းနောက်ခံပုံ ဒီဇိုင်းအတွေးအခေါ်",
    philosophyText1: "ကောင်းမွန်သောနောက်ခံပုံသည် ဖုန်းမျက်နှာပြင်ကို ပိုမိုလှပစေရမည်ဖြစ်ပြီး အိုင်ကွန်များနှင့် ဝစ်ဂျက်များ၏ မြင်ကွင်းကို မနှောင့်ယှက်စေရပါ။",
    philosophyText2: "ကျွန်ုပ်တို့သည် သင့်ဖုန်း၏နာရီနှင့် အိုင်ကွန်များကို လိုက်ဖက်ညီစွာ ပြသနိုင်ရန် အရောင်အသွေးနှင့် အလင်းအမှောင်တို့ကို အထူးစမ်းသပ်ပြုလုပ်ပါသည်။",
    
    processTitle: "ကျွန်ုပ်တို့၏ ဖန်တီးမှုနှင့် စိစစ်မှုလုပ်ငန်းစဉ်",
    processStep1Title: "၁။ အဆင့်မြင့် AI ဖြင့် ဖန်တီးခြင်း",
    processStep1Desc: "ကျွန်ုပ်တို့သည် ဆန်းသစ်သော အနုပညာဒီဇိုင်းများ ဖန်တီးရန် ခေတ်မီဆန်းသစ်သော AI နည်းပညာများကို အသုံးပြုပါသည်။",
    processStep2Title: "၂။ UI စမ်းသပ်ခြင်းနှင့် လူသားကိုယ်တိုင် စိစစ်ခြင်း",
    processStep2Desc: "နောက်ခံပုံတစ်ခုချင်းစီကို အမှန်တကယ်အသုံးပြုရန် သင့်တော်မှုရှိမရှိကို UI အလွှာများဖြင့် စမ်းသပ်စစ်ဆေးပါသည်။",
    processStep3Title: "၃။ ၉:၁၆ အချိုးအစား အကောင်းဆုံးပြင်ဆင်ခြင်း",
    processStep3Desc: "ဖုန်းအမျိုးမျိုးတွင် ပုံထွက်ကြည်လင်စေရန် ဒေါင်လိုက်အချိုးအစားနှင့် အရည်အသွေးမြင့် ဖော်မက်များ (ဥပမာ SVG) ဖြင့် ပြုလုပ်ထားပါသည်။",
    
    featuresTitle: "ဘာကြောင့် WallMobi ကို ရွေးချယ်သင့်သလဲ။",
    feature1Title: "လုံးဝအခမဲ့ဖြစ်ပြီး မှတ်ပုံတင်ရန်မလိုပါ",
    feature1Desc: "ကျွန်ုပ်တို့၏ ပရီမီယံနောက်ခံပုံများအားလုံးကို မည်သည့်ကြော်ငြာနှင့် ဝှက်ထားသောအခကြေးငွေမျှမရှိဘဲ အလွယ်တကူ ဒေါင်းလုဒ်ဆွဲနိုင်ပါသည်။",
    feature2Title: "ကိုက်ညီသော အချိုးအစားနှင့် အလယ်ဗဟိုကျခြင်း",
    feature2Desc: "iOS နှင့် Android ဖုန်းအမျိုးမျိုး၏ စနစ်များနှင့် အလိုအလျောက်ကိုက်ညီအောင် ညှိထားပါသည်။",
    feature3Title: "AMOLED မျက်နှာပြင်များအတွက် သင့်တော်ခြင်း",
    feature3Desc: "အနက်ရောင်နောက်ခံပုံများသည် AMOLED ဖုန်းများ၏ ဘက်ထရီသက်တမ်းကို သက်သာစေရန် ကူညီပေးပါသည်။",
    
    compatibilityTitle: "အသုံးပြုနိုင်သော ဖုန်းအမျိုးအစားများ",
    compatibilityDesc: "ကျွန်ုပ်တို့၏ နောက်ခံပုံများသည် အောက်ပါခေတ်မီဖုန်းမျက်နှာပြင်များအားလုံးနှင့် ကိုက်ညီမှုရှိပါသည် -",
    compatibilityList: [
      "Apple iPhone အားလုံး (iPhone 15 Pro Max, 14, 13, 12, SE စသည်)",
      "Samsung Galaxy စီးရီးများ (S24 Ultra, S24+, S23, Z Fold, Z Flip, A-Series)",
      "Google Pixel ဖုန်းများ (Pixel 8 Pro, 8, 7 စသည်)",
      "Xiaomi, Redmi နှင့် POCO ဖုန်းများ",
      "OPPO, vivo, realme, OnePlus နှင့် အခြား Android ဖုန်းများ"
    ],

    faqTitle: "WallMobi ဆိုင်ရာ မကြာခဏမေးလေ့ရှိသော မေးခွန်းများ",
    faqs: [
      {
        q: "WallMobi ဆိုတာ ဘာလဲ။",
        a: "WallMobi သည် ဖုန်းနောက်ခံပုံများကို AI နည်းပညာဖြင့် ဖန်တီးကာ အကောင်းဆုံးစစ်ဆေးရွေးချယ်ပေးသည့် လွတ်လပ်သော ဒီဂျစ်တယ်အနုပညာ စတူဒီယိုတစ်ခု ဖြစ်ပါသည်။"
      },
      {
        q: "နောက်ခံပုံများက တကယ်ပဲ အခမဲ့လား။",
        a: "ဟုတ်ကဲ့! WallMobi ရှိ ပုံအားလုံးသည် ကိုယ်ပိုင်ဖုန်းများတွင် အသုံးပြုရန် ၁၀၀% လုံးဝ အခမဲ့ ဖြစ်ပြီး မည်သည့်ဝန်ဆောင်ခမျှ မရှိပါ။"
      },
      {
        q: "ပုံအသစ်များကို မည်မျှကြာတစ်ကြိမ် တင်ပေးပါသလဲ။",
        a: "ကျွန်ုပ်တို့သည် အပတ်စဉ် နောက်ခံပုံဒီဇိုင်းသစ်များနှင့် အမျိုးအစားသစ်များကို စဉ်ဆက်မပြတ် တင်ပေးနေပါသည်။"
      }
    ]
  },
  lo: {
    heroTitle: "ວໍເປເປີມືຖືລະດັບພຣີມຽມ ຄັດສັນເພື່ອໜ້າຈໍຂອງທ່ານ",
    heroSubtitle: "ຢູ່ WallMobi ພວກເຮົາມີການປະສົມປະສານຄວາມຄິດສ້າງສັນຂອງ AI ແລະ ການຄັດເລືອກດ້ວຍມືຂອງມະນຸດ ເພື່ອມອບວໍເປເປີແນວຕັ້ງທີ່ດີທີ່ສຸດໃຫ້ກັບມືຖືທຸກລຸ້ນ.",
    
    philosophyTitle: "ປັດຊະຍາການອອກແບບວໍເປເປີຂອງພວກເຮົາ",
    philosophyText1: "ວໍເປເປີທີ່ດີຕ້ອງບໍ່ແຍ່ງຄວາມໂດດເດັ່ນໄປຈາກໄອຄອນແອັບ ແລະ ວິດເຈັດຂອງທ່ານ ເພື່ອໃຫ້ໜ້າຈໍໂຮມເບິ່ງເປັນລະບຽບ.",
    philosophyText2: "ພວກເຮົາໃຫ້ຄວາມສຳຄັນກັບຄວາມສົມດຸນຂອງຄອນທຣາສ, ໂທນສີທີ່ສະຫງົບຕາ ແລະ ເຂົ້າກັນໄດ້ດີກັບລະບົບການສະແດງຜົນຂອງມືຖື.",
    
    processTitle: "ຂັ້ນຕອນການສ້າງສັນ ແລະ ຄັດເລືອກຜົນງານ",
    processStep1Title: "1. ການສ້າງສັນດ້ວຍ AI ຂັ້ນສູງ",
    processStep1Desc: "ພວກເຮົາຂຽນ prompt ແລະ ຄວບຄຸມໂທນສີຮ່ວມກັບ AI ລະດັບແນວໜ້າ ເພື່ອສ້າງສັນແນວຄິດສິລະປະທີ່ເປັນເອກະລັກ.",
    processStep2Title: "2. ການທົດສອບກັບ UI ລະບົບແທ້",
    processStep2Desc: "ຮູບທຸກໃບຈະຖືກທົດສອບການວາງໄອຄອນເພື່ອຮັບປະກັນວ່າມັນເໝາະສົມທີ່ຈະເປັນພາບພື້ນຫຼັງແທ້ໆ.",
    processStep3Title: "3. ການປັບຂະໜາດ 9:16 ທີ່ຄົມຊັດ",
    processStep3Desc: "ພວກເຮົາຈັດອັດຕາສ່ວນໃຫ້ເປັນ 9:16 ແນວຕັ້ງ ແລະ ໃຊ້ຟໍແມັດຄຸນນະພາບສູງ (ເຊັ່ນ SVG) ເພື່ອໃຫ້ຮູບຄົມຊັດທີ່ສຸດ.",
    
    featuresTitle: "ເປັນຫຍັງຕ້ອງເລືອກ WallMobi?",
    feature1Title: "ດາວໂຫຼດຟຣີ ບໍ່ມີຄ່າໃຊ້ຈ່າຍເພີ່ມເຕີມ",
    feature1Desc: "ທ່ານສາມາດເຂົ້າເຖິງຄໍເລັກຊັນທັງໝົດໄດ້ຟຣີ 100% ໂດຍບໍ່ມີໂຄສະນາລົບກວນ ຫຼື ຕ້ອງສະໝັກສະມາຊິກ.",
    feature2Title: "ປັບຂະໜາດໃຫ້ພໍດີກັບໜ້າຈໍ",
    feature2Desc: "ຮູບທັງໝົດຖືກຈັດວາງຕຳແໜ່ງຢ່າງເໝາະສົມເພື່ອໃຫ້ເຂົ້າກັບລະບົບການຄອບຕັດຂອງ iOS ແລະ Android.",
    feature3Title: "ເປັນມິດກັບໜ້າຈໍ AMOLED",
    feature3Desc: "ພວກເຮົາຄໍເລັກຊັນພາບໂທນມືດທີ່ຊ່ວยປະຢັດພະລັງງານ ແລະ ຍືດອາຍຸການໃຊ້ງານແບັດເຕີຣີມືຖືຂອງທ່ານ.",
    
    compatibilityTitle: "ອຸປະກອນມືຖືທີ່ຮອງຮັບ",
    compatibilityDesc: "ວໍເປເປີແນວຕັ້ງຄວາມລະອຽດສູງຂອງພວກເຮົານັ້ນເໝາະສົມກັບໜ້າຈໍຂອງມືຖືລຸ້ນໃໝ່ທຸກລຸ້ນ:",
    compatibilityList: [
      "iPhone ທຸກລຸ້ນ (ລວມທັງ iPhone 15 Pro Max, 14, 13, 12, SE)",
      "Samsung Galaxy ທຸກຊີຣີ (S24 Ultra, S23, ຕະກູນ Z ແລະ A)",
      "Google Pixel (Pixel 8 Pro, 8, 7...)",
      "Xiaomi, Redmi ແລະ POCO ທຸກລຸ້ນ",
      "OPPO, vivo, realme, OnePlus ແລະມືຖື Android ອື່ນໆ"
    ],

    faqTitle: "ຄຳຖາມທີ່ພົບເລື້ອຍກ່ຽວກັບ WallMobi",
    faqs: [
      {
        q: "WallMobi ແມ່ນຫຍັງ?",
        a: "WallMobi ແມ່ນສະຕູດິໂອສິລະປະດິຈິຕອນອິດສະຫຼະ ທີ່ຊ່ຽວຊານໃນການສ້າງວໍເປເປີມືຖືດ້ວຍ AI ທີ່ມີຄວາມລະອຽດສູງ. ພວກເຮົາຄັດເລືອກ, ທົດສອບ ແລະ ປັບຂະໜາດໃຫ້ພໍດີກັບໜ້າຈໍມືຖື."
      },
      {
        q: "ວໍເປເປີໃນເວັບໄຊດາວໂຫຼດຟຣີແທ້ບໍ່?",
        a: "ແມ່ນແລ້ວ! ວໍເປເປີທັງໝົດໃນ WallMobi ແມ່ນຟຣີ 100% ສຳລັບການໃຊ້ງານສ່ວນຕົວ ໂດຍບໍ່ມີຄ່າໃຊ້ຈ່າຍເພີ່ມເຕີມ."
      },
      {
        q: "ມີການອັບເດດວໍເປເປີໃໝ່ເລື້ອຍປານໃດ?",
        a: "ພວກເຮົາອັບເດດຮູບແບບ ແລະ ໝວດໝູ່ໃໝ່ໆເປັນປະຈຳທຸກອາທິດ ເພື່ອໃຫ້ທ່ານມີຕົວເລືອກທີ່ທັນສະໄໝສະເໝີ."
      }
    ]
  },
  km: {
    heroTitle: "ផ្ទាំងរូបភាពទូរស័ព្ទកម្រិតខ្ពស់ សម្រិតសម្រាំងសម្រាប់អេក្រង់របស់អ្នក",
    heroSubtitle: "នៅ WallMobi យើងរួមបញ្ចូលគ្នានូវភាពច្នៃប្រឌិតរបស់ AI ជាមួយនឹងการជ្រើសរើសដោយដៃរបស់មនុស្ស ដើម្បីផ្តល់នូវផ្ទាំងរូបភាពបញ្ឈរដ៏ល្អបំផុត។",
    
    philosophyTitle: "ទស្សនវិជ្ជានៃការរចនាផ្ទាំងរូបភាពរបស់យើង",
    philosophyText1: "ផ្ទាំងរូបភាពដ៏ល្អមិនควรដណ្តើមភាពលេចធ្លោពីអိုင်ខនកម្មវិធី និង widget របស់អ្នកឡើយ ដើម្បីឱ្យអេក្រង់របស់អ្នកមានរបៀបរៀបរយ។",
    philosophyText2: "យើងយកចិត្តទុកដាក់លើតុល្យภาพនៃកម្រិតពន្លឺ និងពណ៌ ដើម្បីធានាថាវាជាផ្ទៃខាងក្រោយដ៏ស្រស់ស្អាត និងងាយស្រួលមើល។",
    
    processTitle: "ដំណើរការច្នៃប្រឌិត និងការកែសម្រួលរូបភាព",
    processStep1Title: "១. ការបង្កើតឡើងโดย AI កម្រិតខ្ពស់",
    processStep1Desc: "យើងបង្កើត prompt ពិសេស និងគ្រប់គ្រងទ្រឹស្តីពណ៌ជាមួយ AI ឈានមុខគេ ដើម្បីបង្កើតគំនិតសិល្បៈប្លែកៗ။",
    processStep2Title: "២. ការធ្វើ Mockup និងជ្រើសរើសដោយដៃផ្ទាល់",
    processStep2Desc: "រាល់ផ្ទាំងរូបភាពទាំងអស់ត្រូវបានសាកល្បងជាមួយ UI overlay ដើម្បីធានាថាវាពិតជាស័ក្តិសមជាផ្ទៃខាងក្រោយទូរស័ព្ទ។",
    processStep3Title: "៣. ការកំណត់ទំហំ 9:16 ឱ្យច្បាស់ល្អ",
    processStep3Desc: "យើងกำหนดសមាមាត្ររូបភាពជា 9:16 បញ្ឈរ និងប្រើប្រាស់ទម្រង់គុណភាពខ្ពស់ (ដូចជា SVG) ដើម្បីកុំឱ្យរូបភាពបែក។",
    
    featuresTitle: "ហេតុអ្វីត្រូវជ្រើសរើស WallMobi?",
    feature1Title: "ទាញយកដោយសេរី គ្មានតម្លៃលាក់កំបាំង",
    feature1Desc: "អ្នកអាចចូលទៅកាន់ការប្រមូលផ្ដុំផ្ទាំងរូបភាពទាំងអស់បានដោយឥតគិតថ្លៃ 100% ដោយគ្មានការផ្សាយពាណិជ្ជកម្មរំខាន។",
    feature2Title: "សមស្របសម្រាប់អេក្រង់ទូរស័ព្ទ",
    feature2Desc: "រូបភាពទាំងអស់ត្រូវបានរៀបចំឡើងដើម្បីឱ្យត្រូវទៅនឹងប្រព័ន្ធកាត់តម្រឹមរបស់ iOS และ Android។",
    feature3Title: "ល្អសម្រាប់អេក្រង់ AMOLED",
    feature3Desc: "យើងមានផ្ទាំងរូបភាពពណ៌ខ្មៅដិត ដែលជួយសន្សំសំចៃថ្មទូរស័ព្ទរបស់អ្នកបានយ៉ាងច្រើន။",
    
    compatibilityTitle: "ឧបករណ៍ដែលអាចប្រើប្រាស់បាន",
    compatibilityDesc: "ផ្ទាំងរូបភាពបញ្ឈរគុណភាពខ្ពស់របស់យើងអាចប្រើប្រាស់បានយ៉ាងល្អជាមួយទูរស័ព្ទទំនើបៗរួមមាន៖",
    compatibilityList: [
      "Apple iPhone គ្រប់ជំនាន់ (រួមទាំង iPhone 15 Pro Max, 14, 13, 12, SE)",
      "Samsung Galaxy គ្រប់ស៊េរី (S24 Ultra, S23, Z Fold, Z Flip, ស៊េរី A)",
      "ទូរស័ព្ទ Google Pixel (Pixel 8 Pro, 8, 7...)",
      "ទូរស័ព្ទ Xiaomi, Redmi និង POCO",
      "OPPO, vivo, realme, OnePlus និងទូរស័ព្ទ Android ផ្សេងទៀត"
    ],

    faqTitle: "សំណួរដែលសួរញឹកញាប់អំពី WallMobi",
    faqs: [
      {
        q: "តើ WallMobi ជាអ្វី?",
        a: "តើ WallMobi ជាអ្វី? WallMobi គឺជាស្ទូឌីយោសិល្បៈឌីជីថលឯករាជ្យមួយដែលបង្កើតផ្ទាំងរូបភាពបញ្ឈរគុណភាពខ្ពស់ដោយ AI។ យើងជ្រើសរើស សាកល្បង និងរៀបចំទំហំឱ្យត្រូវនឹងអេក្រង់ទូរស័ព្ទដៃរបស់លោកអ្នក។"
      },
      {
        q: "តើផ្ទាំងរូបភាពទាំងអស់ពិតជាឥតគិតថ្លៃមែនទេ?",
        a: "ពិតប្រាកដណាស់! ផ្ទាំងរូបភាពទាំងអស់ត្រូវបានអនុញ្ញាតឱ្យទាញយកដោយសេរី ១០០% សម្រាប់ឧបករណ៍ផ្ទាល់ខ្លួនដោយគ្មានការបង់ថ្លៃណាមួយឡើយ។"
      },
      {
        q: "តើមានการអាប់ដេតផ្ទាំងរូបភាពថ្មីៗញឹកញាប់ប៉ុណ្ណា?",
        a: "យើងធ្វើការអាប់ដេត និងបន្ថែមរចនាប័ទ្មផ្ទាំងរូបភាពថ្មីៗជារៀងរាល់សប្តាហ៍ ដើម្បីធានាបាននូវជម្រើសទាន់សម័យជានិច្ច။"
      }
    ]
  }
};
