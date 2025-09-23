import { Router } from 'express';
import * as ctrl from './controller.js';
import { authenticate, authorize } from '../../core/http/auth.js';

const router = Router();

// Card DTOs for frontend projects grid/modal
router.get('/cards', authenticate, ctrl.listCards);
router.get('/pending', authenticate, authorize('admin','superadmin'), ctrl.listPending);
router.post('/:id/review', authenticate, authorize('admin','superadmin'), ctrl.review);
router.post('/:id/assign-mentor', authenticate, authorize('admin','superadmin'), ctrl.assignMentor);

router.get('/', authenticate, ctrl.list);
router.get('/:id', authenticate, ctrl.get);
router.post('/', authenticate, authorize('admin','entrepreneur'), ctrl.create);
router.put('/:id', authenticate, authorize('admin','entrepreneur'), ctrl.update);
router.delete('/:id', authenticate, authorize('admin'), ctrl.remove);

export default router;

