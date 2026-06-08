import { locales, defaultLocale, localeHtmlLang, type Locale } from "@/i18n/config";

// Build canonical + hreflang language map for a route.
// `path` is the part AFTER the locale, e.g. "/gallery" or "/wallpaper/aurora-drift" or "".
export function alternates(locale: Locale, path: string) {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[localeHtmlLang[l]] = `/${l}${path}`;
  languages["x-default"] = `/${defaultLocale}${path}`;
  return { canonical: `/${locale}${path}`, languages };
}
