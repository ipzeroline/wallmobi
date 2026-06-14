import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import pool from "@/lib/db";
import { setSession, hashPassword } from "@/lib/auth";
import crypto from "crypto";
import { sendTelegramNotification } from "@/lib/telegram";
import { getRequestOrigin } from "@/lib/request-origin";

export async function GET(req: Request) {
  const cookieStore = await cookies();
  const savedState = cookieStore.get("google_oauth_state")?.value;
  const savedVerifier = cookieStore.get("google_oauth_verifier")?.value;
  const savedLocale = cookieStore.get("google_oauth_locale")?.value || "en";
  const savedOrigin = cookieStore.get("google_oauth_origin")?.value || getRequestOrigin(req);

  // Clean up cookies immediately
  cookieStore.delete("google_oauth_state");
  cookieStore.delete("google_oauth_verifier");
  cookieStore.delete("google_oauth_locale");
  cookieStore.delete("google_oauth_origin");

  const redirectWithError = (reason = "google") => {
    const params = new URLSearchParams({ authError: reason });
    return NextResponse.redirect(`${savedOrigin}/${savedLocale}/member?${params.toString()}`);
  };

  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const googleError = searchParams.get("error");

    if (googleError) {
      console.error("Google OAuth returned error:", googleError, searchParams.get("error_description"));
      return redirectWithError(googleError);
    }

    // 1. CSRF Verification
    if (!state || !savedState || state !== savedState) {
      return new Response("CSRF Verification failed: state parameter mismatch", { status: 400 });
    }

    // PKCE Verification
    if (!savedVerifier) {
      return new Response("PKCE Verification failed: code verifier cookie missing", { status: 400 });
    }

    if (!code) {
      return new Response("Authorization code missing", { status: 400 });
    }

    // 2. Exchange code for Google Access & ID Tokens (including PKCE verifier)
    const tokenUrl = "https://oauth2.googleapis.com/token";
    const redirectUri = `${savedOrigin}/api/auth/google/callback`;
    
    const tokenParams = new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID || "",
      client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
      code_verifier: savedVerifier,
    });

    const tokenRes = await fetch(tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: tokenParams.toString(),
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      throw new Error(`Failed to exchange code for tokens: ${errText}`);
    }

    const { access_token } = await tokenRes.json();

    // 3. Fetch User Profile Info using the secure Access Token
    const userInfoUrl = "https://openidconnect.googleapis.com/v1/userinfo";
    const userRes = await fetch(userInfoUrl, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (!userRes.ok) {
      throw new Error("Failed to retrieve user info from Google");
    }

    const profile = await userRes.json();
    const email = profile.email?.toLowerCase().trim();
    const name = profile.name || profile.given_name || "Google User";

    if (!email) {
      throw new Error("Google account does not expose a valid email address");
    }

    // Enforce email verification check to prevent account takeover spoofing
    if (profile.email_verified !== true && profile.email_verified !== "true") {
      throw new Error("Google account email is not verified");
    }

    // 4. Locate or Create User in the Database
    let userId: number;
    const [existing] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
    
    if ((existing as any).length > 0) {
      userId = (existing as any)[0].id;
    } else {
      // Create user record with a randomized secure password hash
      const randomPassword = crypto.randomBytes(32).toString("hex");
      const passwordHash = hashPassword(randomPassword);

      const [result] = await pool.query(
        "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
        [name, email, passwordHash]
      );
      userId = (result as any).insertId;

      // Send Telegram alert for Google signup. The helper catches its own errors.
      const formattedDate = new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" });
      const tgMessage = `🔔 <b>มีสมาชิกใหม่ลงทะเบียน! (Google)</b>\n\n👤 <b>ชื่อ:</b> ${name}\n✉️ <b>อีเมล:</b> ${email}\n🔑 <b>ช่องทาง:</b> Google Login\n📅 <b>เวลา:</b> ${formattedDate}`;
      await sendTelegramNotification(tgMessage);
    }

    // 5. Establish Session (Unique token preventing concurrent logins)
    await setSession(userId);

    // 6. Redirect back to the localized dashboard
    return NextResponse.redirect(`${savedOrigin}/${savedLocale}/member`);
  } catch (err: any) {
    console.error("Google authentication error:", err);
    return redirectWithError("google");
  }
}
