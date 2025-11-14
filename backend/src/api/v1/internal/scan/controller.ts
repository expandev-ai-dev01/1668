import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { analyzeSchema, cleanSchema } from '@/services/scan/scanValidation';
import { analyzeDirectory, cleanFiles } from '@/services/scan/scanService';
import { createHistoryEntry } from '@/services/history/historyService';
import { successResponse, errorResponse } from '@/utils/responseHandler';
import { logger } from '@/utils/logger';

export async function analyzeHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const options = analyzeSchema.parse(req.body);
    const result = await analyzeDirectory(options);
    res.status(200).json(successResponse(result));
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json(errorResponse('Validation failed', 'VALIDATION_ERROR'));
    }
    logger.error('Analysis failed:', error);
    next(error);
  }
}

export async function cleanHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const options = cleanSchema.parse(req.body);
    const result = await cleanFiles(options.files, options.mode);

    // Create history entry after cleaning
    await createHistoryEntry({
      directoryAnalyzed: options.directoryPath,
      totalFilesAnalyzed: options.scanResult.totalFilesScanned,
      totalFilesRemoved: result.totalFilesRemoved,
      totalSpaceFreed: result.spaceFreed,
      criteriaUsed: options.criteriaUsed,
    });

    res.status(200).json(successResponse(result));
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json(errorResponse('Validation failed', 'VALIDATION_ERROR'));
    }
    logger.error('Cleaning failed:', error);
    next(error);
  }
}
