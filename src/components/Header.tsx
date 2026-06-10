import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { categorySlugs, site } from "@/lib/site";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
import MemberNavButton from "./MemberNavButton";

export default function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = `/${locale}`;
  const primaryLinks = [
    { href: base, label: dict.nav.home },
    { href: `${base}/gallery`, label: dict.nav.gallery },
    { href: `${base}/blog`, label: dict.nav.blog },
    { href: `${base}/search`, label: dict.nav.search },
    { href: `${base}/member`, label: locale === "th" ? "บัญชีผู้ใช้" : "Account" },
    { href: `${base}/about`, label: dict.nav.about },
    { href: `${base}/license`, label: dict.nav.license },
    { href: `${base}/contact`, label: dict.nav.contact },
  ];

  return (
    <header className="nav">
      <div className="container nav-bar">
        <Link href={base} className="brand" aria-label={`${site.name}.com`}>
          <Logo />
        </Link>
        <nav className="nav-links" aria-label="Primary">
          <Link href={base}>{dict.nav.home}</Link>
          <Link href={`${base}/gallery`}>{dict.nav.gallery}</Link>
          <Link href={`${base}/blog`}>{dict.nav.blog}</Link>
          <details className="nav-menu">
            <summary>{dict.nav.categories}</summary>
            <div className="nav-menu-list">
              {categorySlugs.map((slug) => (
                <Link key={slug} href={`${base}/category/${slug}`}>
                  {dict.categories[slug].name}
                </Link>
              ))}
            </div>
          </details>
          <Link href={`${base}/about`}>{dict.nav.about}</Link>
          <Link href={`${base}/license`}>{dict.nav.license}</Link>
          <Link href={`${base}/contact`}>{dict.nav.contact}</Link>
        </nav>
        <div className="nav-right">
          <details className="mobile-menu">
            <summary aria-label={dict.nav.menu} title={dict.nav.menu}>
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </summary>
            <div className="mobile-menu-panel">
              <div className="mobile-menu-section">
                {primaryLinks.map((link) => (
                  <Link key={link.href} href={link.href}>{link.label}</Link>
                ))}
              </div>
              <div className="mobile-menu-section">
                <p>{dict.nav.categories}</p>
                {categorySlugs.map((slug) => (
                  <Link key={slug} href={`${base}/category/${slug}`}>
                    {dict.categories[slug].name}
                  </Link>
                ))}
              </div>
            </div>
          </details>
          <Link href={`${base}/search`} className="icon-btn" aria-label={dict.nav.search}>
            <svg width="17" height="17" viewBox="0 0 18 18" aria-hidden="true">
              <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
              <path d="M12 12l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </Link>
          <MemberNavButton locale={locale} />
          <ThemeToggle label={dict.nav.theme} />
          <LanguageSwitcher current={locale} />
        </div>
      </div>
    </header>
  );
}
