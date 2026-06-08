"use client";

import { site } from "@/lib/site";

export default function Logo({ size = 22 }: { size?: number }) {
  return (
    <div className="brand-logo-container" style={{ display: "inline-flex", alignItems: "center", gap: "0.55rem" }}>
      <svg
        className="brand-logo"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="brand-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff2d55" />
            <stop offset="50%" stopColor="#5856d6" />
            <stop offset="100%" stopColor="#0071e3" />
          </linearGradient>
        </defs>
        {/* Background offset screen layer */}
        <rect
          x="8"
          y="2"
          width="11"
          height="17"
          rx="2.5"
          fill="var(--line-2)"
          opacity="0.35"
          transform="rotate(6 13.5 10.5)"
        />
        {/* Foreground screen layer */}
        <rect
          x="4"
          y="5"
          width="11"
          height="17"
          rx="2.5"
          stroke="url(#brand-grad)"
          strokeWidth="2.2"
          fill="var(--surface)"
        />
        {/* Dynamic wallpaper waves inside foreground screen */}
        <path
          d="M5 14c2-1.8 4.2-1.8 6.2 0s2.8 1.8 4.8 0"
          stroke="url(#brand-grad)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M5 17.5c2-1.8 4.2-1.8 6.2 0s2.8 1.8 4.8 0"
          stroke="url(#brand-grad)"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
      <span className="brand-name" style={{ fontWeight: 600, letterSpacing: "-0.015em" }}>
        {site.name}
        <span style={{ color: "var(--accent)", transition: "color 0.35s" }}>.com</span>
      </span>
    </div>
  );
}
