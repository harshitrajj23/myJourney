import crypto from "crypto";

const SESSION_COOKIE_NAME = "journey_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

function getSecretKey(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    "c92f1b8a4e3d67104bfa902187315a6b87e248109d31f5c6e84920173829ad01"
  );
}

export function getExpectedPassword(): string {
  return (
    process.env.ADMIN_PASSWORD ||
    "HarshitJourney#2026!SecuredAdminVault99"
  );
}

export function createSessionToken(): string {
  const secret = getSecretKey();
  const timestamp = Date.now().toString();
  const payload = `admin:${timestamp}`;
  const hmac = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}.${hmac}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return false;
    const [payload, hmac] = parts;
    const [prefix, timestampStr] = payload.split(":");
    if (prefix !== "admin") return false;

    const timestamp = parseInt(timestampStr, 10);
    if (isNaN(timestamp)) return false;

    // Check expiration (7 days)
    const now = Date.now();
    if (now - timestamp > SESSION_MAX_AGE * 1000) {
      return false;
    }

    const secret = getSecretKey();
    const expectedHmac = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex");

    return crypto.timingSafeEqual(
      Buffer.from(hmac, "utf8"),
      Buffer.from(expectedHmac, "utf8")
    );
  } catch {
    return false;
  }
}

export { SESSION_COOKIE_NAME, SESSION_MAX_AGE };
