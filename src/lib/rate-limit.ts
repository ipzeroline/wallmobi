import pool from "./db";

/**
 * Checks if a given IP has exceeded the allowed attempts for a specific action.
 * If the last attempt was outside the window, it automatically clears the status.
 * 
 * @param ip Client IP address
 * @param action Action name (e.g. 'register', 'login')
 * @param maxAttempts Maximum attempts allowed
 * @param windowSeconds Window duration in seconds
 * @returns Promise<boolean> True if rate-limited (blocked), False if allowed
 */
export async function isRateLimited(
  ip: string,
  action: string,
  maxAttempts: number,
  windowSeconds: number
): Promise<boolean> {
  try {
    const [rows] = await pool.query(
      "SELECT attempt_count, UNIX_TIMESTAMP(last_attempt) as last_attempt_ts FROM rate_limit_attempts WHERE ip = ? AND action = ?",
      [ip, action]
    );

    const record = (rows as any)[0];
    if (!record) {
      return false; // Not rate limited, no prior attempts
    }

    const nowTs = Math.floor(Date.now() / 1000);
    const elapsedSeconds = nowTs - record.last_attempt_ts;

    if (elapsedSeconds > windowSeconds) {
      // The limit window has expired, reset attempt count to 0
      await pool.query(
        "UPDATE rate_limit_attempts SET attempt_count = 0 WHERE ip = ? AND action = ?",
        [ip, action]
      );
      return false; // Reset complete, not rate-limited
    }

    // Within the window, check if attempts meet or exceed max allowed
    return record.attempt_count >= maxAttempts;
  } catch (err) {
    console.error("Rate limit check error:", err);
    return false; // Fail-open to prevent user lockout in case of database issues
  }
}

/**
 * Records an attempt (inserts a new entry or increments the attempt count)
 */
export async function recordRateLimitAttempt(ip: string, action: string) {
  try {
    await pool.query(
      `INSERT INTO rate_limit_attempts (ip, action, attempt_count) 
       VALUES (?, ?, 1) 
       ON DUPLICATE KEY UPDATE attempt_count = attempt_count + 1`,
      [ip, action]
    );
  } catch (err) {
    console.error("Failed to record rate limit attempt:", err);
  }
}

/**
 * Resets/deletes the attempt record for a given IP and action (e.g. after a successful sign-in)
 */
export async function resetRateLimitAttempts(ip: string, action: string) {
  try {
    await pool.query(
      "DELETE FROM rate_limit_attempts WHERE ip = ? AND action = ?",
      [ip, action]
    );
  } catch (err) {
    console.error("Failed to reset rate limit attempts:", err);
  }
}
