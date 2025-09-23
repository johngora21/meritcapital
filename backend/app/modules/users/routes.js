import { Router } from 'express';
import * as ctrl from './controller.js';

const router = Router();

router.get('/', ctrl.list);
router.post('/signup', ctrl.signup);
router.post('/login', ctrl.login);

export default router;

