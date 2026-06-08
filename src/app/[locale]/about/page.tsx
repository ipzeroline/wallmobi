import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { alternates } from "@/lib/seo";
import { ABOUT_CONTENT } from "./content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const content = ABOUT_CONTENT[locale as Locale] || ABOUT_CONTENT.en;
  return {
    title: content.heroTitle,
    description: content.heroSubtitle,
    alternates: alternates(locale, "/about"),
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);
  const content = ABOUT_CONTENT[l];

  return (
    <article className="container section" style={{ maxWidth: "880px", marginInline: "auto" }}>
      {/* Hero Section */}
      <header className="center" style={{ marginBottom: "3.5rem" }}>
        <p className="eyebrow" style={{ letterSpacing: "0.15em", color: "var(--accent)" }}>
          {dict.about.eyebrow}
        </p>
        <h1
          className="h1"
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            lineHeight: 1.15,
            marginTop: "0.6rem",
            marginBottom: "1.2rem",
            textWrap: "balance",
          }}
        >
          {content.heroTitle}
        </h1>
        <p
          className="lede"
          style={{
            fontSize: "1.15rem",
            color: "var(--text-2)",
            maxWidth: "650px",
            marginInline: "auto",
            lineHeight: 1.55,
            textWrap: "pretty",
          }}
        >
          {content.heroSubtitle}
        </p>
      </header>

      {/* Our Design Philosophy */}
      <section style={{ marginBottom: "4rem" }}>
        <h2 className="h2" style={{ fontSize: "1.6rem", marginBottom: "1.2rem" }}>
          {content.philosophyTitle}
        </h2>
        <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          <p style={{ color: "var(--text-2)", lineHeight: 1.6, fontSize: "1.05rem" }}>
            {content.philosophyText1}
          </p>
          <p style={{ color: "var(--text-2)", lineHeight: 1.6, fontSize: "1.05rem" }}>
            {content.philosophyText2}
          </p>
        </div>
      </section>

      {/* Process / Steps */}
      <section style={{ marginBottom: "4rem", borderTop: "1px solid var(--line)", paddingTop: "3rem" }}>
        <h2 className="h2" style={{ fontSize: "1.6rem", marginBottom: "2rem", textAlign: "center" }}>
          {content.processTitle}
        </h2>
        <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          <div style={{ background: "var(--bg-alt)", padding: "2rem 1.6rem", borderRadius: "16px", border: "1px solid var(--line)" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: "0.6rem" }}>
              {content.processStep1Title}
            </h3>
            <p style={{ color: "var(--text-2)", fontSize: "0.95rem", lineHeight: 1.55 }}>
              {content.processStep1Desc}
            </p>
          </div>
          <div style={{ background: "var(--bg-alt)", padding: "2rem 1.6rem", borderRadius: "16px", border: "1px solid var(--line)" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: "0.6rem" }}>
              {content.processStep2Title}
            </h3>
            <p style={{ color: "var(--text-2)", fontSize: "0.95rem", lineHeight: 1.55 }}>
              {content.processStep2Desc}
            </p>
          </div>
          <div style={{ background: "var(--bg-alt)", padding: "2rem 1.6rem", borderRadius: "16px", border: "1px solid var(--line)" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: "0.6rem" }}>
              {content.processStep3Title}
            </h3>
            <p style={{ color: "var(--text-2)", fontSize: "0.95rem", lineHeight: 1.55 }}>
              {content.processStep3Desc}
            </p>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section style={{ marginBottom: "4rem", borderTop: "1px solid var(--line)", paddingTop: "3rem" }}>
        <h2 className="h2" style={{ fontSize: "1.6rem", marginBottom: "2rem", textAlign: "center" }}>
          {content.featuresTitle}
        </h2>
        <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--accent)" }}>✓ {content.feature1Title}</h3>
            <p style={{ color: "var(--text-2)", fontSize: "0.95rem", lineHeight: 1.55 }}>{content.feature1Desc}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--accent)" }}>✓ {content.feature2Title}</h3>
            <p style={{ color: "var(--text-2)", fontSize: "0.95rem", lineHeight: 1.55 }}>{content.feature2Desc}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--accent)" }}>✓ {content.feature3Title}</h3>
            <p style={{ color: "var(--text-2)", fontSize: "0.95rem", lineHeight: 1.55 }}>{content.feature3Desc}</p>
          </div>
        </div>
      </section>

      {/* Device Compatibility */}
      <section style={{ borderTop: "1px solid var(--line)", paddingTop: "3rem", paddingBottom: "2rem" }}>
        <h2 className="h2" style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>
          {content.compatibilityTitle}
        </h2>
        <p style={{ color: "var(--text-2)", lineHeight: 1.6, fontSize: "1.05rem", marginBottom: "1.5rem" }}>
          {content.compatibilityDesc}
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.8rem", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {content.compatibilityList.map((device, idx) => (
            <li
              key={idx}
              style={{
                position: "relative",
                paddingLeft: "1.5rem",
                color: "var(--text-2)",
                fontSize: "0.96rem",
                lineHeight: 1.45,
              }}
            >
              <span style={{ position: "absolute", left: 0, color: "var(--accent)", fontWeight: "bold" }}>•</span>
              {device}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
