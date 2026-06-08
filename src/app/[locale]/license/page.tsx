import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { alternates } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.license.title, description: dict.license.lede, alternates: alternates(locale, "/license") };
}

export default async function LicensePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const lic = dict.license;
  return (
    <section className="container section">
      <div className="lic">
        <p className="eyebrow">{lic.eyebrow}</p>
        <h1 className="h2" style={{ marginTop: ".4rem" }}>{lic.title}</h1>
        <p className="lede" style={{ marginTop: ".7rem" }}>{lic.lede}</p>

        <h3>{lic.canTitle}</h3>
        <ul>{lic.can.map((t, i) => <li key={i}>{t}</li>)}</ul>

        <h3>{lic.dontTitle}</h3>
        <ul>{lic.dont.map((t, i) => <li key={i}>{t}</li>)}</ul>

        <p className="note">{lic.note}</p>
      </div>
    </section>
  );
}
