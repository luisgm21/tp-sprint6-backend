import { Router } from 'express';
import {
  getSchoolsController,
  getSchoolByIdController,
  createSchoolController,
  updateSchoolController,
  deactivateSchoolController,
  schoolExistsController
} from '../controllers/schoolController.mjs';

const schoolRouter = Router();

schoolRouter.get('/', getSchoolsController);
schoolRouter.get('/:id/exists', schoolExistsController);
schoolRouter.get('/:id', getSchoolByIdController);
schoolRouter.post('/create', createSchoolController);
schoolRouter.put('/update/:id', updateSchoolController);
schoolRouter.patch('/deactivate/:id', deactivateSchoolController);

export default schoolRouter;