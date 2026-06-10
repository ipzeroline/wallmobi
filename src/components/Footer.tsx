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
            <div style={{ marginTop: "1rem" }}>
              <a
                href={site.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" style={{ verticalAlign: "middle" }}>
                  <path d="M12.53.07C13.82.02 15.11 0 16.4 0c.07 1.8.87 3.33 2.22 4.39.85.66 1.83 1.05 2.87 1.25V9.4c-1.39-.02-2.73-.42-3.89-1.22-.52-.36-.98-.81-1.37-1.32v7.71c.03 1.57-.42 3.12-1.31 4.38-1.57 2.22-4.14 3.47-6.85 3.32-3.41-.18-6.17-2.85-6.52-6.26C1.1 12.54 3.63 9.17 7.29 9.1c.71-.01 1.41.11 2.07.35v3.91c-.48-.22-1-.31-1.52-.27-1.46.12-2.58 1.4-2.52 2.86.06 1.35 1.15 2.41 2.5 2.4 1.42 0 2.53-1.19 2.53-2.61V.07h2.16z" />
                </svg>
                <span>TikTok</span>
              </a>
            </div>
          </div>
          <div>
            <h4>{dict.footer.categories}</h4>
            <div className="footer-categories-grid">
              {categorySlugs.map((slug) => (
                <Link key={slug} href={`${base}/category/${slug}`}>
                  {dict.categories[slug].name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4>{dict.footer.site}</h4>
            <Link href={`${base}/gallery`}>{dict.footer.gallery}</Link>
            <Link href={`${base}/blog`}>{dict.nav.blog}</Link>
            <Link href={`${base}/about`}>{dict.footer.about}</Link>
            <Link href={`${base}/license`}>{dict.footer.license}</Link>
            <Link href={`${base}/contact`}>{dict.nav.contact}</Link>
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
