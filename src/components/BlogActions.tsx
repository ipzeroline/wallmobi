"use client";

import { useState } from "react";

type BlogActionsProps = {
  url: string;
  title: string;
  locale: string;
};

export default function BlogActions({ url, title, locale }: BlogActionsProps) {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<"yes" | "no" | null>(null);

  const t = {
    share: {
      en: "Share this article",
      th: "แชร์บทความนี้",
      vi: "Chia sẻ bài viết này",
      my: "ဤဆောင်းပါးကို မျှဝေပါ",
      lo: "ແບ່ງປັນບົດຄວາມນີ້",
      km: "ចែករំលែកអត្ថបទនេះ",
    }[locale] || "Share this article",
    copy: {
      en: "Copy Link",
      th: "คัดลอกลิงก์",
      vi: "Sao chép liên kết",
      my: "လင့်ခ်ကို ကူးယူပါ",
      lo: "ຄັດລອກລິ້ງ",
      km: "ចម្លងតំណ",
    }[locale] || "Copy Link",
    copied: {
      en: "Link copied!",
      th: "คัดลอกลิงก์แล้ว!",
      vi: "Đã sao chép liên kết!",
      my: "လင့်ခ်ကို ကူးယူပြီးပါပြီ။",
      lo: "ຄັດລອກລິ້ງແລ້ວ!",
      km: "បានចម្លងតំណភ្ជាប់!",
    }[locale] || "Link copied!",
    helpful: {
      en: "Was this article helpful?",
      th: "บทความนี้เป็นประโยชน์กับคุณหรือไม่?",
      vi: "Bài viết này có hữu ích không?",
      my: "ဤဆောင်းပါးသည် သင့်အတွက် အသုံးဝင်ပါသလား။",
      lo: "ບົດຄວາມນີ້ເປັນປະໂຫຍດກັບທ່ານຫຼືບໍ່?",
      km: "តើអត្ថបទនេះមានប្រយោជន៍សម្រាប់អ្នកទេ?",
    }[locale] || "Was this article helpful?",
    yes: {
      en: "Yes",
      th: "ใช่",
      vi: "Có",
      my: "ဟုတ်ကဲ့",
      lo: "ແມ່ນ",
      km: "បាទ/ចាស",
    }[locale] || "Yes",
    no: {
      en: "No",
      th: "ไม่",
      vi: "Không",
      my: "မဟုတ်ပါ",
      lo: "ບໍ່",
      km: "ទេ",
    }[locale] || "No",
    thanks: {
      en: "Thank you for your feedback!",
      th: "ขอบคุณสำหรับความคิดเห็นของคุณ!",
      vi: "Cảm ơn phản hồi của bạn!",
      my: "တုံ့ပြန်မှုအတွက် ကျေးဇူးတင်ပါသည်။",
      lo: "ຂອບໃຈສຳລັບຄວາມຄິດເຫັນຂອງທ່ານ!",
      km: "សូមអរគុណសម្រាប់មតិត្រឡប់របស់អ្នក!",
    }[locale] || "Thank you for your feedback!",
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const xUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
  const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`;

  return (
    <div style={{ margin: "3rem 0", padding: "2rem 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1.5rem" }}>
        
        {/* Share Section */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-2)" }}>{t.share}:</span>
          <div style={{ display: "flex", gap: "8px" }}>
            
            {/* Facebook Share */}
            <a
              href={fbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-soft"
              style={{ padding: "8px 12px", display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.85rem" }}
              title="Share on Facebook"
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h3V1H13c-3 0-5 2-5 5v2z" />
              </svg>
              Facebook
            </a>

            {/* X Share */}
            <a
              href={xUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-soft"
              style={{ padding: "8px 12px", display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.85rem" }}
              title="Share on X"
            >
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.2 2.4h3.3L14.3 11l8.5 11.3h-6.7L10.8 15.3 4.8 22.3H1.5l7.7-8.8L1.1 2.4H8l4.8 6.4 5.4-6.4zm-1.2 18h1.8L7.1 4.5H5.1l11.9 15.9z" />
              </svg>
              X
            </a>

            {/* Line Share */}
            <a
              href={lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-soft"
              style={{ padding: "8px 12px", display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.85rem" }}
              title="Share on Line"
            >
              {/* Line App Icon */}
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 10.3c0-5.7-5.4-10.3-12-10.3S0 4.6 0 10.3c0 5.1 4.3 9.3 10.1 10.1.4.1.9.3 1 .6l.1 1.7c0 .4-.2.9.2.9.3 0 .7-.2 1.4-.7l4.3-3.6c4.2-1.9 6.9-5.4 6.9-9zM7.3 14H5.8c-.4 0-.7-.3-.7-.7V7.7c0-.4.3-.7.7-.7h1.5c.4 0 .7.3.7.7s-.3.7-.7.7H6.5v1.2H7.3c.4 0 .7.3.7.7s-.3.8-.7.8zm4 0h-1.5c-.4 0-.7-.3-.7-.7V7.7c0-.4.3-.7.7-.7s.7.3.7.7v4.9h.8c.4 0 .7.3.7.7s-.3.7-.7.7zm2.2-.7c0 .4-.3.7-.7.7s-.7-.3-.7-.7V7.7c0-.4.3-.7.7-.7s.7.3.7.7v5.6zm5.3-.8c0 .4-.3.7-.7.7h-1.5c-.4 0-.7-.3-.7-.7V7.7c0-.4.3-.7.7-.7h1.5c.4 0 .7.3.7.7s-.3.7-.7.7h-.8v1.1h.8c.4 0 .7.3.7.7s-.3.7-.7.7h-.8v1.2h.8c.4 0 .7.3.7.7z" />
              </svg>
              Line
            </a>

            {/* Copy Link */}
            <button
              onClick={handleCopy}
              className="btn btn-soft"
              style={{ padding: "8px 12px", display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", cursor: "pointer", border: "1px solid var(--line)" }}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {copied ? t.copied : t.copy}
            </button>
          </div>
        </div>

        {/* Helpful Poll Section */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "36px" }}>
          {feedback === null ? (
            <>
              <span style={{ fontSize: "0.95rem", color: "var(--text-2)" }}>{t.helpful}</span>
              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  onClick={() => setFeedback("yes")}
                  className="btn btn-soft"
                  style={{ padding: "6px 12px", fontSize: "0.85rem", borderRadius: "8px" }}
                >
                  👍 {t.yes}
                </button>
                <button
                  onClick={() => setFeedback("no")}
                  className="btn btn-soft"
                  style={{ padding: "6px 12px", fontSize: "0.85rem", borderRadius: "8px" }}
                >
                  👎 {t.no}
                </button>
              </div>
            </>
          ) : (
            <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--accent)", animation: "fadeIn 0.3s ease" }}>
              🎉 {t.thanks}
            </span>
          )}
        </div>

      </div>
    </div>
  );
}
