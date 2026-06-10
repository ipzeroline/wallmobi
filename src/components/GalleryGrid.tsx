"use client";

import { useState } from "react";
import Link from "next/link";
import type { Wallpaper } from "@/lib/wallpapers";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import WallpaperCard from "./WallpaperCard";

export default function GalleryGrid({
  wallpapers,
  locale,
  dict,
  initialHasMore,
  initialPage = 1,
  pageSize = 24,
}: {
  wallpapers: Wallpaper[];
  locale: Locale;
  dict: Dictionary;
  initialHasMore: boolean;
  initialPage?: number;
  pageSize?: number;
}) {
  const [items, setItems] = useState(wallpapers);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);
  const nextPageHref = `/${locale}/gallery/page/${page + 1}`;

  const handleLoadMore = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const res = await fetch(`/api/wallpapers?locale=${locale}&page=${nextPage}&limit=${pageSize}`);
      if (!res.ok) throw new Error("Failed to load wallpapers");
      const data = await res.json();
      setItems((prev) => [...prev, ...(data.wallpapers || [])]);
      setPage(nextPage);
      setHasMore(Boolean(data.hasMore));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="grid">
        {items.map((wp, i) => (
          <WallpaperCard
            key={wp.slug}
            wp={wp}
            locale={locale}
            dict={dict}
            priority={i < 4}
          />
        ))}
      </div>

      {hasMore && (
        <div className="center mt-lg" style={{ marginTop: "2.5rem", display: "flex", justifyContent: "center", gap: ".75rem", flexWrap: "wrap" }}>
          <button
            onClick={handleLoadMore}
            className="btn btn-soft"
            disabled={isLoading}
            style={{
              padding: "0.8rem 2.2rem",
              borderRadius: "12px",
              cursor: isLoading ? "wait" : "pointer",
              fontWeight: 500,
              fontSize: "0.96rem",
              border: "1px solid var(--line)",
            }}
          >
            {isLoading ? dict.detail.preparing : dict.search.loadMore}
          </button>
          <Link href={nextPageHref} className="btn btn-soft" style={{ padding: "0.8rem 1.3rem", borderRadius: "12px" }}>
            {locale === "th" ? "เปิดหน้าถัดไป" : "Open next page"}
          </Link>
        </div>
      )}
    </>
  );
}
