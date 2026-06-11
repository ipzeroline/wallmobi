"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DownloadButton({
  slug,
  filename,
  labels,
  locale = "en",
}: {
  slug: string;
  filename: string;
  labels: { download: string; preparing: string; saved: string };
  locale?: string;
}) {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");
  const [showGuestChoice, setShowGuestChoice] = useState(false);

  const t = {
    title: locale === "th" ? "ดาวน์โหลดแบบไม่มีลายน้ำ" : "Download without watermark",
    body: locale === "th"
      ? "สมัครสมาชิกฟรีหรือเข้าสู่ระบบเพื่อรับไฟล์ต้นฉบับไม่มีลายน้ำ ผู้เยี่ยมชมยังดาวน์โหลดได้ แต่ไฟล์จะมีลายน้ำ WallMobi"
      : "Create a free account or sign in to get the original file without watermark. Guests can still download a watermarked file.",
    join: locale === "th" ? "สมัครฟรี / เข้าสู่ระบบ" : "Create free account",
    guest: locale === "th" ? "ดาวน์โหลดแบบมีลายน้ำ" : "Download with watermark",
    close: locale === "th" ? "ปิด" : "Close",
    note: locale === "th" ? "ฟรี ไม่มีค่าใช้จ่าย" : "Free, no payment required",
  };

  function hasLocalUser() {
    try {
      return Boolean(localStorage.getItem("wallmobi_active_user"));
    } catch {
      return false;
    }
  }

  async function downloadFile() {
    try {
      setState("busy");
      setShowGuestChoice(false);
      const res = await fetch(`/api/downloads/secure?slug=${slug}`);

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem("wallmobi_active_user");
          window.dispatchEvent(new Event("auth-change"));
          router.push(`/${locale}/member`);
          return;
        }
        throw new Error("Download failed");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      window.dispatchEvent(new Event("auth-change"));

      setState("done");
      setTimeout(() => setState("idle"), 2200);
    } catch {
      setState("idle");
    }
  }

  function handle() {
    if (!hasLocalUser()) {
      setShowGuestChoice(true);
      return;
    }
    void downloadFile();
  }

  return (
    <>
      <button className="btn btn-primary" onClick={handle} disabled={state === "busy"} style={{ width: "100%" }}>
        {state === "busy" ? labels.preparing : state === "done" ? labels.saved : labels.download}
        {state === "idle" && (
          <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 1v9m0 0L4.5 6.5M8 10l3.5-3.5M2 13h12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {showGuestChoice && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="download-choice-title"
          onClick={() => setShowGuestChoice(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            display: "grid",
            placeItems: "center",
            padding: "1rem",
            background: "rgba(0,0,0,0.42)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(100%, 430px)",
              background: "var(--bg)",
              border: "1px solid var(--line)",
              borderRadius: "18px",
              padding: "1.25rem",
              boxShadow: "0 20px 60px rgba(0,0,0,0.22)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "flex-start" }}>
              <div>
                <div style={{ color: "var(--accent)", fontSize: "0.82rem", fontWeight: 700, marginBottom: "0.35rem" }}>
                  {t.note}
                </div>
                <h2 id="download-choice-title" style={{ margin: 0, fontSize: "1.18rem", lineHeight: 1.25 }}>
                  {t.title}
                </h2>
              </div>
              <button
                type="button"
                aria-label={t.close}
                onClick={() => setShowGuestChoice(false)}
                style={{ border: 0, background: "transparent", color: "var(--text-3)", cursor: "pointer", fontSize: "1.4rem", lineHeight: 1 }}
              >
                ×
              </button>
            </div>

            <p style={{ margin: "0.75rem 0 1rem", color: "var(--text-2)", fontSize: "0.94rem", lineHeight: 1.55 }}>
              {t.body}
            </p>

            <div style={{ display: "grid", gap: "0.65rem" }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => router.push(`/${locale}/member#register`)}
                style={{ width: "100%" }}
              >
                {t.join}
              </button>
              <button
                type="button"
                className="btn btn-soft"
                onClick={() => void downloadFile()}
                disabled={state === "busy"}
                style={{ width: "100%" }}
              >
                {state === "busy" ? labels.preparing : t.guest}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
