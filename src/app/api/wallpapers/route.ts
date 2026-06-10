import { NextResponse } from "next/server";
import { isLocale, type Locale } from "@/i18n/config";
import { getDbWallpapersPage } from "@/lib/db-wallpapers";
import { serverErrorResponse } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const localeParam = searchParams.get("locale") || "en";
    if (!isLocale(localeParam)) {
      return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
    }

    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
    const limit = Math.min(48, Math.max(1, parseInt(searchParams.get("limit") || "24", 10) || 24));
    const data = await getDbWallpapersPage(localeParam as Locale, page, limit);

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=300, stale-while-revalidate=3600",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  } catch (err: any) {
    console.error("Wallpapers page API error:", err);
    return serverErrorResponse(err.message);
  }
}
