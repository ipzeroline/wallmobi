import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { hashPassword, setSession } from "@/lib/auth";
import { headers } from "next/headers";
import { isRateLimited, recordRateLimitAttempt, resetRateLimitAttempts } from "@/lib/rate-limit";

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
    const passwordHash = hashPassword(password);

    const [rows] = await pool.query(
      "SELECT id, name, email, role FROM users WHERE (email = ? OR name = ?) AND password_hash = ?",
      [emailLower, emailLower, passwordHash]
    );

    const user = (rows as any)[0];
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Reset attempts on successful login
    await resetRateLimitAttempts(ip, "login");

    // Set session, generating a new UUID session token and invalidating prior logins in the DB
    await setSession(user.id);

    return NextResponse.json({ success: true, user: { name: user.name, email: user.email, role: user.role } });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
