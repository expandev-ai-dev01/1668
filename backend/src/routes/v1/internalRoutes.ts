import { Router } from 'express';
import * as scanController from '@/api/v1/internal/scan/controller';
import * as historyController from '@/api/v1/internal/history/controller';
import * as scheduleController from '@/api/v1/internal/schedule/controller';

const router = Router();

// Scan and Clean routes
router.post('/scan/analyze', scanController.analyzeHandler);
router.post('/scan/clean', scanController.cleanHandler);

// History routes
router.get('/history', historyController.listHistoryHandler);

// Schedule routes
router.post('/schedule', scheduleController.createScheduleHandler);
router.get('/schedule', scheduleController.listSchedulesHandler);
router.get('/schedule/:id', scheduleController.getScheduleHandler);
router.put('/schedule/:id', scheduleController.updateScheduleHandler);
router.delete('/schedule/:id', scheduleController.deleteScheduleHandler);

export default router;
