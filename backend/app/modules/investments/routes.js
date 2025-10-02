import { Router } from 'express';
import * as ctrl from './controller.js';
import { authenticate } from '../../core/http/auth.js';

const router = Router();

router.get('/', authenticate, ctrl.list);
router.post('/', authenticate, ctrl.create);
router.delete('/:id', authenticate, ctrl.remove);

export default router;





