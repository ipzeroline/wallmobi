import { cookies } from "next/headers";
import crypto from "crypto";
import pool from "./db";
import { signSession, verifySession } from "./session-crypto";

const LEGACY_PASSWORD_SALT = "wallmobi_secret_salt_2026";
const PASSWORD_ITERATIONS = 210000;

// Hashes passwords securely using PBKDF2 (zero external dependencies)
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, PASSWORD_ITERATIONS, 64, "sha512").toString("hex");
  return `pbkdf2_sha512$${PASSWORD_ITERATIONS}$${salt}$${hash}`;
}

function safeEqualHex(left: string, right: string) {
  if (left.length !== right.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(left, "hex"), Buffer.from(right, "hex"));
  } catch {
    return false;
  }
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const parts = storedHash.split("$");
  if (parts.length === 4 && parts[0] === "pbkdf2_sha512") {
    const iterations = parseInt(parts[1], 10);
    const salt = parts[2];
    const expected = parts[3];
    if (!iterations || !salt || !expected) return false;
    const actual = crypto.pbkdf2Sync(password, salt, iterations, 64, "sha512").toString("hex");
    return safeEqualHex(actual, expected);
  }

  const legacyHash = crypto.pbkdf2Sync(password, LEGACY_PASSWORD_SALT, 10000, 64, "sha512").toString("hex");
  return safeEqualHex(legacyHash, storedHash);
}

const ADMIN_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const MEMBER_TIMEOUT = 2 * 60 * 60 * 1000; // 2 hours

// Retrieves the authenticated user, validates and extends session timeout (sliding expiration)
export async function getSessionUser() {
  const cookieStore = await cookies();
  const rawSessionToken = cookieStore.get("wallmobi_session")?.value;

  if (!rawSessionToken) return null;

  const sessionToken = decodeURIComponent(rawSessionToken);
  const verified = await verifySession(sessionToken);

  if (!verified) {
    const token = sessionToken.split("|")[0];
    if (token) {
      await pool.query("UPDATE users SET current_session_token = NULL WHERE current_session_token = ?", [token]);
    }
    cookieStore.delete("wallmobi_session");
    return null;
  }

  const { token } = verified;

  // Look up user by the static token UUID (no race condition since UUID is static in DB)
  const [rows] = await pool.query(
    "SELECT id, name, email, role, current_session_token FROM users WHERE current_session_token = ?",
    [token]
  );

  const user = (rows as any)[0];
  if (!user) {
    // Session token invalid (logged in on another device/concurrent login detected)
    return null;
  }

  // Session is valid: extend expiration (sliding window) on cookie only
  const isAdmin = user.role === "super_admin" || user.role === "staff";
  const timeout = isAdmin ? ADMIN_TIMEOUT : MEMBER_TIMEOUT;
  const newExpiresAt = Date.now() + timeout;
  const newSessionValue = await signSession(token, newExpiresAt);

  try {
    cookieStore.set("wallmobi_session", newSessionValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: Math.floor(timeout / 1000),
      path: "/",
    });
  } catch {
    // Next.js throws an error when attempting to modify cookies in a GET route handler or during SSR.
    // Swallowing it is safe; the cookie will be extended on the next mutation (POST/PUT/DELETE) request.
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
  const [userRows] = await pool.query("SELECT role FROM users WHERE id = ?", [userId]);
  const role = (userRows as any)[0]?.role || "member";

  const isAdmin = role === "super_admin" || role === "staff";
  const timeout = isAdmin ? ADMIN_TIMEOUT : MEMBER_TIMEOUT;
  const token = crypto.randomUUID();
  const expiresAt = Date.now() + timeout;
  const sessionToken = await signSession(token, expiresAt);
  
  // Store only the static UUID token in the database to prevent write races on subsequent reads
  await pool.query("UPDATE users SET current_session_token = ? WHERE id = ?", [token, userId]);

  const cookieStore = await cookies();
  cookieStore.set("wallmobi_session", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: Math.floor(timeout / 1000),
    path: "/",
  });
}

// Deletes the session cookie and invalidates it in the database
export async function clearSession() {
  const cookieStore = await cookies();
  const rawSessionToken = cookieStore.get("wallmobi_session")?.value;
  if (rawSessionToken) {
    const sessionToken = decodeURIComponent(rawSessionToken);
    const parts = sessionToken.split("|");
    const token = parts[0];
    await pool.query("UPDATE users SET current_session_token = NULL WHERE current_session_token = ?", [token]);
  }
  cookieStore.delete("wallmobi_session");
}
