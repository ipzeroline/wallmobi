"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeNames, isLocale, type Locale } from "@/i18n/config";

const flagStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "16px",
  height: "16px",
  borderRadius: "50%",
  overflow: "hidden",
  border: "1px solid var(--line-2)",
  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.08)",
  flexShrink: 0,
};

function Flag({ l }: { l: Locale }) {
  switch (l) {
    case "th":
      return (
        <svg viewBox="0 0 30 20" style={{ width: "100%", height: "100%", objectFit: "cover" }}>
          <rect width="30" height="20" fill="#f4f5f8" />
          <rect width="30" height="3.33" fill="#a51931" />
          <rect y="16.67" width="30" height="3.33" fill="#a51931" />
          <rect y="3.33" width="30" height="13.34" fill="#f4f5f8" />
          <rect y="6.67" width="30" height="6.67" fill="#2d2a4a" />
        </svg>
      );
    case "vi":
      return (
        <svg viewBox="0 0 30 20" style={{ width: "100%", height: "100%", objectFit: "cover" }}>
          <rect width="30" height="20" fill="#da251d" />
          <polygon points="15,4 16.2,8.5 20.8,8.5 17.1,11.2 18.5,15.7 15,13 11.5,15.7 12.9,11.2 9.2,8.5 13.8,8.5" fill="#ffff00" />
        </svg>
      );
    case "lo":
      return (
        <svg viewBox="0 0 30 20" style={{ width: "100%", height: "100%", objectFit: "cover" }}>
          <rect width="30" height="20" fill="#ce1126" />
          <rect y="5" width="30" height="10" fill="#002868" />
          <circle cx="15" cy="10" r="3.5" fill="#ffffff" />
        </svg>
      );
    case "my":
      return (
        <svg viewBox="0 0 30 20" style={{ width: "100%", height: "100%", objectFit: "cover" }}>
          <rect width="30" height="6.67" fill="#fecb00" />
          <rect y="6.67" width="30" height="6.67" fill="#34b233" />
          <rect y="13.33" width="30" height="6.67" fill="#ea2839" />
          <polygon points="15,3.5 16.5,8.7 21.8,8.7 17.5,11.9 19.1,17.1 15,13.9 10.9,17.1 12.5,11.9 8.2,8.7 13.5,8.7" fill="#ffffff" />
        </svg>
      );
    case "km":
      return (
        <svg viewBox="0 0 30 20" style={{ width: "100%", height: "100%", objectFit: "cover" }}>
          <rect width="30" height="20" fill="#032ea1" />
          <rect y="5" width="30" height="10" fill="#e21111" />
          <path d="M11,14 h8 v-1.5 h-1 v-1 h0.5 v-1.5 h-1.5 v1.5 h-1 v-2.5 h-1.5 v2.5 h-1 v-1.5 h-1.5 v1.5 h0.5 v1 Z" fill="#ffffff" />
        </svg>
      );
    case "en":
    default:
      return (
        <svg viewBox="0 0 30 20" style={{ width: "100%", height: "100%", objectFit: "cover" }}>
          <rect width="30" height="20" fill="#ffffff" />
          <rect width="30" height="1.54" fill="#b22234" />
          <rect y="3.08" width="30" height="1.54" fill="#b22234" />
          <rect y="6.15" width="30" height="1.54" fill="#b22234" />
          <rect y="9.23" width="30" height="1.54" fill="#b22234" />
          <rect y="12.31" width="30" height="1.54" fill="#b22234" />
          <rect y="15.38" width="30" height="1.54" fill="#b22234" />
          <rect y="18.46" width="30" height="1.54" fill="#b22234" />
          <rect width="13" height="10.77" fill="#3c3b6e" />
          <circle cx="3" cy="3" r="0.6" fill="#fff" />
          <circle cx="10" cy="3" r="0.6" fill="#fff" />
          <circle cx="6.5" cy="5.4" r="0.6" fill="#fff" />
          <circle cx="3" cy="7.8" r="0.6" fill="#fff" />
          <circle cx="10" cy="7.8" r="0.6" fill="#fff" />
        </svg>
      );
  }
}

export default function LanguageSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname() || `/${current}`;
  const segments = pathname.split("/");
  // segments[0] === "" ; segments[1] is the locale
  const rest = isLocale(segments[1]) ? "/" + segments.slice(2).join("/") : pathname;
  const tail = rest === "/" ? "" : rest.replace(/\/$/, "");

  return (
    <details className="lang">
      <summary aria-label="Change language" style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}>
        <span style={flagStyle}>
          <Flag l={current} />
        </span>
        <span className="lang-current-label">{localeNames[current]}</span>
        <svg className="lang-current-chevron" width="10" height="10" viewBox="0 0 10 6" aria-hidden="true" style={{ marginLeft: "0.1rem" }}>
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        </svg>
      </summary>
      <div className="lang-menu">
        {locales.map((l) => (
          <Link
            key={l}
            href={`/${l}${tail}`}
            data-active={l === current}
            hrefLang={l}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <span style={flagStyle}>
              <Flag l={l} />
            </span>
            <span>{localeNames[l]}</span>
          </Link>
        ))}
      </div>
    </details>
  );
}
