/**
 * Rate Limiter for API endpoints
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create account at https://upstash.com/ (free tier)
 * 2. Create Redis database
 * 3. Add to .env.local:
 *    UPSTASH_REDIS_REST_URL=your_url
 *    UPSTASH_REDIS_REST_TOKEN=your_token
 * 4. Install: npm install @upstash/ratelimit @upstash/redis
 * 
 * Until then, this uses in-memory fallback (resets on server restart)
 */

import { NextRequest } from 'next/server';

// In-memory store (fallback when Upstash not configured)
// ⚠️ This resets on server restart - use Upstash for production!
const memoryStore = new Map<string, { count: number; resetTime: number }>();

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Rate limiter configuration
 */
const RATE_LIMIT_CONFIG = {
  maxRequests: 5, // 5 requests
  windowMs: 15 * 60 * 1000, // per 15 minutes
};

/**
 * Check if Upstash is configured
 */
const isUpstashConfigured = () => {
  return !!(
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  );
};

/**
 * Memory-based rate limiter (fallback)
 */
const checkRateLimitMemory = (identifier: string): RateLimitResult => {
  const now = Date.now();
  const record = memoryStore.get(identifier);

  // If no record or expired, create new
  if (!record || now > record.resetTime) {
    const resetTime = now + RATE_LIMIT_CONFIG.windowMs;
    memoryStore.set(identifier, { count: 1, resetTime });

    return {
      success: true,
      limit: RATE_LIMIT_CONFIG.maxRequests,
      remaining: RATE_LIMIT_CONFIG.maxRequests - 1,
      reset: resetTime,
    };
  }

  // Check if limit exceeded
  if (record.count >= RATE_LIMIT_CONFIG.maxRequests) {
    return {
      success: false,
      limit: RATE_LIMIT_CONFIG.maxRequests,
      remaining: 0,
      reset: record.resetTime,
    };
  }

  // Increment counter
  record.count++;
  memoryStore.set(identifier, record);

  return {
    success: true,
    limit: RATE_LIMIT_CONFIG.maxRequests,
    remaining: RATE_LIMIT_CONFIG.maxRequests - record.count,
    reset: record.resetTime,
  };
};

/**
 * Upstash-based rate limiter (production)
 * Uncomment after installing dependencies and configuring Upstash
 */
/*
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const upstashLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "15 m"),
  analytics: true,
  prefix: "ratelimit:upload",
});

const checkRateLimitUpstash = async (identifier: string): Promise<RateLimitResult> => {
  const { success, limit, reset, remaining } = await upstashLimiter.limit(identifier);
  return { success, limit, remaining, reset };
};
*/

/**
 * Main rate limiter function
 * Automatically uses Upstash if configured, otherwise falls back to memory
 */
export const checkRateLimit = async (
  request: NextRequest
): Promise<RateLimitResult> => {
  // Get identifier (IP address or fallback)
  const identifier =
    request.ip ??
    request.headers.get('x-forwarded-for') ??
    request.headers.get('x-real-ip') ??
    'unknown';

  // Use Upstash if configured, otherwise memory
  if (isUpstashConfigured()) {
    // TODO: Uncomment when Upstash is set up
    // return await checkRateLimitUpstash(identifier);
    console.warn('⚠️ Upstash configured but code commented out. Using memory fallback.');
  }

  return checkRateLimitMemory(identifier);
};

/**
 * Cleanup function for memory store (run periodically)
 */
export const cleanupMemoryStore = () => {
  const now = Date.now();
  for (const [key, value] of Array.from(memoryStore.entries())) {
    if (now > value.resetTime) {
      memoryStore.delete(key);
    }
  }
};

// Auto-cleanup every 30 minutes
if (typeof global !== 'undefined') {
  setInterval(cleanupMemoryStore, 30 * 60 * 1000);
}

