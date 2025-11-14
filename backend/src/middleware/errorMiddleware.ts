import { Request, Response, NextFunction } from 'express';
import { logger } from '@/utils/logger';
import { errorResponse } from '@/utils/responseHandler';

/**
 * @summary
 * Centralized error handling middleware.
 * It catches errors from route handlers and other middleware.
 *
 * @param err The error object.
 * @param _req The Express request object.
 * @param res The Express response object.
 * @param _next The Express next function.
 */
export const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  logger.error('An unexpected error occurred:', err);

  const statusCode = 500;
  const message = 'Internal Server Error';

  res.status(statusCode).json(errorResponse(message, 'SERVER_ERROR'));
};
