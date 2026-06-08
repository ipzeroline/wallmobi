"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle({ label }: { label: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = document.documentElement.dataset.theme;
    setTheme(t === "dark" ? "dark" : "light");
  }, []);

  function setThemeMode(mode: "light" | "dark") {
    document.documentElement.dataset.theme = mode;
    try {
      localStorage.setItem("theme", mode);
    } catch {}
    setTheme(mode);
  }

  const isDark = mounted && theme === "dark";

  return (
    <div
      className="theme-capsule-toggle"
      role="radiogroup"
      aria-label={label}
      title={label}
      suppressHydrationWarning
    >
      {/* Sliding backdrop thumb */}
      <div className={`theme-capsule-thumb ${isDark ? "is-dark" : "is-light"}`} />

      {/* Light option */}
      <button
        type="button"
        className={`theme-capsule-btn ${!isDark ? "active" : ""}`}
        onClick={() => setThemeMode("light")}
        aria-checked={!isDark}
        role="radio"
        aria-label="Light mode"
        title="Light mode"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      </button>

      {/* Dark option */}
      <button
        type="button"
        className={`theme-capsule-btn ${isDark ? "active" : ""}`}
        onClick={() => setThemeMode("dark")}
        aria-checked={isDark}
        role="radio"
        aria-label="Dark mode"
        title="Dark mode"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </button>
    </div>
  );
}

