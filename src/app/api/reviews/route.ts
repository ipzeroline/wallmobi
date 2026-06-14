import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { serverErrorResponse } from "@/lib/api-response";
import { getApprovedReviews, isReviewLocale, normalizeRating } from "@/lib/reviews";
import { sendTelegramNotification } from "@/lib/telegram";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const locale = searchParams.get("locale") || "en";

    if (!isReviewLocale(locale)) {
      return NextResponse.json({ error: "Unsupported review locale" }, { status: 400 });
    }

    const reviews = await getApprovedReviews(locale);
    return NextResponse.json({ reviews });
  } catch (err: any) {
    console.error("Reviews GET error:", err);
    return serverErrorResponse(err.message);
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Please sign in before writing a review." }, { status: 401 });
    }

    const { locale, rating, title, body } = await req.json();
    if (!isReviewLocale(locale)) {
      return NextResponse.json({ error: "Unsupported review locale" }, { status: 400 });
    }

    const normalizedRating = normalizeRating(rating);
    const cleanTitle = String(title || "").trim().slice(0, 120);
    const cleanBody = String(body || "").trim().slice(0, 2000);

    if (!normalizedRating || cleanTitle.length < 3 || cleanBody.length < 20) {
      return NextResponse.json(
        { error: "Please add a rating, a short title, and a review of at least 20 characters." },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      `INSERT INTO reviews (user_id, locale, rating, title, body, status)
       VALUES (?, ?, ?, ?, ?, 'pending')`,
      [user.id, locale, normalizedRating, cleanTitle, cleanBody]
    );

    const reviewId = (result as any).insertId;
    const formattedDate = new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" });
    const tgMessage =
      `🔔 <b>มีรีวิวใหม่รออนุมัติ</b>\n\n` +
      `#️⃣ <b>Review ID:</b> ${reviewId}\n` +
      `👤 <b>สมาชิก:</b> ${escapeHtml(user.name)}\n` +
      `✉️ <b>อีเมล:</b> ${escapeHtml(user.email)}\n` +
      `🌐 <b>ภาษา:</b> ${escapeHtml(locale)}\n` +
      `⭐ <b>คะแนน:</b> ${normalizedRating}/5\n` +
      `📝 <b>หัวข้อ:</b> ${escapeHtml(cleanTitle)}\n` +
      `📅 <b>เวลา:</b> ${formattedDate}\n\n` +
      `ไปที่ AdminConsole เพื่ออนุมัติรีวิว`;

    sendTelegramNotification(tgMessage).catch((e) => console.error("Telegram review error:", e));

    return NextResponse.json({ success: true, status: "pending" });
  } catch (err: any) {
    console.error("Reviews POST error:", err);
    return serverErrorResponse(err.message);
  }
}
