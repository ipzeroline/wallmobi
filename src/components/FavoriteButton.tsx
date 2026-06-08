"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function FavoriteButton({
  wpSlug,
  locale,
}: {
  wpSlug: string;
  locale: string;
}) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const active = localStorage.getItem("wallmobi_active_user");
    if (!active) return;
    setIsLoggedIn(true);

    fetch("/api/favorites")
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        if (data.success && Array.isArray(data.favorites)) {
          setIsFavorite(data.favorites.includes(wpSlug));
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
      });
  }, [wpSlug]);

  const toggleFavorite = async () => {
    const active = localStorage.getItem("wallmobi_active_user");
    if (!active || !isLoggedIn) {
      router.push(`/${locale}/member`);
      return;
    }

    try {
      if (isFavorite) {
        const res = await fetch(`/api/favorites?slug=${encodeURIComponent(wpSlug)}`, {
          method: "DELETE",
        });
        if (res.ok) {
          setIsFavorite(false);
          window.dispatchEvent(new Event("auth-change"));
        }
      } else {
        const res = await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug: wpSlug }),
        });
        if (res.ok) {
          setIsFavorite(true);
          window.dispatchEvent(new Event("auth-change"));
        }
      }
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    }
  };

  const label = isFavorite
    ? locale === "th" ? "ลบจากรายการโปรด" : "Remove from Favorites"
    : locale === "th" ? "เพิ่มในรายการโปรด" : "Add to Favorites";

  return (
    <button
      onClick={toggleFavorite}
      className="btn btn-soft"
      style={{
        width: "100%",
        marginTop: "0.6rem",
        gap: "0.5rem",
        borderColor: isFavorite ? "rgba(255, 45, 85, 0.4)" : "var(--line)",
        background: isFavorite ? "rgba(255, 45, 85, 0.08)" : "var(--bg-alt)",
        color: isFavorite ? "#ff2d55" : "var(--text-1)",
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={isFavorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      {label}
    </button>
  );
}
