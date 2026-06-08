import Link from "next/link";
import Image from "next/image";
import type { Wallpaper } from "@/lib/wallpapers";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";

export default function WallpaperCard({
  wp,
  locale,
  dict,
  priority = false,
}: {
  wp: Wallpaper;
  locale: Locale;
  dict: Dictionary;
  priority?: boolean;
}) {
  return (
    <Link href={`/${locale}/${wp.category}-wallpapers/${wp.slug}`} className="tile rise" aria-label={wp.title}>
      <Image
        className="tile-img"
        src={wp.src}
        alt={wp.desc[locale]}
        width={wp.width}
        height={wp.height}
        sizes="(max-width:1000px) 45vw, 200px"
        priority={priority}
      />
      <div className="tile-info">
        <div className="tile-title">{wp.title}</div>
        <div className="tile-sub">{dict.categories[wp.category].name}</div>
      </div>
    </Link>
  );
}
