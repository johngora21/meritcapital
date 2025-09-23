import express from 'express';
import { authenticate } from '../../core/http/auth.js';
import {
  getOpportunities,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity
} from './controller.js';

const router = express.Router();

// Public routes
router.get('/', getOpportunities);

// Protected routes (admin only)
router.post('/', authenticate, createOpportunity);
router.put('/:id', authenticate, updateOpportunity);
router.delete('/:id', authenticate, deleteOpportunity);

export default router;