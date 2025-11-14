/**
 * @summary
 * A simple logger utility.
 * In a real application, this would be replaced with a more robust logging library
 * like Winston or Pino, with different transports for production (e.g., files, cloud logging).
 */

const getTimestamp = (): string => new Date().toISOString();

export const logger = {
  info: (message: string, ...args: unknown[]): void => {
    console.log(`[INFO] ${getTimestamp()}: ${message}`, ...args);
  },
  warn: (message: string, ...args: unknown[]): void => {
    console.warn(`[WARN] ${getTimestamp()}: ${message}`, ...args);
  },
  error: (message: string, ...args: unknown[]): void => {
    console.error(`[ERROR] ${getTimestamp()}: ${message}`, ...args);
  },
};
