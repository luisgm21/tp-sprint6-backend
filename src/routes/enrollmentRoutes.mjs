import { Router } from 'express';
import {
  getEnrollmentsByCourseController,
  getEnrollmentsByStudentController,
  getEnrollmentByIdController,
  getEnrollmentByCourseAndStudentController,
  createEnrollmentController,
  bulkCreateEnrollmentsController,
  updateEnrollmentController,
  updateEnrollmentStatusController,
  dropStudentController,
  getStudentsNotInCourseController,
  countEnrollmentsByCourseController,
  addStudentToCourseController,
  bulkAddStudentsToCourseController
} from '../controllers/enrollmentController.mjs';

const enrollmentRouter = Router();

enrollmentRouter.get('/course/:courseId', getEnrollmentsByCourseController);
enrollmentRouter.get('/course/:courseId/count', countEnrollmentsByCourseController);
enrollmentRouter.get('/student/:studentId', getEnrollmentsByStudentController);
enrollmentRouter.get('/course/:courseId/student/:studentId', getEnrollmentByCourseAndStudentController);
enrollmentRouter.get('/school/:schoolId/course/:courseId/students-not-enrolled', getStudentsNotInCourseController);
enrollmentRouter.get('/:id', getEnrollmentByIdController);
enrollmentRouter.post('/course/:courseId/add-student', addStudentToCourseController);
enrollmentRouter.post('/course/:courseId/add-students-bulk', bulkAddStudentsToCourseController);
enrollmentRouter.post('/create', createEnrollmentController);
enrollmentRouter.post('/bulk-create', bulkCreateEnrollmentsController);
enrollmentRouter.put('/update/:id', updateEnrollmentController);
enrollmentRouter.patch('/update/:id/status', updateEnrollmentStatusController);
enrollmentRouter.patch('/course/:courseId/student/:studentId/drop', dropStudentController);

export default enrollmentRouter;