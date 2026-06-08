import { defaultLocale, locales, type Locale } from "@/i18n/config";

const countryLocaleMap: Record<string, Locale> = {
  TH: "th",
  VN: "vi",
  MM: "my",
  LA: "lo",
  KH: "km",
};

function isSupportedLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function pickLocaleFromHeaders(headers: Pick<Headers, "get">): Locale {
  const country = (
    headers.get("x-vercel-ip-country") ||
    headers.get("cf-ipcountry") ||
    headers.get("x-country-code") ||
    ""
  ).toUpperCase();

  if (country) {
    return countryLocaleMap[country] || defaultLocale;
  }

  const acceptLanguage = headers.get("accept-language");
  if (acceptLanguage) {
    const wanted = acceptLanguage
      .split(",")
      .map((part) => {
        const [tag, q] = part.trim().split(";q=");
        return { tag: tag.toLowerCase().split("-")[0], q: q ? Number.parseFloat(q) : 1 };
      })
      .sort((a, b) => b.q - a.q);

    for (const { tag } of wanted) {
      if (isSupportedLocale(tag)) return tag;
    }
  }

  return defaultLocale;
}
