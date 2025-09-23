import { Router } from 'express';
import { authenticate, authorize } from '../../core/http/auth.js';
import * as ctrl from './controller.js';

const router = Router();

router.post('/seed', authenticate, authorize('admin'), ctrl.seed);
router.post('/', authenticate, authorize('admin','entrepreneur'), ctrl.create);
router.get('/project/:project_id', authenticate, ctrl.list);
router.get('/projects/dropdown', authenticate, ctrl.projectsDropdown);

export default router;

