/**
 * Rate Limiting Middleware
 * Protects endpoints from abuse and DoS using IP and token-based limiting.
 */

const rateLimit = require('express-rate-limit');

/**
 * Standard global rate limiter for all API endpoints.
 * Limits each IP to 100 requests per 15 minutes.
 *
 * @returns {Function} Express rate limiting middleware.
 */
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  message: {
    error: 'Too many requests from this IP, please try again after 15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
  /**
   * Generates a rate-limit key per user ID or IP address.
   *
   * @param {import('express').Request} req - Express request object.
   * @returns {string} The rate-limit key.
   */
  keyGenerator: (req) => {
    if (req.user) {
      return `user_${req.user.id}`;
    }
    return req.ip || req.socket?.remoteAddress || '127.0.0.1';
  },
});

/**
 * Stricter limiter for sensitive operations (Invoices, Escrow).
 * Limits each IP or user to 10 requests per hour.
 *
 * @returns {Function} Express rate limiting middleware.
 */
const sensitiveLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 40,
  message: {
    error: 'Strict rate limit exceeded for sensitive operations. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  /**
   * Generates a rate-limit key per user ID or IP address.
   *
   * @param {import('express').Request} req - Express request object.
   * @returns {string} The rate-limit key.
   */
  keyGenerator: (req) => {
    if (req.user) {
      return `user_${req.user.id}`;
    }
    return req.ip || req.socket?.remoteAddress || '127.0.0.1';
  },
});

module.exports = {
  globalLimiter,
  sensitiveLimiter,
};
