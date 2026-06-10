import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { alternates } from "@/lib/seo";
import { site } from "@/lib/site";
import { CONTACT_CONTENT } from "./content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const content = CONTACT_CONTENT[locale as Locale] || CONTACT_CONTENT.en;
  return {
    title: content.heroTitle,
    description: content.heroSubtitle,
    alternates: alternates(locale, "/contact"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);
  const content = CONTACT_CONTENT[l] || CONTACT_CONTENT.en;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${site.url}/${l}/contact#webpage`,
        url: `${site.url}/${l}/contact`,
        name: content.heroTitle,
        description: content.heroSubtitle,
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: dict.category.home, item: `${site.url}/${l}` },
            { "@type": "ListItem", position: 2, name: dict.nav.contact, item: `${site.url}/${l}/contact` },
          ],
        },
        mainEntity: {
          "@type": "Organization",
          name: site.name,
          url: site.url,
          logo: `${site.url}/icon.png`,
          contactPoint: {
            "@type": "ContactPoint",
            email: "funmask101@gmail.com",
            contactType: "customer service"
          }
        }
      },
      {
        "@type": "FAQPage",
        "@id": `${site.url}/${l}/contact#faq`,
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
        <span style={{ color: "var(--text-2)" }}>{dict.nav.contact}</span>
      </nav>

      {/* Hero Section */}
      <header className="center" style={{ marginBottom: "3.5rem", textAlign: "center" }}>
        <p className="eyebrow" style={{ letterSpacing: "0.15em", color: "var(--accent)", textTransform: "uppercase", fontWeight: 600 }}>
          {dict.nav.contact}
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
            maxWidth: "680px",
            marginInline: "auto",
            lineHeight: 1.6,
            textWrap: "pretty",
          }}
        >
          {content.heroSubtitle}
        </p>
      </header>

      {/* Primary Email Card */}
      <section style={{ marginBottom: "4rem" }}>
        <div 
          style={{ 
            background: "linear-gradient(135deg, var(--bg-alt) 0%, rgba(99, 102, 241, 0.05) 100%)", 
            border: "1px solid var(--line)", 
            borderRadius: "24px", 
            padding: "2.5rem 2rem", 
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem"
          }}
        >
          <div style={{ background: "rgba(99, 102, 241, 0.1)", borderRadius: "50%", padding: "1rem", display: "inline-flex" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
          <div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--text-1)", margin: "0 0 0.5rem 0" }}>
              {content.emailCardTitle}
            </h2>
            <a 
              href="mailto:funmask101@gmail.com"
              className="hover-opacity"
              style={{ 
                fontSize: "clamp(1.5rem, 4vw, 2.2rem)", 
                fontWeight: 700, 
                color: "var(--accent)", 
                textDecoration: "none", 
                wordBreak: "break-all",
                display: "inline-block",
                margin: "0.25rem 0",
                transition: "color 0.2s"
              }}
            >
              funmask101@gmail.com
            </a>
            <p style={{ fontSize: "0.9rem", color: "var(--text-3)", margin: "0.5rem 0 0 0" }}>
              {content.emailCardNote}
            </p>
          </div>
        </div>
      </section>

      {/* Grid of Topics */}
      <section style={{ marginBottom: "4rem", borderTop: "1px solid var(--line)", paddingTop: "3rem" }}>
        <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
          
          <div style={{ background: "var(--bg-alt)", padding: "2rem 1.6rem", borderRadius: "16px", border: "1px solid var(--line)", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-1)", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
              🎨 {content.topic1Title}
            </h3>
            <p style={{ color: "var(--text-2)", fontSize: "0.95rem", lineHeight: 1.55, margin: 0 }}>
              {content.topic1Desc}
            </p>
          </div>

          <div style={{ background: "var(--bg-alt)", padding: "2rem 1.6rem", borderRadius: "16px", border: "1px solid var(--line)", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-1)", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
              💼 {content.topic2Title}
            </h3>
            <p style={{ color: "var(--text-2)", fontSize: "0.95rem", lineHeight: 1.55, margin: 0 }}>
              {content.topic2Desc}
            </p>
          </div>

          <div style={{ background: "var(--bg-alt)", padding: "2rem 1.6rem", borderRadius: "16px", border: "1px solid var(--line)", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-1)", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
              ⚠️ {content.topic3Title}
            </h3>
            <p style={{ color: "var(--text-2)", fontSize: "0.95rem", lineHeight: 1.55, margin: 0 }}>
              {content.topic3Desc}
            </p>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ borderTop: "1px solid var(--line)", paddingTop: "3rem", paddingBottom: "2rem" }}>
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
