import { Router } from 'express';
import { validateCard } from '../controllers/validation.controller.js';

const router = Router();

router.post('/validate', validateCard);

export default router;
