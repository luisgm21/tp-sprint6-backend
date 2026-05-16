import { Router } from 'express';
import {
  getStudentsBySchoolController,
  getStudentByIdController,
  getStudentByDocumentController,
  searchStudentsController,
  createStudentController,
  updateStudentController,
  deactivateStudentController,
  bulkCreateStudentsController
} from '../controllers/studentController.mjs';

const studentRouter = Router();

studentRouter.get('/school/:schoolId', getStudentsBySchoolController);
studentRouter.get('/school/:schoolId/search', searchStudentsController);
studentRouter.get('/school/:schoolId/document/:documentNumber', getStudentByDocumentController);
studentRouter.get('/:id', getStudentByIdController);
studentRouter.post('/create', createStudentController);
studentRouter.post('/bulk-create', bulkCreateStudentsController);
studentRouter.put('/update/:id', updateStudentController);
studentRouter.patch('/deactivate/:id', deactivateStudentController);

export default studentRouter;