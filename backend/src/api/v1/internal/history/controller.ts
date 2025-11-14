import { Request, Response, NextFunction } from 'express';
import { listHistory } from '@/services/history/historyService';
import { successResponse } from '@/utils/responseHandler';
import { logger } from '@/utils/logger';

export async function listHistoryHandler(_req: Request, res: Response, next: NextFunction) {
  try {
    const history = await listHistory();
    res.status(200).json(successResponse(history));
  } catch (error) {
    logger.error('Failed to retrieve history:', error);
    next(error);
  }
}
