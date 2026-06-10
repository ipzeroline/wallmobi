import { type Locale } from "@/i18n/config";

export interface ContactInfoSection {
  heroTitle: string;
  heroSubtitle: string;
  emailCardTitle: string;
  emailCardNote: string;
  
  topic1Title: string;
  topic1Desc: string;
  topic2Title: string;
  topic2Desc: string;
  topic3Title: string;
  topic3Desc: string;

  faqTitle: string;
  faqs: { q: string; a: string }[];
}

export const CONTACT_CONTENT: Record<Locale, ContactInfoSection> = {
  th: {
    heroTitle: "ติดต่อเรา | WallMobi",
    heroSubtitle: "มีคำแนะนำ ข้อเสนอแนะ หรือคำถามเกี่ยวกับสิทธิ์การใช้งานวอลเปเปอร์ใช่ไหม? ส่งอีเมลถึงเราได้เลย ดีไซเนอร์และทีมงานของเรายินดีรับฟังทุกข้อความ",
    emailCardTitle: "อีเมลติดต่ออย่างเป็นทางการ",
    emailCardNote: "โดยทั่วไปเราจะตอบกลับภายใน 24-48 ชั่วโมง (ยกเว้นวันหยุดเสาร์-อาทิตย์)",
    
    topic1Title: "ขอธีม/สไตล์วอลเปเปอร์พิเศษ",
    topic1Desc: "หากคุณต้องการเห็นหมวดหมู่ใหม่ เช่น โทนสีพาสเทลเฉพาะตัว สไตล์ตัวละคร หรือแนวอวกาศแปลกใหม่ สามารถส่งคำขอเข้ามาได้ ทีมงาน AI Artist ของเราจะคัดเลือกไอเดียที่น่าสนใจเพื่อสร้างผลงานแจกฟรีต่อไป",
    
    topic2Title: "การสอบถามเรื่องลิขสิทธิ์และการใช้งานเชิงพาณิชย์",
    topic2Desc: "หากคุณเป็นบริษัท สตูดิโอ หรือผู้พัฒนาแอปที่ต้องการใช้งานภาพพื้นหลังของเราเพื่อวัตถุประสงค์เชิงพาณิชย์ หรือต้องการไฟล์ต้นฉบับความละเอียดสูงพิเศษ สามารถส่งอีเมลเพื่อสอบถามรายละเอียดการอนุญาตใช้งานได้",
    
    topic3Title: "การแจ้งปัญหาลิขสิทธิ์ (DMCA) และฝ่ายสนับสนุน",
    topic3Desc: "หากคุณพบรูปภาพใดที่อาจละเมิดลิขสิทธิ์ หรือมีปัญหาทางเทคนิคเกี่ยวกับการดาวน์โหลดไฟล์บนเว็บไซต์ กรุณาระบุรายละเอียด ลิงก์ที่เกี่ยวข้อง เพื่อให้ทีมงานรีบดำเนินการแก้ไขและนำออกโดยเร็วที่สุด",

    faqTitle: "คำถามที่พบบ่อยเกี่ยวกับการติดต่อเรา",
    faqs: [
      {
        q: "การขอวอลเปเปอร์เฉพาะตัวมีค่าใช้จ่ายไหม?",
        a: "ไม่มีค่าใช้จ่ายใด ๆ ครับ! หากคำขอของคุณน่าสนใจและเป็นประโยชน์ต่อผู้ใช้งานคนอื่น ๆ เราจะออกแบบและเผยแพร่ลงในแกลเลอรีให้ทุกคนสามารถดาวน์โหลดฟรี"
      },
      {
        q: "ฉันสามารถส่งผลงานวอลเปเปอร์ AI ของฉันมาร่วมเผยแพร่ได้ไหม?",
        a: "ในปัจจุบันเราเปิดรับเฉพาะผลงานที่สร้างและคัดสรรโดยทีมงานของเราเท่านั้น แต่หากคุณมีพอร์ตโฟลิโอหรือคอลเลกชันที่น่าสนใจ สามารถส่งลิงก์มาให้เราพิจารณาสำหรับการร่วมมือในอนาคตได้"
      },
      {
        q: "หากต้องการแจ้งลบรูปภาพละเมิดลิขสิทธิ์ ต้องส่งข้อมูลอะไรบ้าง?",
        a: "กรุณาส่งอีเมลระบุชื่อผู้เป็นเจ้าของลิขสิทธิ์ ลิงก์ (URL) ของรูปภาพบน WallMobi และหลักฐานการแสดงสิทธิ์ความเป็นเจ้าของ ทีมงานจะตรวจสอบและดำเนินการนำออกภายใน 24 ชั่วโมง"
      }
    ]
  },
  en: {
    heroTitle: "Contact WallMobi",
    heroSubtitle: "Have questions about licensing, feedback on wallpaper quality, or custom art suggestions? We are here to help. Reach out directly via our official channels.",
    emailCardTitle: "Official Inquiry Mailbox",
    emailCardNote: "We typically respond to all inquiries within 24 to 48 business hours.",
    
    topic1Title: "Custom Wallpaper Requests",
    topic1Desc: "Looking for a specific aesthetic, color combination, or art subject? Let us know what you want to see next on WallMobi! Our AI design team regularly reviews user requests to generate new wallpaper packs.",
    
    topic2Title: "Commercial Licensing & Partnerships",
    topic2Desc: "For commercial projects, marketing assets, app integrations, or ultra-high resolution source files, please get in touch to discuss licensing terms and collaboration opportunities.",
    
    topic3Title: "DMCA & Technical Support",
    topic3Desc: "If you notice any broken links, download errors, or wish to report a copyright concern, please email us with the direct wallpaper links. We handle technical bugs and DMCA requests with high priority.",

    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        q: "Is there a fee to request custom wallpaper themes?",
        a: "No, custom requests are 100% free! If your suggestion fits our gallery vision and would benefit other users, we will design and publish it for everyone to enjoy."
      },
      {
        q: "Can I submit my own artwork to be featured on WallMobi?",
        a: "Currently, we only host assets curated and built by our internal studio. However, if you are a digital artist, feel free to share your portfolio link for future collaboration considerations."
      },
      {
        q: "How do I report copyright infringement?",
        a: "Please email us with the subject 'DMCA Request', including the specific wallpaper URL on our site and proof of your ownership. We will review and address your request within 24 hours."
      }
    ]
  },
  vi: {
    heroTitle: "Liên hệ với WallMobi",
    heroSubtitle: "Bạn có câu hỏi về bản quyền, phản hồi về chất lượng hình nền, hoặc đề xuất thiết kế? Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn.",
    emailCardTitle: "Hòm thư hỗ trợ chính thức",
    emailCardNote: "Chúng tôi thường phản hồi các yêu cầu trong vòng 24 đến 48 giờ làm việc.",
    
    topic1Title: "Đề xuất thiết kế hình nền",
    topic1Desc: "Bạn đang tìm kiếm một phong cách, màu sắc hoặc chủ đề cụ thể? Hãy cho chúng tôi biết bạn muốn thấy gì tiếp theo! Nhóm thiết kế AI của chúng tôi sẽ xem xét để tạo ra các bộ hình nền mới.",
    
    topic2Title: "Cấp phép thương mại & Hợp tác",
    topic2Desc: "Đối với các dự án thương mại, tích hợp ứng dụng hoặc yêu cầu file gốc độ phân giải cực cao, vui lòng liên hệ để thảo luận về các điều khoản cấp phép và cơ hội hợp tác.",
    
    topic3Title: "Báo cáo bản quyền (DMCA) & Hỗ trợ kỹ thuật",
    topic3Desc: "Nếu bạn phát hiện lỗi tải xuống hoặc muốn báo cáo vấn đề bản quyền, vui lòng gửi email kèm đường dẫn chi tiết. Chúng tôi xử lý các báo cáo bản quyền với độ ưu tiên cao.",

    faqTitle: "Câu hỏi thường gặp",
    faqs: [
      {
        q: "Có mất phí khi đề xuất thiết kế hình nền không?",
        a: "Hoàn toàn miễn phí! Nếu ý tưởng của bạn phù hợp và hữu ích cho những người dùng khác, chúng tôi sẽ thiết kế và đăng tải công khai cho mọi người tải về."
      },
      {
        q: "Tôi có thể gửi tác phẩm của mình để đăng lên WallMobi không?",
        a: "Hiện tại chúng tôi chỉ đăng tải hình nền do studio nội bộ thiết kế. Tuy nhiên, nếu bạn là một nghệ sĩ kỹ thuật số, hãy chia sẻ danh mục tác phẩm của bạn để chúng tôi tham khảo hợp tác."
      },
      {
        q: "Làm thế nào để báo cáo vi phạm bản quyền?",
        a: "Vui lòng gửi email cho chúng tôi với tiêu đề 'DMCA Request', đính kèm URL hình nền cụ thể và bằng chứng sở hữu. Chúng tôi sẽ kiểm tra và gỡ bỏ trong vòng 24 giờ."
      }
    ]
  },
  lo: {
    heroTitle: "ຕິດຕໍ່ WallMobi",
    heroSubtitle: "ທ່ານມີຄຳຖາມກ່ຽວກັບສິດການນຳໃຊ້, ຂໍ້ສະເໜີແນະ ຫຼື ຄຳແນະນຳໃນການອອກແບບພາບພື້ນຫຼັງບໍ່? ພວກເຮົາພ້ອມທີ່ຈະໃຫ້ບໍລິການ.",
    emailCardTitle: "ອີເມວຕິດຕໍ່ຢ່າງເປັນທາງການ",
    emailCardNote: "ພວກເຮົາຈະຕອບກັບຂໍ້ຄວາມຂອງທ່ານພາຍໃນ 24 ຫາ 48 ຊົ່ວໂມງ.",
    
    topic1Title: "ຂໍຮູບແບບວໍເປເປີພິເສດ",
    topic1Desc: "ຫາກທ່ານຕ້ອງການເຫັນຮູບແບບ ຫຼື ໂທນສີສະເພາະໃດໜຶ່ງ, ສາມາດສົ່ງຄຳຂໍເຂົ້າມาໄດ້! ທີມງານ AI Artist ຂອງພວກເຮົາຈະຄັດເລືອກໄອເດຍເພື່ອສ້າງວໍເປເປີໃໝ່.",
    
    topic2Title: "ການນຳໃຊ້ເພື່ອການຄ້າ & ການຮ່ວມມື",
    topic2Desc: "ສຳລັບໂຄງການເພື່ອການຄ້າ, ການຕະຫຼາດ ຫຼື ຕ້ອງການໄຟລ໌ຕົ້ນສະບັບທີ່ມີຄວາມລະອຽດສູງພິເສດ, ກະລຸນາຕິດຕໍ່ພວກເຮົາເພື່ອສົນທະນາລາຍລະອຽດ.",
    
    topic3Title: "ແຈ້ງບັນຫາລິຂະສິດ & ເຕັກນິກ",
    topic3Desc: "ຫາກທ່ານພົບເຫັນລິ້ງເສຍ ຫຼື ຕ້ອງການແຈ້ງບັນຫາລິຂະສິດ, ກະລຸນາສົ່ງອີເມວພ້ອມລິ້ງທີ່ກ່ຽວຂ້ອງ. ພວກເຮົາໃຫ້ຄວາມສຳຄັນກັບບັນຫາລິຂະສິດເປັນອັນດັບຕົ້ນໆ.",

    faqTitle: "ຄຳຖາມທີ່ພົບເລື້ອຍ",
    faqs: [
      {
        q: "ມີຄ່າໃຊ້ຈ່າຍໃນການຂໍວໍເປເປີສະເພາະບໍ່?",
        a: "ບໍ່ມີຄ່າໃຊ້ຈ่ายໃດໆ! ຫາກຂໍ້ສະເໜີຂອງທ່ານເໝາະສົມ, ພວກເຮົາຈະອອກແບບ ແລະ ເຜີຍແຜ່ໃຫ້ທุกຄົນດາວໂຫຼດຟຣີ."
      },
      {
        q: "ຂ້ອຍສາມາດສົ່ງຜົນງານຂອງຕົນເອງມາລົງເວັບໄດ້ບໍ່?",
        a: "ປັດຈຸບັນພວກເຮົາເຜີຍແຜ່ສະເພາະຜົນງານທີ່ສ້າງຂຶ້ນຈາກສະຕູດິໂອຂອງພວກເຮົາເທົ່ານັ້ນ, ແຕ່ທ່ານສາມາດສົ່ງຜົນງານມາໃຫ້ພວກເຮົາເບິ່ງເພື່ອຮ່ວມມືກັນໃນອະນາຄົດໄດ້."
      },
      {
        q: "ວິທີແຈ້ງລົບຮູບພາບລະເມີດລິຂະສິດເຮັດແນວໃດ?",
        a: "ກະລຸນາສົ່ງອີເມວຫາພວກເຮົາ ໂດຍລະບຸລິ້ງຮູບພາບທີ່ລະເມີດ ແລະ ຫຼັກຖານຄວາມເປັນເຈົ້າຂອງ. ພວກເຮົາຈະກວດສອບ ແລະ ນຳອອກພາຍໃນ 24 ຊົ່ວໂມງ."
      }
    ]
  },
  km: {
    heroTitle: "ទាក់ទងមក WallMobi",
    heroSubtitle: "មានសំណួរអំពីសិទ្ធិប្រើប្រាស់ មតិយោបល់លើគុណភាពរូបភាព ឬសំណើច្នៃប្រឌិតផ្ទាំងរូបភាពមែនទេ? យើងរីករាយនឹងជួយអ្នកជានិច្ច។",
    emailCardTitle: "ប្រអប់សំបុត្រផ្លូវការ",
    emailCardNote: "ជាទូទៅយើងឆ្លើយតបក្នុងរយៈពេល ២៤ ទៅ ៤៨ ម៉ោងធ្វើការ។",
    
    topic1Title: "សំណើច្នៃប្រឌិតផ្ទាំងរូបភាពពិសេស",
    topic1Desc: "តើអ្នកកំពុងស្វែងរកស្ទីល ឬការផ្សំពណ៌ជាក់លាក់ណាមួយមែនទេ? សូមប្រាប់យើងពីអ្វីដែលអ្នកចង់ឃើញបន្ទាប់! ក្រុមការងារ AI របស់យើងនឹងបង្កើតផ្ទាំងរូបភាពថ្មីៗជូន។",
    
    topic2Title: "ការប្រើប្រាស់ក្នុងគោលបំណងពាណិជ្ជកម្ម",
    topic2Desc: "សម្រាប់គម្រោងពាណិជ្ជកម្ម ការរួមបញ្ចូលកម្មវិធី ឬត្រូវការឯកសារដើមដែលមានគុណភាពច្បាស់ខ្លាំង សូមទាក់ទងមកយើងដើម្បីពិភាក្សាអំពីកិច្ចសហការ។",
    
    topic3Title: "ការរាយការណ៍អំពីរក្សាសិទ្ធិ និងបច្ចេកទេស",
    topic3Desc: "ប្រសិនបើអ្នករកឃើញបញ្ហាបច្ចេកទេស ឬចង់រាយការណ៍អំពីបញ្ហារក្សាសិទ្ធិ សូមផ្ញើអ៊ីមែលមកយើងជាមួយ URL ជាក់លាក់។ យើងដោះស្រាយករណីរក្សាសិទ្ធិលឿនបំផុត។",

    faqTitle: "សំណួរដែលសួរញឹកញាប់",
    faqs: [
      {
        q: "តើការស្នើសុំផ្ទាំងរូបភាពពិសេសមានថ្លៃសេវាដែរឬទេ?",
        a: "ឥតគិតថ្លៃ ១០០%! ប្រសិនបើសំណើរបស់អ្នកល្អសម្រាប់អ្នកប្រើប្រាស់ទូទៅ យើងនឹងរចនា និងផ្សព្វផ្សាយវាជាសាធารណៈ។"
      },
      {
        q: "តើខ្ញុំអាចផ្ញើស្នាដៃផ្ទាល់ខ្លួនមកផ្សាយលើ WallMobi បានទេ?",
        a: "បច្ចុប្បន្នយើងផ្សាយតែផ្ទាំងរូបភាពដែលបង្កើតដោយស្ទូឌីយោផ្ទាល់ខ្លួនប៉ុណ្ណោះ។ ប៉ុន្តែប្រសិនបើអ្នកជាសិល្បករឌីជីថល អ្នកអាចផ្ញើផលប័ត្រស្នាដៃមកយើងសម្រាប់ការសហការនាពេលអនាគត។"
      },
      {
        q: "តើត្រូវរាយការណ៍អំពីការរំលោភលើរក្សាសិទ្ធិដោយរបៀបណា?",
        a: "សូមផ្ញើអ៊ីមែលមកយើងជាមួយប្រធានបទ 'DMCA Request' ដោយភ្ជាប់មកជាមួយនូវ URL រូបភាព និងភស្តុតាងកម្មសិទ្ធិ។ យើងនឹងត្រួតពិនិត្យ និងលុបចេញក្នុងរយៈពេល ២៤ ម៉ោង។"
      }
    ]
  },
  my: {
    heroTitle: "WallMobi သို့ ဆက်သွယ်ရန်",
    heroSubtitle: "လိုင်စင်အသုံးပြုမှု၊ နောက်ခံပုံများ၏ အရည်အသွေး သို့မဟုတ် ဒီဇိုင်းအသစ် တောင်းဆိုမှုများနှင့် ပတ်သက်၍ မေးခွန်းများရှိပါက ကျွန်ုပ်တို့ထံ တိုက်ရိုက် ဆက်သွယ်နိုင်ပါသည်။",
    emailCardTitle: "တရားဝင် မေးမြန်းရန် အီးမေးလ်",
    emailCardNote: "ပုံမှန်အားဖြင့် အလုပ်လုပ်ရက် ၂၄ နာရီမှ ၄၈ နာရီအတွင်း အကြောင်းပြန်ပေးပါမည်။",
    
    topic1Title: "ဒီဇိုင်းအသစ်များ တောင်းဆိုခြင်း",
    topic1Desc: "သီးခြားအရောင် သို့မဟုတ် အနုပညာပုံစံကို လိုချင်ပါသလား။ သင်မြင်တွေ့လိုသည့် ပုံစံများကို ပြောပြပေးပါ! ကျွန်ုပ်တို့၏ AI ဒီဇိုင်းအဖွဲ့က အသစ်ဖန်တီးပေးပါမည်။",
    
    topic2Title: "စီးပွားရေးဆိုင်ရာ အသုံးပြုမှုနှင့် ပူးပေါင်းဆောင်ရွက်ခြင်း",
    topic2Desc: "စီးပွားရေးလုပ်ငန်းများတွင် အသုံးပြုရန်၊ အရည်အသွေးမြင့် မူရင်းဖိုင်များ လိုအပ်ပါက လိုင်စင်စည်းကမ်းချက်များနှင့် ပူးပေါင်းဆောင်ရွက်မှုများ ဆွေးနွေးရန် ဆက်သွယ်နိုင်ပါသည်။",
    
    topic3Title: "မူပိုင်ခွင့် (DMCA) နှင့် နည်းပညာပိုင်း ဆက်သွယ်မှု",
    topic3Desc: "ဒေါင်းလုဒ်ဆွဲရာတွင် အဆင်မပြေမှု သို့မဟုတ် မူပိုင်ခွင့်ဆိုင်ရာ ကိစ္စရပ်များရှိပါက သက်ဆိုင်ရာ လင့်ခ်များနှင့်တကွ ကျွန်ုပ်တို့ထံ ဆက်သွယ်ပါ။ အမြန်ဆုံး ဖယ်ရှားပေးပါမည်။",

    faqTitle: "မကြာခဏမေးလေ့ရှိသော မေးခွန်းများ",
    faqs: [
      {
        q: "ဒီဇိုင်းတောင်းဆိုမှုအတွက် အခကြေးငွေ ပေးရပါသလား။",
        a: "လုံးဝ အခမဲ့ ဖြစ်ပါသည်! သင့်တောင်းဆိုချက်သည် အခြားအသုံးပြုသူများအတွက် အသုံးဝင်ပါက ဖန်တီးပြီး အခမဲ့ မျှဝေပေးပါမည်။"
      },
      {
        q: "ကျွန်ုပ်၏ ကိုယ်ပိုင်လက်ရာများကို WallMobi တွင် တင်နိုင်ပါသလား။",
        a: "လောလောဆယ်တွင် ကျွန်ုပ်တို့ စတူဒီယိုမှ ဖန်တီးမှုများကိုသာ တင်ပေးပါသည်။ သို့သော် သင်သည် အနုပညာရှင်တစ်ဦးဖြစ်ပါက ရှေ့ဆက်ပူးပေါင်းရန် သင့်လက်ရာများကို ပေးပို့နိုင်ပါသည်။"
      },
      {
        q: "မူပိုင်ခွင့် ချိုးဖောက်မှုကို မည်သို့ တိုင်ကြားရမည်နည်း။",
        a: "မူပိုင်ခွင့်ရှိသည့် ပုံလင့်ခ်နှင့် သက်သေအထောက်အထားများအား အီးမေးလ်ပို့ပေးပါ။ ၂၄ နာရီအတွင်း စစ်ဆေးပြီး ဖယ်ရှားပေးပါမည်။"
      }
    ]
  }
};
