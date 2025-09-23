import express from 'express';
import { authenticate } from '../../core/http/auth.js';
import {
  getPrograms,
  getLessons,
  createProgram,
  createLesson,
  updateProgram,
  updateLesson,
  deleteProgram,
  deleteLesson
} from './controller.js';

const router = express.Router();

// Public routes
router.get('/programs', getPrograms);
router.get('/lessons', getLessons);

// Protected routes (admin only)
router.post('/programs', authenticate, createProgram);
router.post('/lessons', authenticate, createLesson);
router.put('/programs/:id', authenticate, updateProgram);
router.put('/lessons/:id', authenticate, updateLesson);
router.delete('/programs/:id', authenticate, deleteProgram);
router.delete('/lessons/:id', authenticate, deleteLesson);

export default router;