import { Router } from 'express';
import * as healthController from '@/api/v1/public/health/controller';

const router = Router();

/**
 * @api {get} /api/v1/public/health Health Check
 * @apiName HealthCheck
 * @apiGroup Public
 * @apiVersion 1.0.0
 * @apiDescription Provides the operational status of the API.
 * @apiSuccess {String} status The status of the server.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "API is up and running"
 *     }
 */
router.get('/health', healthController.getHealth);

export default router;
