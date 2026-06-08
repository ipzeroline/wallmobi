import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, defaultLocale, localeHtmlLang, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { site } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DetailsCloseHandler from "@/components/DetailsCloseHandler";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

function languageAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[localeHtmlLang[l]] = `/${l}${path}`;
  languages["x-default"] = `/${defaultLocale}${path}`;
  return languages;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  const title = `${site.name} — ${dict.meta.tagline}`;
  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s — ${site.name}` },
    description: dict.meta.description,
    applicationName: site.name,
    authors: [{ name: site.author }],
    alternates: { canonical: `/${locale}`, languages: languageAlternates("") },
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description: dict.meta.description,
      url: `/${locale}`,
      locale: localeHtmlLang[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeHtmlLang[l]),
    },
    twitter: { card: "summary_large_image", title, description: dict.meta.description, creator: site.twitter },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: `${site.url}/${l}`,
        name: site.name,
        description: dict.meta.description,
        inLanguage: localeHtmlLang[l],
        potentialAction: {
          "@type": "SearchAction",
          target: { "@type": "EntryPoint", urlTemplate: `${site.url}/${l}/search?q={search_term_string}` },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${site.url}/#org`,
        name: site.name,
        url: site.url,
        foundingDate: site.founded,
      },
      {
        "@type": "SiteNavigationElement",
        "@id": `${site.url}/${l}#navigation`,
        name: [
          dict.nav.home,
          dict.nav.gallery,
          dict.nav.categories,
          dict.nav.search,
          dict.nav.about,
          dict.nav.license,
        ],
        url: [
          `${site.url}/${l}`,
          `${site.url}/${l}/gallery`,
          ...Object.keys(dict.categories).map((slug) => `${site.url}/${l}/category/${slug}`),
          `${site.url}/${l}/search`,
          `${site.url}/${l}/about`,
          `${site.url}/${l}/license`,
        ],
      },
    ],
  };

  return (
    <html lang={localeHtmlLang[l]} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t='light';}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='light';}})();",
          }}
        />
      </head>
      <body>
        <GoogleAnalytics />
        <DetailsCloseHandler />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Header locale={l} dict={dict} />
        <main id="main">{children}</main>
        <Footer locale={l} dict={dict} />
      </body>
    </html>
  );
}
