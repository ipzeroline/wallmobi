import "./globals.css";
import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
};

// The real <html>/<body> are rendered in src/app/[locale]/layout.tsx so that
// the lang attribute and metadata can depend on the active locale.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
