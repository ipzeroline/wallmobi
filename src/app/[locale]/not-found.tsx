"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";

export default function NotFound() {
  const pathname = usePathname() || "/";
  const seg = pathname.split("/")[1];
  const locale: Locale = isLocale(seg) ? seg : defaultLocale;
  const dict = getDictionary(locale);
  const nf = dict.notFound;

  return (
    <section className="container nf">
      <div className="code">{nf.code}</div>
      <h1 className="h2" style={{ marginTop: "1rem" }}>{nf.title}</h1>
      <p className="lede" style={{ margin: ".8rem auto 0", maxWidth: "26rem" }}>{nf.lede}</p>
      <div className="mt-lg">
        <Link href={`/${locale}/gallery`} className="btn btn-primary">{nf.cta}</Link>
      </div>
    </section>
  );
}
