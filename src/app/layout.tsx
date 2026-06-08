import "./globals.css";
import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// The real <html>/<body> are rendered in src/app/[locale]/layout.tsx so that
// the lang attribute and metadata can depend on the active locale.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
