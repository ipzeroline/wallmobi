"use client";

import { useState } from "react";
import type { Wallpaper } from "@/lib/wallpapers";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import WallpaperCard from "./WallpaperCard";

export default function GalleryGrid({
  wallpapers,
  locale,
  dict,
}: {
  wallpapers: Wallpaper[];
  locale: Locale;
  dict: Dictionary;
}) {
  // Show 24 wallpapers initially, and load 24 more on each click
  const ITEMS_PER_PAGE = 24;
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const visibleWallpapers = wallpapers.slice(0, visibleCount);
  const hasMore = visibleCount < wallpapers.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <>
      <div className="grid">
        {visibleWallpapers.map((wp, i) => (
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
        <div className="center mt-lg" style={{ marginTop: "2.5rem" }}>
          <button
            onClick={handleLoadMore}
            className="btn btn-soft"
            style={{
              padding: "0.8rem 2.2rem",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: 500,
              fontSize: "0.96rem",
              border: "1px solid var(--line)",
            }}
          >
            {dict.search.loadMore}
          </button>
        </div>
      )}
    </>
  );
}
