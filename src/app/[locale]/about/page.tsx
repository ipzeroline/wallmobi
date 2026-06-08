import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { alternates } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.about.title, description: dict.about.p1, alternates: alternates(locale, "/about") };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  return (
    <section className="container section">
      <div className="prose">
        <p className="eyebrow">{dict.about.eyebrow}</p>
        <h1 className="h2" style={{ marginTop: ".4rem" }}>{dict.about.title}</h1>
        <p>{dict.about.p1}</p>
        <p>{dict.about.p2}</p>
        <h2>{dict.about.h2}</h2>
        <p>{dict.about.p3}</p>
      </div>
    </section>
  );
}
