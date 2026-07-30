interface RateLimitEntry {
  timestamps: number[];
}

const tracker = new Map<string, RateLimitEntry>();

// Clean up expired IP logs every 5 minutes to prevent memory leaks
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of tracker.entries()) {
      const validTimestamps = entry.timestamps.filter(
        (timestamp) => now - timestamp < 60 * 1000
      );
      if (validTimestamps.length === 0) {
        tracker.delete(ip);
      } else {
        tracker.set(ip, { timestamps: validTimestamps });
      }
    }
  }, 5 * 60 * 1000);
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetInSeconds: number;
}

/**
 * In-memory sliding window rate limiter for API routes.
 * @param ip Unique identifier (IP address) of the client.
 * @param limit Maximum allowed requests within windowMs (default: 10).
 * @param windowMs Time window in milliseconds (default: 60,000ms = 1 min).
 */
export function checkRateLimit(
  ip: string,
  limit: number = 10,
  windowMs: number = 60 * 1000
): RateLimitResult {
  const now = Date.now();
  const entry = tracker.get(ip) || { timestamps: [] };

  // Filter timestamps within current window
  const validTimestamps = entry.timestamps.filter(
    (timestamp) => now - timestamp < windowMs
  );

  const currentCount = validTimestamps.length;

  if (currentCount >= limit) {
    const oldestTimestamp = validTimestamps[0];
    const resetMs = windowMs - (now - oldestTimestamp);
    return {
      success: false,
      limit,
      remaining: 0,
      resetInSeconds: Math.ceil(resetMs / 1000),
    };
  }

  validTimestamps.push(now);
  tracker.set(ip, { timestamps: validTimestamps });

  return {
    success: true,
    limit,
    remaining: limit - validTimestamps.length,
    resetInSeconds: Math.ceil(windowMs / 1000),
  };
}

/**
 * Helper to extract client IP from request headers.
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "127.0.0.1";
}
