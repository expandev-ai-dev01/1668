import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import * as scheduleService from '@/services/schedule/scheduleService';
import { createScheduleSchema, updateScheduleSchema } from '@/services/schedule/scheduleValidation';
import { successResponse, errorResponse } from '@/utils/responseHandler';
import { logger } from '@/utils/logger';

export async function createScheduleHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const data = createScheduleSchema.parse(req.body);
    const schedule = await scheduleService.createSchedule(data);
    res.status(201).json(successResponse(schedule));
  } catch (error) {
    if (error instanceof ZodError) {
      return res
        .status(400)
        .json(errorResponse(error.errors.map((e) => e.message).join(', '), 'VALIDATION_ERROR'));
    }
    next(error);
  }
}

export async function listSchedulesHandler(_req: Request, res: Response, next: NextFunction) {
  try {
    const schedules = await scheduleService.listSchedules();
    res.status(200).json(successResponse(schedules));
  } catch (error) {
    next(error);
  }
}

export async function getScheduleHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id, 10);
    const schedule = await scheduleService.getScheduleById(id);
    if (!schedule) {
      return res.status(404).json(errorResponse('Schedule not found', 'NOT_FOUND'));
    }
    res.status(200).json(successResponse(schedule));
  } catch (error) {
    next(error);
  }
}

export async function updateScheduleHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id, 10);
    const data = updateScheduleSchema.parse(req.body);
    const schedule = await scheduleService.updateSchedule(id, data);
    if (!schedule) {
      return res.status(404).json(errorResponse('Schedule not found', 'NOT_FOUND'));
    }
    res.status(200).json(successResponse(schedule));
  } catch (error) {
    if (error instanceof ZodError) {
      return res
        .status(400)
        .json(errorResponse(error.errors.map((e) => e.message).join(', '), 'VALIDATION_ERROR'));
    }
    next(error);
  }
}

export async function deleteScheduleHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id, 10);
    await scheduleService.deleteSchedule(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
