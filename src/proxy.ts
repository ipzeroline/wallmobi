import { NextRequest, NextResponse } from "next/server";
import { locales } from "./i18n/config";
import { pickLocaleFromHeaders } from "./lib/locale-detection";
import { verifySession } from "./lib/session-crypto";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Protect direct access to wallpapers (including uploads)
  if (pathname.startsWith("/wallpapers/")) {
    const rawSessionToken = req.cookies.get("wallmobi_session")?.value;
    if (!rawSessionToken) {
      return new NextResponse(
        JSON.stringify({ error: "Unauthorized. Please log in to download." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const sessionToken = decodeURIComponent(rawSessionToken);
    const verified = await verifySession(sessionToken);
    if (!verified) {
      return new NextResponse(
        JSON.stringify({ error: "Unauthorized. Invalid or expired session." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    return NextResponse.next();
  }

  // 2. Locale redirection / proxy logic
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return NextResponse.next();

  const locale = pickLocaleFromHeaders(req.headers);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}
