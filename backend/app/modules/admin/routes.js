import express from 'express';
import * as ctrl from './controller.js';
import { authenticate } from '../../core/http/auth.js';

const router = express.Router();

// All admin routes require authentication
router.use(authenticate);

// Check if user is admin
router.use((req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Admin access required'
    });
  }
  next();
});

// Admin dashboard routes
router.get('/stats', ctrl.getStats);
router.get('/users', ctrl.getUsers);
router.post('/users/:userId/:action', ctrl.userAction);
router.get('/export/users', ctrl.exportUsers);

export default router;
