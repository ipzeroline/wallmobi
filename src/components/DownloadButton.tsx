"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DownloadButton({
  src,
  filename,
  labels,
  locale = "en",
}: {
  src: string;
  filename: string;
  labels: { download: string; preparing: string; saved: string };
  locale?: string;
}) {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");

  async function handle() {
    // 1. Check if user is logged in
    const active = localStorage.getItem("wallmobi_active_user");
    if (!active) {
      // Redirect to login/register page if not a member
      router.push(`/${locale}/member`);
      return;
    }

    try {
      setState("busy");
      const slug = filename.replace(/\.[a-zA-Z0-9]+$/, "");
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

  return (
    <button className="btn btn-primary" onClick={handle} disabled={state === "busy"} style={{ width: "100%" }}>
      {state === "busy" ? labels.preparing : state === "done" ? labels.saved : labels.download}
      {state === "idle" && (
        <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M8 1v9m0 0L4.5 6.5M8 10l3.5-3.5M2 13h12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}
