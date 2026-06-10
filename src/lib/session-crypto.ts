const fallbackCookieSecret = "wallmobi_cookie_secure_signing_salt_2026";

function getCookieSecret() {
  const secret = process.env.SESSION_SECRET || process.env.COOKIE_SECRET;
  if (secret) return secret;
  if (process.env.NODE_ENV === "production") {
    throw new Error("SESSION_SECRET is required in production.");
  }
  return fallbackCookieSecret;
}

function timingSafeEqualHex(a: string, b: string) {
  if (!/^[a-f0-9]+$/i.test(a) || !/^[a-f0-9]+$/i.test(b)) return false;
  const left = new Uint8Array(a.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []);
  const right = new Uint8Array(b.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []);
  if (left.length !== right.length) return false;

  let diff = 0;
  for (let i = 0; i < left.length; i += 1) {
    diff |= left[i] ^ right[i];
  }
  return diff === 0;
}

async function hmacSha256(message: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const messageData = encoder.encode(message);

  const key = await globalThis.crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await globalThis.crypto.subtle.sign("HMAC", key, messageData);
  
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function signSession(token: string, expiresAt: number): Promise<string> {
  const data = `${token}|${expiresAt}`;
  const signature = await hmacSha256(data, getCookieSecret());
  return `${data}|${signature}`;
}

export async function verifySession(cookieValue: string): Promise<{ token: string; expiresAt: number } | null> {
  try {
    const parts = cookieValue.split("|");
    if (parts.length !== 3) return null;
    const [token, expiresAtStr, signature] = parts;
    const expiresAt = parseInt(expiresAtStr, 10);
    
    const data = `${token}|${expiresAt}`;
    const expectedSignature = await hmacSha256(data, getCookieSecret());
    
    if (!timingSafeEqualHex(signature, expectedSignature)) return null;
    if (Date.now() > expiresAt) return null;
    
    return { token, expiresAt };
  } catch {
    return null;
  }
}
