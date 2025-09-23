import { Router } from 'express';
import { authenticate } from '../../core/http/auth.js';
import * as ctrl from './controller.js';

const router = Router();

router.get('/', authenticate, ctrl.myChats);
router.get('/cards', authenticate, ctrl.listCards);
router.post('/', authenticate, ctrl.create);
router.get('/:id/messages', authenticate, ctrl.messages);
router.post('/:id/messages', authenticate, ctrl.send);

export default router;

