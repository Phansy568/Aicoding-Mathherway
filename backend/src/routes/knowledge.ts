import { Router } from 'express';
import { knowledgeController } from '../controllers/knowledgeController';

const router = Router();

router.get('/graph', knowledgeController.getGraph);
router.get('/topics/:id', knowledgeController.getTopic);

export { router }; 