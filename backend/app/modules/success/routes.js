import { Router } from 'express';
import * as ctrl from './controller.js';
import { authenticate, authorize } from '../../core/http/auth.js';

const router = Router();

router.get('/cards', authenticate, ctrl.listCards);

router.get('/', authenticate, ctrl.list);
router.get('/:id', authenticate, ctrl.get);
router.post('/', authenticate, authorize('admin'), ctrl.create);
router.put('/:id', authenticate, authorize('admin'), ctrl.update);
router.delete('/:id', authenticate, authorize('admin'), ctrl.remove);

export default router;

