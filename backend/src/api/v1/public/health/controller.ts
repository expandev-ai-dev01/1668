import { Request, Response } from 'express';
import { successResponse } from '@/utils/responseHandler';

/**
 * @summary
 * Handles the health check request.
 *
 * @param _req The Express request object.
 * @param res The Express response object.
 */
export const getHealth = (_req: Request, res: Response): void => {
  res.status(200).json(successResponse({ status: 'API is up and running' }));
};
