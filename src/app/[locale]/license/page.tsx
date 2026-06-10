import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { alternates } from "@/lib/seo";
import { site } from "@/lib/site";
import { LICENSE_CONTENT } from "./content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const content = LICENSE_CONTENT[locale as Locale] || LICENSE_CONTENT.en;
  return {
    title: content.heroTitle,
    description: content.heroSubtitle,
    alternates: alternates(locale, "/license"),
  };
}

export default async function LicensePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);
  const content = LICENSE_CONTENT[l] || LICENSE_CONTENT.en;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${site.url}/${l}/license#webpage`,
        url: `${site.url}/${l}/license`,
        name: content.heroTitle,
        description: content.heroSubtitle,
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: dict.category.home, item: `${site.url}/${l}` },
            { "@type": "ListItem", position: 2, name: dict.nav.license, item: `${site.url}/${l}/license` },
          ],
        }
      },
      {
        "@type": "FAQPage",
        "@id": `${site.url}/${l}/license#faq`,
        mainEntity: content.faqs.map(faq => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a
          }
        }))
      }
    ]
  };

  return (
    <article className="container section" style={{ maxWidth: "880px", marginInline: "auto" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <nav className="crumb" aria-label="Breadcrumb" style={{ marginBottom: "2rem" }}>
        <Link href={`/${l}`}>{dict.category.home}</Link><i>/</i>
        <span style={{ color: "var(--text-2)" }}>{dict.nav.license}</span>
      </nav>

      {/* Hero Header */}
      <header className="center" style={{ marginBottom: "3.5rem", textAlign: "center" }}>
        <p className="eyebrow" style={{ letterSpacing: "0.15em", color: "var(--accent)", textTransform: "uppercase", fontWeight: 600 }}>
          {dict.nav.license}
        </p>
        <h1
          className="h1"
          style={{
            fontSize: "clamp(2rem, 5vw, 2.8rem)",
            lineHeight: 1.15,
            marginTop: "0.6rem",
            marginBottom: "1.2rem",
            textWrap: "balance",
            fontWeight: 800,
            color: "var(--text-1)",
            letterSpacing: "-0.5px"
          }}
        >
          {content.heroTitle}
        </h1>
        <p
          className="lede"
          style={{
            fontSize: "1.15rem",
            color: "var(--text-2)",
            maxWidth: "700px",
            marginInline: "auto",
            lineHeight: 1.6,
            textWrap: "pretty"
          }}
        >
          {content.heroSubtitle}
        </p>
      </header>

      {/* Allowed vs Prohibited Grid */}
      <section style={{ marginBottom: "4.5rem", display: "grid", gap: "2rem", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
        
        {/* Allowed Section */}
        <div 
          style={{ 
            background: "var(--bg-alt)", 
            border: "1px solid rgba(76, 217, 100, 0.25)", 
            borderRadius: "20px", 
            padding: "2.2rem 1.8rem",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.02)"
          }}
        >
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#2e7d32", marginBottom: "1.5rem", marginTop: 0, display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "24px", height: "24px", borderRadius: "50%", background: "#e8f5e9", color: "#2e7d32", fontSize: "0.9rem" }}>✓</span>
            {content.canTitle}
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
            {content.canItems.map((item, idx) => (
              <li key={idx} style={{ color: "var(--text-2)", fontSize: "0.96rem", lineHeight: 1.5, position: "relative", paddingLeft: "1.5rem" }}>
                <span style={{ position: "absolute", left: 0, color: "#2e7d32" }}>•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Prohibited Section */}
        <div 
          style={{ 
            background: "var(--bg-alt)", 
            border: "1px solid rgba(255, 59, 48, 0.2)", 
            borderRadius: "20px", 
            padding: "2.2rem 1.8rem",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.02)"
          }}
        >
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#c62828", marginBottom: "1.5rem", marginTop: 0, display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "24px", height: "24px", borderRadius: "50%", background: "#ffebee", color: "#c62828", fontSize: "0.9rem" }}>✕</span>
            {content.dontTitle}
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
            {content.dontItems.map((item, idx) => (
              <li key={idx} style={{ color: "var(--text-2)", fontSize: "0.96rem", lineHeight: 1.5, position: "relative", paddingLeft: "1.5rem" }}>
                <span style={{ position: "absolute", left: 0, color: "#c62828" }}>•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

      </section>

      {/* Explanatory Sections */}
      <section style={{ marginBottom: "4.5rem", display: "flex", flexDirection: "column", gap: "3rem" }}>
        
        {/* Section 1 */}
        <div style={{ borderTop: "1px solid var(--line)", paddingTop: "2.5rem" }}>
          <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text-1)", marginBottom: "1rem", marginTop: 0 }}>
            {content.section1Title}
          </h3>
          <p style={{ color: "var(--text-2)", fontSize: "1.02rem", lineHeight: 1.65, margin: 0 }}>
            {content.section1Content}
          </p>
        </div>

        {/* Section 2 */}
        <div style={{ borderTop: "1px solid var(--line)", paddingTop: "2.5rem" }}>
          <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text-1)", marginBottom: "1rem", marginTop: 0 }}>
            {content.section2Title}
          </h3>
          <p style={{ color: "var(--text-2)", fontSize: "1.02rem", lineHeight: 1.65, margin: 0 }}>
            {content.section2Content}
          </p>
        </div>

        {/* Section 3 */}
        <div style={{ borderTop: "1px solid var(--line)", paddingTop: "2.5rem" }}>
          <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text-1)", marginBottom: "1rem", marginTop: 0 }}>
            {content.section3Title}
          </h3>
          <p style={{ color: "var(--text-2)", fontSize: "1.02rem", lineHeight: 1.65, margin: 0 }}>
            {content.section3Content}
          </p>
        </div>

      </section>

      {/* FAQ Section */}
      <section style={{ borderTop: "1px solid var(--line)", paddingTop: "3rem", paddingBottom: "2.5rem" }}>
        <h2 className="h2" style={{ fontSize: "1.6rem", marginBottom: "2rem", textAlign: "center", fontWeight: 700 }}>
          {content.faqTitle}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {content.faqs.map((faq, idx) => (
            <div 
              key={idx} 
              style={{ 
                background: "var(--bg-alt)", 
                border: "1px solid var(--line)", 
                borderRadius: "14px", 
                padding: "1.5rem" 
              }}
            >
              <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--text-1)", margin: "0 0 0.75rem 0" }}>
                Q: {faq.q}
              </h3>
              <p style={{ color: "var(--text-2)", fontSize: "0.98rem", lineHeight: 1.55, margin: 0 }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
