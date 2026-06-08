export const locales = ["en", "th", "my", "lo", "km", "vi"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

// Native names shown in the language switcher
export const localeNames: Record<Locale, string> = {
  en: "English",
  th: "ไทย",
  my: "မြန်မာ",
  lo: "ລາວ",
  km: "ខ្មែរ",
  vi: "Tiếng Việt",
};

// BCP-47 tags for <html lang> and hreflang
export const localeHtmlLang: Record<Locale, string> = {
  en: "en",
  th: "th",
  my: "my",
  lo: "lo",
  km: "km",
  vi: "vi",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
