import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { hashPassword, setSession } from "@/lib/auth";
import { sendTelegramNotification } from "@/lib/telegram";
import { headers } from "next/headers";
import { isRateLimited, recordRateLimitAttempt, resetRateLimitAttempts } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const { name, email, password, username_hp } = await req.json();

    // 1. Honeypot check: If the hidden field is filled, it's a bot
    if (username_hp) {
      return NextResponse.json({ error: "Security check failed" }, { status: 400 });
    }

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 2. IP-based Rate Limiting (max 5 registration attempts per 15 minutes)
    const reqHeaders = await headers();
    const ip = reqHeaders.get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1";

    const isSpamming = await isRateLimited(ip, "register", 5, 900);
    if (isSpamming) {
      return NextResponse.json(
        { error: "Too many registration attempts. Please try again in 15 minutes." },
        { status: 429 }
      );
    }

    // Record the attempt
    await recordRateLimitAttempt(ip, "register");

    const emailLower = email.toLowerCase().trim();

    // Check if user exists
    const [existing] = await pool.query("SELECT id FROM users WHERE email = ?", [emailLower]);
    if ((existing as any).length > 0) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    // Insert user
    const passwordHash = hashPassword(password);
    const [result] = await pool.query(
      "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
      [name, emailLower, passwordHash]
    );

    const userId = (result as any).insertId;

    // Establish session (which generates a token and sets cookies)
    await setSession(userId);

    // Reset rate limit count on successful registration
    await resetRateLimitAttempts(ip, "register");

    // Send Telegram Alert (Non-blocking so it doesn't delay registration response)
    const formattedDate = new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" });
    const tgMessage = `🔔 <b>มีสมาชิกใหม่ลงทะเบียน! (อีเมล)</b>\n\n👤 <b>ชื่อ:</b> ${name}\n✉️ <b>อีเมล:</b> ${emailLower}\n🔑 <b>ช่องทาง:</b> Email/Password\n📅 <b>เวลา:</b> ${formattedDate}`;
    sendTelegramNotification(tgMessage).catch((e) => console.error("Telegram error:", e));

    return NextResponse.json({ success: true, user: { name, email: emailLower } });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
