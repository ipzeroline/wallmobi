import { type Locale } from "@/i18n/config";

export interface LicenseDetailSection {
  heroTitle: string;
  heroSubtitle: string;
  
  canTitle: string;
  canItems: string[];
  
  dontTitle: string;
  dontItems: string[];
  
  section1Title: string;
  section1Content: string;
  
  section2Title: string;
  section2Content: string;
  
  section3Title: string;
  section3Content: string;
  
  faqTitle: string;
  faqs: { q: string; a: string }[];
}

export const LICENSE_CONTENT: Record<Locale, LicenseDetailSection> = {
  th: {
    heroTitle: "เงื่อนไขและข้อกำหนดการใช้งานลิขสิทธิ์ภาพ | WallMobi",
    heroSubtitle: "ข้อมูลสิทธิ์การอนุญาตใช้ภาพวอลเปเปอร์สำหรับหน้าจอมือถือ ข้อตกลงการใช้งานส่วนบุคคล และเงื่อนไขการนำไปใช้ในเชิงพาณิชย์อย่างละเอียดเพื่อให้ถูกต้องตามกฎหมาย",
    canTitle: "ขอบเขตการใช้งานที่อนุญาต (สิ่งที่ทำได้)",
    canItems: [
      "ใช้เป็นภาพวอลเปเปอร์หน้าจอโฮมและหน้าจอล็อกบนอุปกรณ์ส่วนตัว เช่น iPhone, iPad, Android และแท็บเล็ตได้ไม่จำกัดจำนวนเครื่อง",
      "ดาวน์โหลดและจัดเก็บไฟล์รูปภาพไว้ในอุปกรณ์ของคุณเพื่อการใช้งานส่วนบุคคลโดยไม่มีค่าใช้จ่ายหรือค่าลิขสิทธิ์ย้อนหลังใด ๆ",
      "ใช้เป็นภาพพื้นหลังในการนำเสนอผลงานที่ไม่แสวงหาผลกำไร หรือตกแต่งโปรเจกต์ส่วนตัวที่ไม่ได้ทำเพื่อการค้า",
      "แชร์ลิงก์ของเว็บไซต์ WallMobi.com บนโซเชียลมีเดียหรือฟอรัมต่าง ๆ เพื่อแบ่งปันให้เพื่อนดาวน์โหลดได้โดยตรง"
    ],
    dontTitle: "ข้อจำกัดและการใช้งานที่ไม่ได้รับอนุญาต (สิ่งที่ห้ามทำ)",
    dontItems: [
      "ห้ามนำไฟล์ภาพต้นฉบับไปจำหน่ายต่อ ขายต่อ แจกจ่าย หรือหารายได้ในลักษณะของชุดวอลเปเปอร์ (Wallpaper Pack) หรือสิ่งของดิจิทัลอื่น ๆ",
      "ห้ามนำรูปภาพไปใช้เป็นส่วนหนึ่งของเครื่องหมายการค้า โลโก้แบรนด์ หรือจดสิทธิบัตรการออกแบบผลิตภัณฑ์",
      "ห้ามอ้างสิทธิ์การเป็นเจ้าของ การเป็นผู้สร้างสรรค์ผลงานภาพวอลเปเปอร์เหล่านี้แต่เพียงผู้เดียว",
      "ห้ามทำการดูดข้อมูลหรือดึงภาพทั้งหมดของ WallMobi ไปสร้างเป็นเว็บไซต์หรือแอปพลิเคชันแจกภาพพื้นหลังเพื่อแข่งขันโดยตรง"
    ],
    section1Title: "สถานะลิขสิทธิ์ของภาพที่สร้างด้วยปัญญาประดิษฐ์ (AI-Generated Art & Copyright)",
    section1Content: "ผลงานวอลเปเปอร์ทั้งหมดบนเว็บไซต์ WallMobi สร้างสรรค์โดยใช้เทคโนโลยีปัญญาประดิษฐ์ (AI) ผนวกกับการคัดกรองและปรับแต่งองค์ประกอบโดยดีไซเนอร์ ตามกฎหมายลิขสิทธิ์สากลในปัจจุบัน ภาพที่สร้างด้วยปัญญาประดิษฐ์โดยตรงอาจไม่มีสิทธิ์ได้รับการคุ้มครองลิขสิทธิ์แบบผูกขาดแต่เพียงผู้เดียว อย่างไรก็ตาม ข้อกำหนดการใช้งานนี้มีขึ้นเพื่อรักษาความปลอดภัยของระบบ และสนับสนุนให้ผู้ใช้งานได้เข้าถึงภาพพื้นหลังที่มีคุณภาพดีที่สุดอย่างเท่าเทียม",
    section2Title: "การนำไปใช้งานในเชิงพาณิชย์และการระบุแหล่งที่มา (Commercial Use & Attribution)",
    section2Content: "การใช้ภาพพื้นหลังเพื่อตั้งค่าส่วนบุคคลบนโทรศัพท์มือถือสามารถทำได้ฟรี 100% สำหรับการใช้งานเชิงพาณิชย์ทั่วไป (เช่น นำไปเป็นภาพประกอบในบทความ เว็บไซต์ หรือวิดีโอ YouTube ที่สร้างรายได้) คุณสามารถใช้งานได้โดยไม่จำเป็นต้องระบุแหล่งที่มา แต่เพื่อสนับสนุนโครงการเล็ก ๆ ของเรา การใส่เครดิตหรือลิงก์กลับมายัง WallMobi.com จะเป็นพระคุณอย่างยิ่ง สำหรับรูปภาพที่เป็นลายเส้นจำลองตัวละครหรือแบรนด์ที่มีอยู่จริง โปรดระมัดระวังในการใช้งานเชิงพาณิชย์เพื่อหลีกเลี่ยงความเสี่ยงทางกฎหมาย",
    section3Title: "การแจ้งลบภาพละเมิดลิขสิทธิ์ (DMCA & Content Removal)",
    section3Content: "เรามุ่งมั่นที่จะเคารพสิทธิ์ในทรัพย์สินทางปัญญาของผู้อื่น หากคุณเป็นเจ้าของลิขสิทธิ์หรือตัวแทนที่ได้รับมอบอำนาจ และพบว่ามีรูปภาพใดบนเว็บไซต์ WallMobi ละเมิดสิทธิ์ของคุณหรือถูกใช้โดยไม่ได้รับอนุญาต โปรดส่งคำร้องขอแจ้งลบภาพ (DMCA) พร้อมแนบหลักฐานความเป็นเจ้าของและลิงก์ของรูปภาพที่เกี่ยวข้องมาที่อีเมล funmask101@gmail.com ทีมงานของเราจะทำการตรวจสอบและนำรูปภาพนั้นออกจากระบบภายใน 24 ชั่วโมง",
    faqTitle: "คำถามที่พบบ่อยเกี่ยวกับสิทธิ์การใช้งาน",
    faqs: [
      {
        q: "ฉันสามารถใช้วอลเปเปอร์เหล่านี้ประกอบในวิดีโอ YouTube ที่เปิดสร้างรายได้ได้ไหม?",
        a: "ได้ครับ! คุณสามารถใช้วอลเปเปอร์ของเราเป็นภาพพื้นหลังหรือส่วนประกอบในวิดีโอสตรีมมิ่ง หรือสื่อวิดีโอสร้างรายได้ได้โดยไม่มีค่าลิขสิทธิ์ย้อนหลัง"
      },
      {
        q: "สามารถนำภาพไปตัดต่อ ปรับแต่งสี หรือแก้ไของค์ประกอบเพื่อใช้ส่วนตัวได้หรือไม่?",
        a: "สามารถทำได้ครับ คุณสามารถครอบตัด ปรับสี หรือดัดแปลงองค์ประกอบภาพเพื่อให้เข้ากับหน้าจอและธีมโทนสีมือถือของคุณได้ตามต้องการ"
      },
      {
        q: "จำเป็นต้องระบุชื่อผู้สร้างหรือใส่เครดิตลิงก์กลับมาไหม?",
        a: "ไม่บังคับครับ! แต่หากคุณนำไปใช้ในสื่อสาธารณะ การใส่ลิงก์กลับมายังเรา (เช่น 'Background by WallMobi.com') จะช่วยสนับสนุนสตูดิโอเล็ก ๆ ของเราให้มีแรงสร้างสรรค์ผลงานฟรีต่อไปได้เป็นอย่างมาก"
      }
    ]
  },
  en: {
    heroTitle: "License & Terms of Use | WallMobi",
    heroSubtitle: "Detailed licensing terms for WallMobi mobile wallpapers, personal devices agreement, and commercial usage guidelines.",
    canTitle: "Allowed Personal & Creative Uses",
    canItems: [
      "Use as home screen or lock screen wallpaper on an unlimited number of personal devices including iPhones, iPads, Android smartphones, and tablets.",
      "Download and store wallpaper assets on your local devices for personal use completely free of charge.",
      "Incorporate wallpapers as background visuals in non-commercial presentations, academic projects, or personal digital designs.",
      "Share direct links to WallMobi.com pages on social media or forums to share wallpapers with friends."
    ],
    dontTitle: "Prohibited Actions & Restrictions",
    dontItems: [
      "Sell, resell, sublicense, or redistribute wallpaper files in their original form as standalone assets or digital wallpaper packs on any platform.",
      "Use these wallpaper designs as logos, trademarks, or registered design patents for any commercial brand.",
      "Claim sole ownership, copyright, or authorship of the artwork provided on this site.",
      "Scrape or mass-download the library to build competing wallpaper directory websites or apps."
    ],
    section1Title: "AI-Generated Art & Copyright Status",
    section1Content: "Every wallpaper on WallMobi is generated using state-of-the-art AI models, then hand-curated and enhanced by human designers. Under international copyright regulations, purely AI-generated graphics generally lack copyright protection. While this makes them free for personal enjoyment, our terms of use exist to prevent malicious redistribution and ensure everyone has fair, open access to quality wallpaper sets.",
    section2Title: "Commercial Usage & Attribution",
    section2Content: "Using wallpapers to personalize your phone is 100% free. If you want to use our designs as backgrounds for commercial media (such as YouTube videos, blogs, or websites), you may do so without licensing fees. Attribution is not legally required, but linking back to WallMobi.com is highly appreciated as it helps support our free creative studio. Note that for items imitating popular characters or fictional brands, commercial use should be approached with caution.",
    section3Title: "DMCA & Content Removal Policy",
    section3Content: "WallMobi respects the intellectual property rights of creators. If you believe your copyrighted work has been uploaded or displayed on WallMobi without authorization, please notify us by sending a DMCA request to funmask101@gmail.com with your contact details, ownership proof, and the specific image URLs. We will review and remove the disputed content within 24 hours.",
    faqTitle: "Licensing FAQ",
    faqs: [
      {
        q: "Can I use WallMobi backgrounds in monetized YouTube videos?",
        a: "Yes, you can! Our wallpapers can be used as backdrop elements in online videos and commercial streams without royalty charges."
      },
      {
        q: "Am I allowed to edit or crop the wallpapers?",
        a: "Yes. You are free to crop, recolor, filter, or modify the wallpaper files to match your home screen aesthetic and widgets."
      },
      {
        q: "Is attribution mandatory when sharing or using these designs?",
        a: "No, attribution is voluntary. However, if you are showcasing the wallpaper in public digital works, a credit like 'Wallpaper by WallMobi.com' is incredibly helpful in keeping this project alive."
      }
    ]
  },
  vi: {
    heroTitle: "Giấy phép & Điều khoản sử dụng | WallMobi",
    heroSubtitle: "Các điều khoản chi tiết về việc sử dụng hình nền di động WallMobi, thỏa thuận thiết bị cá nhân và hướng dẫn thương mại.",
    canTitle: "Quyền sử dụng được phép",
    canItems: [
      "Sử dụng làm hình nền màn hình chính hoặc màn hình khóa trên không giới hạn số lượng thiết bị cá nhân như iPhone, Android.",
      "Tải xuống và lưu trữ tệp hình nền trên các thiết bị cục bộ cho mục đích cá nhân hoàn toàn miễn phí.",
      "Sử dụng hình nền làm hình ảnh nền trong các bài thuyết trình phi thương mại hoặc thiết kế kỹ thuật số cá nhân.",
      "Chia sẻ liên kết trực tiếp của WallMobi.com để giới thiệu cho bạn bè."
    ],
    dontTitle: "Hành vi bị nghiêm cấm",
    dontItems: [
      "Bán, phân phối lại hoặc bán lại các tệp hình nền dưới dạng gói hình nền kỹ thuật số trên bất kỳ nền tảng nào.",
      "Sử dụng các thiết kế hình nền này làm logo, nhãn hiệu hoặc bằng sáng chế thiết kế cho bất kỳ thương hiệu nào.",
      "Tuyên bố quyền sở hữu độc quyền hoặc tác giả đối với các tác phẩm nghệ thuật trên trang web này.",
      "Sao chép thư viện để xây dựng các trang web hoặc ứng dụng hình nền cạnh tranh."
    ],
    section1Title: "Tác phẩm nghệ thuật AI & Tình trạng bản quyền",
    section1Content: "Mọi hình nền trên WallMobi đều được tạo bằng các mô hình AI tiên tiến, sau đó được các nhà thiết kế tuyển chọn và chỉnh sửa. Theo các quy định về bản quyền quốc tế, hình ảnh thuần túy do AI tạo ra thường thiếu sự bảo hộ bản quyền độc quyền. Tuy nhiên, các điều khoản sử dụng của chúng tôi giúp ngăn chặn việc phân phối lại có hại.",
    section2Title: "Sử dụng thương mại & Ghi công",
    section2Content: "Sử dụng hình nền cho điện thoại là hoàn toàn miễn phí. Nếu bạn muốn sử dụng làm hình nền cho phương tiện truyền thông thương mại (như video YouTube, blog), bạn có thể làm như vậy mà không mất phí. Việc ghi công là không bắt buộc nhưng liên kết lại WallMobi.com được đánh giá rất cao.",
    section3Title: "DMCA & Chính sách gỡ bỏ nội dung",
    section3Content: "Nếu bạn tin rằng tác phẩm có bản quyền của mình đã được đăng tải trên WallMobi mà không được phép, vui lòng gửi yêu cầu DMCA tới email funmask101@gmail.com. Chúng tôi sẽ xem xét và gỡ bỏ nội dung vi phạm trong vòng 24 giờ.",
    faqTitle: "Câu hỏi thường gặp về giấy phép",
    faqs: [
      {
        q: "Tôi có thể sử dụng hình nền WallMobi trong các video YouTube kiếm tiền không?",
        a: "Có! Bạn có thể sử dụng hình nền của chúng tôi làm hình nền trong các video trực tuyến mà không phải trả phí bản quyền."
      },
      {
        q: "Tôi có được phép chỉnh sửa hoặc cắt hình nền không?",
        a: "Có, bạn được tự do cắt, đổi màu hoặc chỉnh sửa tệp hình nền để phù hợp với giao diện của mình."
      },
      {
        q: "Việc ghi công có bắt buộc không?",
        a: "Không bắt buộc. Tuy nhiên, việc ghi nhận nguồn 'Hình nền bởi WallMobi.com' sẽ hỗ trợ rất nhiều cho studio của chúng tôi."
      }
    ]
  },
  lo: {
    heroTitle: "ຂໍ້ກຳນົດ ແລະ ສິດການນຳໃຊ້ | WallMobi",
    heroSubtitle: "ຂໍ້ມູນກ່ຽວກັບສິດการນຳໃຊ້ພາບວໍເປເປີມືຖື, ຂໍ້ຕົກລົງການນຳໃຊ້ສ່ວນບຸກຄົນ ແລະ ເງື່ອນໄຂການນຳໃຊ້ໃນເຊີງພາណິດ.",
    canTitle: "ຂອບເຂດການນຳໃຊ້ທີ່ອະນຸຍາດ",
    canItems: [
      "ໃຊ້ເປັນພາບພື້ນຫຼັງໜ້າຈໍໂຮມ ຫຼື ໜ້າຈໍລັອກໃນອຸປະກອນສ່ວນຕົວ ເຊັ່ນ iPhone, Android ໄດ້ບໍ່ຈຳກັດ.",
      "ດາວໂຫຼດ ແລະ ຈັດເກັບໄຟລ໌ຮູບພາບໄວ້ໃນອຸປະກອນຂອງທ່ານເພື່ອການນຳໃຊ້ສ່ວນບຸກຄົນໂດຍບໍ່ມີຄ່າໃຊ້ຈ່າຍ.",
      "ໃຊ້ເປັນພາບພື້ນຫຼັງໃນການນຳສະເໜີວຽກ ຫຼື ໂປຣເຈັກສ່ວນຕົວທີ່ບໍ່ໄດ້ເຮັດເພື່ອການຄ້າ.",
      "ແບ່ງປັນລິ້ງຂອງເວັບໄຊ WallMobi.com ໃຫ້ກັບໝູ່ເພື່ອນໄດ້ຟຣີ."
    ],
    dontTitle: "ຂໍ້ຫ້າມ ແລະ ຂໍ້ຈຳກັດ",
    dontItems: [
      "ຫ້າມນຳໄຟລ໌ຮູບພາບໄປຂາຍຕໍ່ ຫຼື ແຈກຢາຍໃນລັກສະນະຂອງ Wallpaper Pack ໃນທຸກແພລດຟອມ.",
      "ຫ້າມນຳຮູບພາບໄປໃຊ້ເປັນໂລໂກ້ ຫຼື ເຄື່ອງໝາຍການຄ້າຂອງຍີ່ຫໍ້ໃດໜຶ່ງ.",
      "ຫ້າມອ້າງສິດເປັນເຈົ້າຂອງ ຫຼື ຜູ້ສ້າງສັນຜົນງານຮູບພາບເຫຼົ່ານີ້.",
      "ຫ້າມດາວໂຫຼດຮູບພາບທັງໝົດເພື່ອໄປສ້າງເວັບໄຊວໍເປເປີແຂ່ງຂັນໂດຍກົງ."
    ],
    section1Title: "ສະຖານະລິຂະສິດຂອງພາບທີ່ສ້າງດ້ວຍ AI",
    section1Content: "ວໍເປເປີທັງໝົດໃນເວັບໄຊ WallMobi ສ້າງຂຶ້ນດ້ວຍເຕັກໂນໂລຊີ AI ແລະ ປັບແຕ່ງໂດຍດີໄຊເນີ. ຕາມກົດໝາຍລິຂະສິດສາກົນ, ພາບທີ່ສ້າງດ້ວຍ AI ອາດຈະບໍ່ໄດ້ຮັບການຄຸ້ມຄອງລິຂະສິດແບບຜູກຂາດ. ເຖິງຢ່າງໃດກໍດີ, ຂໍ້ກຳນົດນີ້ມີຂຶ້ນເພື່ອປ້ອງກັນການແຈກຢາຍທີ່ບໍ່ເໝາະສົມ.",
    section2Title: "Core Commercial & Credits",
    section2Content: "ການໃຊ້ພາບໃນມືຖືສ່ວນຕົວແມ່ນຟຣີ 100%. ຫາກຕ້ອງການໃຊ້ໃນສື່ພາណິດ (ເຊັ່ນ ວິດີໂອ YouTube, ບລັອກ), ທ່ານສາມາດໃຊ້ໄດ້ໂດຍບໍ່ມີຄ່າທຳນຽມ. ການໃສ່ລິ້ງກັບມາຫາ WallMobi.com ຈະເປັນການສະໜັບສະໜູນທີ່ດີຫຼາຍ.",
    section3Title: "ການແຈ້ງລົບພາບ ແລະ ການລະເມີດລິຂະສິດ (DMCA)",
    section3Content: "ຫາກທ່ານເປັນເຈົ້າຂອງລິຂະສິດ ແລະ ພົບວ່າຮູບພາບໃນ WallMobi ລະເມີດລິຂะສິດຂອງທ່ານ, ກະລຸນາສົ່ງອີເມວຫາ funmask101@gmail.com. ພວກເຮົາຈະກວດສອບ ແລະ ລົບອອກພາຍໃນ 24 ຊົ່ວໂມງ.",
    faqTitle: "ຄຳຖາມທີ່ພົບເລື້ອຍກ່ຽວກັບສິດການນຳໃຊ້",
    faqs: [
      {
        q: "ຂ້ອຍສາມາດໃຊ້ວໍເປເປີ WallMobi ໃນວິດີໂອ YouTube ທີ່ສ້າງລາຍໄດ້ໄດ້ບໍ່?",
        a: "ໄດ້! ທ່ານສາມາດໃຊ້ວໍເປເປີຂອງພວກເຮົາເປັນພາບພື້ນຫຼັງໃນວິດີໂອອອນລາຍໄດ້ໂດຍບໍ່ມີຄ່າລິຂະສິດ."
      },
      {
        q: "ຂ້ອຍສາມາດຕັດ ຫຼື ປັບແຕ່ງຮູບພາບໄດ້ບໍ່?",
        a: "ໄດ້, ທ່ານສາມາດຕັດ ຫຼື ປັບແຕ່ງສີສັນຮູບພາບໄດ້ຕາມຄວາມຕ້ອງການ."
      },
      {
        q: "ຈຳເປັນຕ້ອງໃສ່ເຄຣດິດກັບມາຫາເວັບໄຊ WallMobi ບໍ່?",
        a: "ບໍ່ບັງຄັບ, ແຕ່ການໃສ່ເຄຣດິດ 'Wallpaper by WallMobi.com' ຈະຊ່ວຍພວກເຮົາໄດ້ຫຼາຍ."
      }
    ]
  },
  km: {
    heroTitle: "អាជ្ញាប័ណ្ណ & លក្ខខណ្ឌការប្រើប្រាស់ | WallMobi",
    heroSubtitle: "លក្ខខណ្ឌអាជ្ញាប័ណ្ណលម្អិតសម្រាប់ផ្ទាំងរូបភាពទូរស័ព្ទ WallMobi កិច្ចព្រមព្រៀងឧបករណ៍ផ្ទាល់ខ្លួន និងគោលការណ៍ណែនាំពាណិជ្ជកម្ម។",
    canTitle: "ការប្រើប្រាស់ដែលត្រូវបានអនុញ្ញាត",
    canItems: [
      "ប្រើប្រាស់ជាផ្ទាំងរូបភាពអេក្រង់ដើម ឬអេក្រង់ចាក់សោលើឧបករណ៍ផ្ទាល់ខ្លួនដូចជា iPhone, Android ដោយមិនកំណត់ចំនួនឡើយ.",
      "ទាញយក និងរក្សាទុកឯកសាររូបភាពនៅលើឧបករណ៍សម្រាប់គោលបំណងផ្ទាល់ខ្លួនដោយឥតគិតថ្លៃ.",
      "ប្រើប្រាស់ជាផ្ទៃខាងក្រោយក្នុងការបង្ហាញ ឬការរចនាឌីជីថលផ្ទាល់ខ្លួនដែលមិនមែនជាពាណិជ្ជកម្ម.",
      "ចែករំលែកតំណភ្ជាប់ WallMobi.com ទៅកាន់មិត្តភក្តិដោយសេរី."
    ],
    dontTitle: "សកម្មภาพដែលត្រូវបានហាមឃាត់",
    dontItems: [
      "លក់ ចែករំលែកបន្ត ឬលក់បន្តនូវឯកសាររូបภาพជាកញ្ចប់ផ្ទាំងរូបភាពឌីជីថលលើគ្រប់ប្រព័ន្ធទាំងអស់.",
      "ប្រើប្រាស់ការរចនាផ្ទាំងរូបភាពទាំងនេះជាឡូហ្គោ ឬម៉ាកសញ្ញាពាណិជ្ជកម្មណាមួយ.",
      "អះអាងសិទ្ធិជាម្ចាស់ផ្ដាច់មុខ ឬជាអ្នកបង្កើតស្នាដៃនៅលើគេហទំព័រនេះ.",
      "ទាញយករូបភាពទាំងអស់ដើម្បីបង្កើតគេហទំព័រផ្ទាំងរូបភាពប្រកួតប្រជែងផ្ទាល់."
    ],
    section1Title: "ស្ថានភាពរក្សាសិទ្ធិនៃរូបភាពបង្កើតដោយ AI",
    section1Content: "ផ្ទាំងរូបភាពនៅលើ WallMobi ត្រូវបានបង្កើតឡើងដោយប្រើប្រាស់បច្ចេកវិទ្យា AI និងកែសម្រួលដោយអ្នករចនា។ យោងតាមច្បាប់រក្សាសិទ្ធិអន្តរជាតិ រូបភាពที่បង្កើតឡើងដោយ AI សុទ្ធសាធអាចនឹងមិនមានការការពាររក្សាសិទ្ធិផ្ដាច់មុខឡើយ។ ទោះជាយ៉ាងណាក៏ដោយ លក្ខខណ្ឌរបស់យើងត្រូវបានបង្កើតឡើងដើម្បីការពារការចែកចាយបន្តដោយគ្មានการអនុញ្ញាត។",
    section2Title: "ការប្រើប្រាស់ក្នុងគោលបំណងពាណិជ្ជកម្ម & ការបញ្ជាក់ប្រភព",
    section2Content: "ការប្រើប្រាស់សម្រាប់ទូរស័ព្ទផ្ទាល់ខ្លួនគឺឥតគិតថ្លៃ ១០០%។ ប្រសិនបើចង់ប្រើប្រាស់សម្រាប់ប្រព័ន្ធផ្សព្វផ្សាយពាណិជ្ជកម្ម (ដូចជាវីដេអូ YouTube, ប្លុក) អ្នកអាចប្រើបានដោយគ្មានថ្លៃសេវា។ ការដាក់តំណភ្ជាប់មក WallMobi.com វិញគឺជារឿងដែលគួរឱ្យកោតសរសើរ។",
    section3Title: "គោលការណ៍ DMCA & การលុបមាតិកា",
    section3Content: "ប្រសិនបើអ្នកជាម្ចាស់រក្សាសិទ្ធិ ហើយរកឃើញរូបភាពណាមួយនៅលើ WallMobi រំលោភលើសិទ្ធិរបស់អ្នក សូមផ្ញើអ៊ីមែលមកកាន់ funmask101@gmail.com។ យើងនឹងពិនិត្យ និងលុបចេញក្នុងរយៈពេល ២៤ ម៉ោង។",
    faqTitle: "សំណួរដែលសួរញឹកញាប់អំពីអាជ្ញាប័ណ្ណ",
    faqs: [
      {
        q: "តើខ្ញុំអាចប្រើផ្ទៃខាងក្រោយ WallMobi ក្នុងវីដេអូ YouTube រកប្រាក់បានទេ?",
        a: "បាទ/ចាស បាន! អ្នកสามารถប្រើផ្ទាំងរូបភាពរបស់យើងជាផ្ទៃខាងក្រោយក្នុងវីដេអូអនឡាញបានដោយគ្មានថ្លៃរក្សាសិទ្ធិ។"
      },
      {
        q: "តើខ្ញុំអាចកាត់ ឬកែសម្រួលផ្ទាំងរូបភាពបានទេ?",
        a: "បាទ/ចាស បាន។ អ្នកអាចកាត់ កែពណ៌ ឬកែប្រែដើម្បីឱ្យត្រូវនឹងអេក្រង់ទូរស័ព្ទរបស់អ្នក។"
      },
      {
        q: "តើការបញ្ជាក់ប្រភពជាកាតព្វកិច្ចដែរឬទេ?",
        a: "មិនមែនជាកាតព្វកិច្ចទេ ប៉ុន្តែការដាក់ប្រភព 'Wallpaper by WallMobi.com' នឹងជួយគាំទ្រយើងបានយ៉ាងច្រើន។"
      }
    ]
  },
  my: {
    heroTitle: "လိုင်စင်နှင့် အသုံးပြုမှုစည်းကမ်းချက်များ | WallMobi",
    heroSubtitle: "WallMobi ဖုန်းနောက်ခံပုံများအတွက် အသေးစိတ်လိုင်စင်စည်းကမ်းချက်များ၊ ကိုယ်ပိုင်ဖုန်းများတွင် အသုံးပြုမှုသဘောတူညီချက်နှင့် စီးပွားရေးဆိုင်ရာ အသုံးပြုမှုလမ်းညွှန်ချက်များ။",
    canTitle: "ခွင့်ပြုထားသော အသုံးပြုမှုများ",
    canItems: [
      "iPhone၊ Android စသည့် ကိုယ်ပိုင်ဖုန်းနှင့် တက်ဘလက်များတွင် နောက်ခံပုံအဖြစ် အကန့်အသတ်မရှိ အသုံးပြုနိုင်သည်။",
      "ကိုယ်ပိုင်အသုံးပြုရန်အတွက် ဖုန်းနောက်ခံပုံများကို အခမဲ့ ဒေါင်းလုဒ်ဆွဲ သိမ်းဆည်းနိုင်သည်။",
      "စီးပွားဖြစ်မဟုတ်သော တင်ဆက်မှုများ သို့မဟုတ် ကိုယ်ပိုင်ဒီဇိုင်းများတွင် နောက်ခံပုံအဖြစ် အသုံးပြုနိုင်သည်။",
      "WallMobi.com လင့်ခ်များကို သူငယ်ချင်းများထံ အခမဲ့ မျှဝေနိုင်သည်။"
    ],
    dontTitle: "တားမြစ်ထားသော လုပ်ဆောင်ချက်များ",
    dontItems: [
      "နောက်ခံပုံဖိုင်များကို မူရင်းအတိုင်း ပြန်လည်ရောင်းချခြင်း သို့မဟုတ် အခြားပလက်ဖောင်းများတွင် Wallpaper Pack အဖြစ် ဖြန့်ဝေခြင်း မပြုရ။",
      "ဤဒီဇိုင်းများကို ကုမ္ပဏီတံဆိပ် သို့မဟုတ် ကုန်အမှတ်တံဆိပ်အဖြစ် အသုံးမပြုရ။",
      "ဤပုံများ၏ မူပိုင်ခွင့် သို့မဟုတ် ဖန်တီးသူအဖြစ် အမှားအယွင်း တောင်းဆိုခြင်း မပြုရ။",
      "ပုံအားလုံးကို ဒေါင်းလုဒ်ဆွဲပြီး ပြိုင်ဘက်နောက်ခံပုံ ဝဘ်ဆိုဒ်များ ဖန်တီးခြင်း မပြုရ။"
    ],
    section1Title: "AI ဖန်တီးမှုနှင့် မူပိုင်ခွင့် အခြေအနေ",
    section1Content: "WallMobi ရှိ နောက်ခံပုံများအားလုံးကို AI စနစ်များဖြင့် ဖန်တီးထားပြီး ဒီဇိုင်နာများက ပြန်လည်မွမ်းမံထားပါသည်။ အပြည်ပြည်ဆိုင်ရာ မူပိုင်ခွင့်ဥပဒေအရ AI ဖြင့်သာ ဖန်တီးထားသောပုံများသည် သီးသန့်မူပိုင်ခွင့် မရှိနိုင်ပါ။ သို့သော် ဤစည်းကမ်းချက်များသည် အလွဲသုံးစားလုပ်ခြင်းကို ကာကွယ်ရန် ဖြစ်ပါသည်။",
    section2Title: "စီးပွားဖြစ် အသုံးပြုခြင်းနှင့် ရင်းမြစ်ဖော်ပြခြင်း",
    section2Content: "ဖုန်းတွင် ကိုယ်ပိုင်သုံးရန်အတွက် ၁၀၀% အခမဲ့ ဖြစ်သည်။ စီးပွားဖြစ် မီဒီယာများ (ဥပမာ YouTube ဗီဒီယို၊ ဘလော့ဂ်) တွင် နောက်ခံပုံအဖြစ် အခမဲ့ အသုံးပြုနိုင်သည်။ ရင်းမြစ်ဖော်ပြရန် မလိုသော်လည်း WallMobi.com သို့ လင့်ခ်ညွှန်းပေးခြင်းဖြင့် ကူညီနိုင်ပါသည်။",
    section3Title: "DMCA နှင့် အကြောင်းအရာ ဖယ်ရှားရေး မူဝါဒ",
    section3Content: "အကယ်၍ သင်သည် မူပိုင်ခွင့်ပိုင်ရှင်ဖြစ်ပြီး WallMobi တွင် သင့်ပုံများ မတရားတင်ထားသည်ဟု ယူဆပါက funmask101@gmail.com သို့ အီးမေးလ်ပို့ပါ။ ၂၄ နာရီအတွင်း စစ်ဆေးပြီး ဖယ်ရှားပေးပါမည်။",
    faqTitle: "လိုင်စင်ဆိုင်ရာ အမေးအဖြေများ",
    faqs: [
      {
        q: "WallMobi နောက်ခံပုံများကို ဝင်ငွေရ YouTube ဗီဒီယိုများတွင် သုံးနိုင်ပါသလား။",
        a: "သုံးနိုင်ပါသည်။ ကျွန်ုပ်တို့၏ နောက်ခံပုံများကို ဗီဒီယိုများတွင် မူပိုင်ခွင့်ပေးရန်မလိုဘဲ အခမဲ့ အသုံးပြုနိုင်ပါသည်။"
      },
      {
        q: "ပုံများကို အရွယ်အစားဖြတ်ခြင်း သို့မဟုတ် ပြင်ဆင်ခြင်း ပြုလုပ်နိုင်ပါသလား။",
        a: "ပြုလုပ်နိုင်ပါသည်။ သင့်ဖုန်းမျက်နှာပြင်နှင့် ကိုက်ညီအောင် စိတ်ကြိုက် ဖြတ်တောက် ပြင်ဆင်နိုင်ပါသည်။"
      },
      {
        q: "ရင်းမြစ်ဖော်ပြရန် မဖြစ်မနေ လိုအပ်ပါသလား။",
        a: "မလိုပါ။ သို့သော် 'Wallpaper by WallMobi.com' ဟု ဖော်ပြပေးခြင်းက ကျွန်ုပ်တို့ကို များစွာ အထောက်အကူပြုပါသည်။"
      }
    ]
  }
};
