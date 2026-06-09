const COOKIE_SECRET = "wallmobi_cookie_secure_signing_salt_2026";

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
  const signature = await hmacSha256(data, COOKIE_SECRET);
  return `${data}|${signature}`;
}

export async function verifySession(cookieValue: string): Promise<{ token: string; expiresAt: number } | null> {
  try {
    const parts = cookieValue.split("|");
    if (parts.length !== 3) return null;
    const [token, expiresAtStr, signature] = parts;
    const expiresAt = parseInt(expiresAtStr, 10);
    
    const data = `${token}|${expiresAt}`;
    const expectedSignature = await hmacSha256(data, COOKIE_SECRET);
    
    if (signature !== expectedSignature) return null;
    if (Date.now() > expiresAt) return null;
    
    return { token, expiresAt };
  } catch {
    return null;
  }
}
