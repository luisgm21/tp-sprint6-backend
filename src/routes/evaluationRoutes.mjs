import { Router } from 'express';
import {
  getEvaluationsByCourseController,
  getEvaluationsByCourseAndStudentController,
  getEvaluationsByEnrollmentController,
  getEvaluationByIdController,
  getNumericEvaluationsByEnrollmentController,
  getRecoveriesController,
  createEvaluationController,
  updateEvaluationController,
  deleteEvaluationController,
  getDistinctEvaluationsByCourseController,
  getEvaluationExportDataController
} from '../controllers/evaluationController.mjs';

const evaluationRouter = Router();

evaluationRouter.get('/course/:courseId', getEvaluationsByCourseController);
evaluationRouter.get('/course/:courseId/student/:studentId', getEvaluationsByCourseAndStudentController);
evaluationRouter.get('/course/:courseId/distinct', getDistinctEvaluationsByCourseController);
evaluationRouter.get('/course/:courseId/export', getEvaluationExportDataController);
evaluationRouter.get('/enrollment/:enrollmentId', getEvaluationsByEnrollmentController);
evaluationRouter.get('/enrollment/:enrollmentId/numeric', getNumericEvaluationsByEnrollmentController);
evaluationRouter.get('/original/:originalEvaluationId/recoveries', getRecoveriesController);
evaluationRouter.get('/:id', getEvaluationByIdController);
evaluationRouter.post('/create', createEvaluationController);
evaluationRouter.put('/update/:id', updateEvaluationController);
evaluationRouter.delete('/delete/:id', deleteEvaluationController);

export default evaluationRouter;