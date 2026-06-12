import { Router } from 'express';
import validationRoutes from './validation.routes.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

router.use(validationRoutes);

export default router;
