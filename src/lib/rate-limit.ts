/**
 * Simple in-memory rate limiter for API routes.
 *
 * NOTE: This works per server instance. For multi-instance deployments
 * (e.g. Vercel serverless), consider using a shared store like Upstash Redis
 * or Vercel KV for production-grade rate limiting.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

const WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS = 5; // max requests per window

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Checks and updates the rate limit for a given identifier (e.g. IP address).
 */
export function checkRateLimit(
  identifier: string,
  maxRequests: number = MAX_REQUESTS,
  windowMs: number = WINDOW_MS
): RateLimitResult {
  const now = Date.now();
  const entry = store.get(identifier);

  if (!entry || entry.resetAt < now) {
    store.set(identifier, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: maxRequests - 1, resetAt: now + windowMs };
  }

  if (entry.count >= maxRequests) {
    return { success: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  store.set(identifier, entry);
  return { success: true, remaining: maxRequests - entry.count, resetAt: entry.resetAt };
}

/**
 * Extracts a client identifier (IP address) from request headers.
 */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return headers.get('x-real-ip') ?? 'unknown';
}
