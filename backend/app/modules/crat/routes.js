import { Router } from 'express';
import { authenticate, authorize } from '../../core/http/auth.js';
import * as ctrl from './controller.js';

const router = Router();

router.post('/seed', authenticate, authorize('admin'), ctrl.seed);
router.post('/', authenticate, authorize('admin','entrepreneur'), ctrl.create);
router.get('/project/:project_id', authenticate, ctrl.list);
router.get('/project/:project_id/latest', authenticate, ctrl.getLatestAssessment);
router.get('/projects/dropdown', authenticate, ctrl.projectsDropdown);
router.get('/questions', authenticate, ctrl.getQuestions);
router.get('/assessment/:assessment_id', authenticate, ctrl.getAssessment);
router.post('/answer', authenticate, ctrl.saveAnswer);
router.post('/calculate-scores/:assessment_id', authenticate, ctrl.calculateScores);

export default router;

