import { Router } from 'express';
import * as ctrl from './controller.js';
import { authenticate } from '../../core/http/auth.js';

const router = Router();

router.get('/', ctrl.list);
router.post('/signup', ctrl.signup);
router.post('/login', ctrl.login);
router.put('/profile', authenticate, ctrl.updateProfile);

export default router;




