import { Router } from 'express';
import * as ctrl from './controller.js';
import { authenticate, authorize } from '../../core/http/auth.js';

const router = Router();

router.get('/', authenticate, ctrl.myNotifications);
router.post('/', authenticate, authorize('admin'), ctrl.create);
router.post('/:id/read', authenticate, ctrl.read);

export default router;

