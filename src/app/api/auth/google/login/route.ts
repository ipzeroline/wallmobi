import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const locale = searchParams.get("locale") || "en";

    // 1. Generate secure random state token to protect against CSRF attacks
    const state = crypto.randomBytes(32).toString("hex");

    // 2. PKCE (Proof Key for Code Exchange) implementation
    // Generate a high-entropy cryptographically secure random verifier
    const codeVerifier = crypto.randomBytes(32).toString("base64url");
    // Calculate SHA-256 hash and encode as base64url
    const codeChallenge = crypto
      .createHash("sha256")
      .update(codeVerifier)
      .digest()
      .toString("base64url");

    const cookieStore = await cookies();
    
    // 3. Save state, code_verifier, and locale in secure, temporary cookies
    cookieStore.set("google_oauth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 10, // 10 minutes
      path: "/",
    });

    cookieStore.set("google_oauth_verifier", codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 10, // 10 minutes
      path: "/",
    });

    cookieStore.set("google_oauth_locale", locale, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 10, // 10 minutes
      path: "/",
    });

    // 4. Construct official Google OAuth 2.0 Auth Code URI
    const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/auth/google/callback`;
    const clientId = process.env.GOOGLE_CLIENT_ID || "";

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "openid email profile",
      state: state,
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
      prompt: "select_account",
    });

    return NextResponse.redirect(`${googleAuthUrl}?${params.toString()}`);
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to initiate login flow: " + err.message }, { status: 500 });
  }
}
