import { Router } from 'express';
import {
  getGradeHistoryByEvaluationController,
  getGradeHistoryByCourseAndStudentController,
  getGradeHistoryByTeacherController,
  getGradeHistoryByCourseController,
  logEvaluationCreationController,
  logEvaluationUpdateController,
  logEvaluationDeletionController
} from '../controllers/gradeHistoryController.mjs';

const gradeHistoryRouter = Router();

gradeHistoryRouter.get('/evaluation/:evaluationId', getGradeHistoryByEvaluationController);
gradeHistoryRouter.get('/course/:courseId', getGradeHistoryByCourseController);
gradeHistoryRouter.get('/course/:courseId/student/:studentId', getGradeHistoryByCourseAndStudentController);
gradeHistoryRouter.get('/teacher/:teacherId', getGradeHistoryByTeacherController);
gradeHistoryRouter.post('/log/create', logEvaluationCreationController);
gradeHistoryRouter.post('/log/update', logEvaluationUpdateController);
gradeHistoryRouter.post('/log/delete', logEvaluationDeletionController);

export default gradeHistoryRouter;