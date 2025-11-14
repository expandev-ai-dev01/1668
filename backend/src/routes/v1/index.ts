import { Router } from 'express';
import publicRoutes from './publicRoutes';
import internalRoutes from './internalRoutes';

const router = Router();

// Public routes (e.g., health checks, public data)
router.use('/public', publicRoutes);

// Internal routes (for authenticated users, feature-specific)
// All feature routes will be added to internalRoutes.ts
router.use('/internal', internalRoutes);

export default router;
