import { Request, Response } from 'express';
import { errorResponse } from '@/utils/responseHandler';

/**
 * @summary
 * Middleware to handle requests for routes that do not exist.
 *
 * @param req The Express request object.
 * @param res The Express response object.
 */
export const notFoundMiddleware = (req: Request, res: Response): void => {
  const message = `Route not found: ${req.method} ${req.originalUrl}`;
  res.status(404).json(errorResponse(message, 'NOT_FOUND'));
};
