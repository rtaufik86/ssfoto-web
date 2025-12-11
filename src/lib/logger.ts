/**
 * Production-safe Logger
 * Logs only in development mode to avoid exposing sensitive data in production
 */

const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = {
  /**
   * Log general information (development only)
   */
  log: (...args: any[]) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },

  /**
   * Log errors (always logged, but sanitized in production)
   */
  error: (...args: any[]) => {
    if (isDevelopment) {
      console.error(...args);
    } else {
      // In production, log only error messages without sensitive data
      console.error('[Error occurred]', args[0]?.message || 'Unknown error');
    }
  },

  /**
   * Log warnings (development only)
   */
  warn: (...args: any[]) => {
    if (isDevelopment) {
      console.warn(...args);
    }
  },

  /**
   * Log info messages (development only)
   */
  info: (...args: any[]) => {
    if (isDevelopment) {
      console.info(...args);
    }
  },

  /**
   * Log debug messages (development only)
   */
  debug: (...args: any[]) => {
    if (isDevelopment) {
      console.debug(...args);
    }
  },
};

/**
 * Usage:
 * import { logger } from '@/lib/logger';
 * 
 * logger.log('Upload started', { fileName: 'photo.jpg' });
 * logger.error('Upload failed', error);
 * logger.warn('Large file size detected');
 */

