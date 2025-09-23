import { Router } from 'express';
import * as ctrl from './controller.js';
import { authenticate } from '../../core/http/auth.js';

const router = Router();

router.post('/login', ctrl.login);
router.get('/me', authenticate, ctrl.me);
router.post('/logout', authenticate, ctrl.logout);
router.post('/forgot-password', ctrl.requestPasswordReset);
router.post('/reset-password', ctrl.resetPassword);

export default router;

