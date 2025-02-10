import { Router } from 'express';
import { learningController } from '../controllers/learningController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.use(authMiddleware);
router.get('/progress', learningController.getUserProgress);
router.post('/progress', learningController.updateProgress);

export { router };
