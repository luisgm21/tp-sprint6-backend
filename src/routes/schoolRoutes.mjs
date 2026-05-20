import { Router } from 'express';
import {
  getSchoolsController,
  getMySchoolsController,
  getSchoolByIdController,
  createSchoolController,
  updateSchoolController,
  deactivateSchoolController,
  schoolExistsController
} from '../controllers/schoolController.mjs';
import { authenticateToken } from '../middleware/authMiddleware.mjs';

const schoolRouter = Router();

schoolRouter.get('/', getSchoolsController);
schoolRouter.get('/mine', authenticateToken, getMySchoolsController);
schoolRouter.get('/:id/exists', schoolExistsController);
schoolRouter.get('/:id', getSchoolByIdController);
schoolRouter.post('/create', authenticateToken, createSchoolController);
schoolRouter.put('/update/:id', updateSchoolController);
schoolRouter.patch('/deactivate/:id', deactivateSchoolController);

export default schoolRouter;