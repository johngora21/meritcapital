import { Router } from 'express';
import usersRoutes from '../app/modules/users/routes.js';
import projectsRoutes from '../app/modules/projects/routes.js';
import chatsRoutes from '../app/modules/chats/routes.js';
import cratRoutes from '../app/modules/crat/routes.js';
import opportunitiesRoutes from '../app/modules/opportunities/routes.js';
import resourcesRoutes from '../app/modules/resources/routes.js';
import mentorsRoutes from '../app/modules/mentors/routes.js';
import investorsRoutes from '../app/modules/investors/routes.js';
import startupsRoutes from '../app/modules/startups/routes.js';
import successRoutes from '../app/modules/success/routes.js';
import notificationsRoutes from '../app/modules/notifications/routes.js';
import investmentsRoutes from '../app/modules/investments/routes.js';
import adminRoutes from '../app/modules/admin/routes.js';

const router = Router();

router.use('/users', usersRoutes);
router.use('/projects', projectsRoutes);
router.use('/chats', chatsRoutes);
router.use('/crat', cratRoutes);
router.use('/opportunities', opportunitiesRoutes);
router.use('/resources', resourcesRoutes);
router.use('/mentors', mentorsRoutes);
router.use('/investors', investorsRoutes);
router.use('/startups', startupsRoutes);
router.use('/success-stories', successRoutes);
router.use('/notifications', notificationsRoutes);
router.use('/investments', investmentsRoutes);
router.use('/admin', adminRoutes);

export default router;

