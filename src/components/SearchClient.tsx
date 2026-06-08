"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Wallpaper } from "@/lib/wallpapers";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { categorySlugs } from "@/lib/site";
import WallpaperCard from "./WallpaperCard";

const PAGE = 10;

export default function SearchClient({
  items,
  locale,
  dict,
}: {
  items: Wallpaper[];
  locale: Locale;
  dict: Dictionary;
}) {
  const sp = useSearchParams();
  const [query, setQuery] = useState(sp.get("q") ?? "");
  const [cat, setCat] = useState<string>("all");
  const [visible, setVisible] = useState(PAGE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((w) => {
      if (cat !== "all" && w.category !== cat) return false;
      if (!q) return true;
      const hay = [
        w.title,
        w.category,
        dict.categories[w.category].name,
        w.desc[locale],
        ...w.tags,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [items, query, cat, locale, dict]);

  const shown = filtered.slice(0, visible);

  return (
    <div>
      <div className="controls">
        <input
          className="search-input"
          type="search"
          value={query}
          placeholder={dict.search.placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setVisible(PAGE);
          }}
          autoFocus
          aria-label={dict.search.title}
        />
        <div className="filters">
          <button className="chip" data-active={cat === "all"} onClick={() => { setCat("all"); setVisible(PAGE); }}>
            {dict.gallery.all}
          </button>
          {categorySlugs.map((slug) => (
            <button
              key={slug}
              className="chip"
              data-active={cat === slug}
              onClick={() => { setCat(slug); setVisible(PAGE); }}
            >
              {dict.categories[slug].name}
            </button>
          ))}
        </div>
        <p className="result-count">
          {filtered.length} {dict.search.results}
        </p>
      </div>

      {shown.length === 0 ? (
        <p className="empty">{dict.search.noResults}</p>
      ) : (
        <div className="grid">
          {shown.map((wp) => (
            <WallpaperCard key={wp.slug} wp={wp} locale={locale} dict={dict} />
          ))}
        </div>
      )}

      {visible < filtered.length && (
        <div className="center mt-lg">
          <button className="btn btn-soft" onClick={() => setVisible((v) => v + PAGE)}>
            {dict.search.loadMore}
          </button>
        </div>
      )}
    </div>
  );
}
