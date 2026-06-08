import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { site } from "@/lib/site";
import { categorySlugs } from "@/lib/site";
import Logo from "./Logo";

export default function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = `/${locale}`;
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand" style={{ fontSize: "1rem" }}>
              <Logo size={20} />
            </div>
            <p className="muted" style={{ fontSize: ".9rem", maxWidth: "22rem", marginTop: ".6rem" }}>
              {dict.footer.tagline}
            </p>
          </div>
          <div>
            <h4>{dict.footer.categories}</h4>
            {categorySlugs.map((slug) => (
              <Link key={slug} href={`${base}/category/${slug}`}>
                {dict.categories[slug].name}
              </Link>
            ))}
          </div>
          <div>
            <h4>{dict.footer.site}</h4>
            <Link href={`${base}/gallery`}>{dict.footer.gallery}</Link>
            <Link href={`${base}/blog`}>{dict.nav.blog}</Link>
            <Link href={`${base}/about`}>{dict.footer.about}</Link>
            <Link href={`${base}/license`}>{dict.footer.license}</Link>
          </div>
        </div>
        <div className="footer-foot">
          <span>© {site.founded} {site.name}. {dict.footer.copyright}</span>
          <span>{dict.footer.madeFor}</span>
        </div>
      </div>
    </footer>
  );
}
