import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { hashPassword, setSession, verifyPassword } from "@/lib/auth";
import { headers } from "next/headers";
import { isRateLimited, recordRateLimitAttempt, resetRateLimitAttempts } from "@/lib/rate-limit";
import { serverErrorResponse } from "@/lib/api-response";

export async function POST(req: Request) {
  try {
    const { email, password, username_hp } = await req.json();

    // 1. Honeypot check
    if (username_hp) {
      return NextResponse.json({ error: "Security check failed" }, { status: 400 });
    }

    if (!email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 2. IP-based Rate Limiting (max 10 login attempts per 15 minutes)
    const reqHeaders = await headers();
    const ip = reqHeaders.get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1";

    const isSpamming = await isRateLimited(ip, "login", 10, 900);
    if (isSpamming) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again in 15 minutes." },
        { status: 429 }
      );
    }

    // Record the attempt (increment attempts)
    await recordRateLimitAttempt(ip, "login");

    const emailLower = email.toLowerCase().trim();

    const [rows] = await pool.query(
      "SELECT id, name, email, role, password_hash FROM users WHERE email = ? OR name = ? LIMIT 5",
      [emailLower, emailLower]
    );

    const user = (rows as any[]).find((row) => verifyPassword(password, row.password_hash));
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Reset attempts on successful login
    await resetRateLimitAttempts(ip, "login");

    if (!String(user.password_hash).startsWith("pbkdf2_sha512$")) {
      await pool.query("UPDATE users SET password_hash = ? WHERE id = ?", [hashPassword(password), user.id]);
    }

    // Set session, generating a new UUID session token and invalidating prior logins in the DB
    await setSession(user.id);

    return NextResponse.json({ success: true, user: { name: user.name, email: user.email, role: user.role } });
  } catch (err: any) {
    console.error("Login error:", err);
    return serverErrorResponse(err.message);
  }
}
