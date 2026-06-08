"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MemberNavButton({ locale }: { locale: string }) {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkUser = () => {
      const active = localStorage.getItem("wallmobi_active_user");
      if (active) {
        try {
          setUser(JSON.parse(active));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    checkUser();
    
    // Listen to storage events to update navigation instantly if logged in/out
    window.addEventListener("storage", checkUser);
    // Custom event for same-window updates
    window.addEventListener("auth-change", checkUser);
    
    return () => {
      window.removeEventListener("storage", checkUser);
      window.removeEventListener("auth-change", checkUser);
    };
  }, []);

  const base = `/${locale}`;
  const label = locale === "th" ? "บัญชีผู้ใช้" : "Account";

  if (!mounted) {
    return (
      <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--bg-alt)" }} />
    );
  }

  return (
    <Link
      href={`${base}/member`}
      className="icon-btn"
      aria-label={label}
      title={label}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        background: user ? "var(--bg-alt)" : "transparent",
        border: user ? "1px solid var(--line-2)" : "none",
        fontSize: "0.85rem",
        fontWeight: 600,
        color: "var(--text-2)",
        textDecoration: "none",
        position: "relative",
      }}
    >
      {user ? (
        <span style={{ color: "var(--text)" }}>{user.name.charAt(0).toUpperCase()}</span>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )}
    </Link>
  );
}
