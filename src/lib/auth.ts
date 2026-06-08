import { cookies } from "next/headers";
import crypto from "crypto";
import pool from "./db";

// Hashes passwords securely using PBKDF2 (zero external dependencies)
export function hashPassword(password: string): string {
  const salt = "wallmobi_secret_salt_2026";
  return crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
}

// Retrieves the authenticated user and validates session token in database
export async function getSessionUser() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("wallmobi_session")?.value;

  if (!sessionToken) return null;

  const [rows] = await pool.query(
    "SELECT id, name, email, role, current_session_token FROM users WHERE current_session_token = ?",
    [sessionToken]
  );

  const user = (rows as any)[0];
  if (!user) {
    // Session token invalid (logged in on another device/concurrent login detected)
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

// Establishes a session, overwriting any previous token to prevent concurrent logins
export async function setSession(userId: number) {
  const sessionToken = crypto.randomUUID();
  
  await pool.query("UPDATE users SET current_session_token = ? WHERE id = ?", [sessionToken, userId]);

  const cookieStore = await cookies();
  cookieStore.set("wallmobi_session", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  });
}

// Deletes the session cookie
export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete("wallmobi_session");
}
