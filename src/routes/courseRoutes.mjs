import { Router } from 'express';
import {
  getCoursesByTeacherController,
  getCoursesBySchoolController,
  getCourseByIdController,
  createCourseController,
  updateCourseController,
  deactivateCourseController,
  isTeacherOwnerController,
  getCoursesWithStudentCountController
} from '../controllers/courseController.mjs';

const courseRouter = Router();

courseRouter.get('/teacher/:teacherId', getCoursesByTeacherController);
courseRouter.get('/school/:schoolId', getCoursesBySchoolController);
courseRouter.get('/school/:schoolId/with-student-count', getCoursesWithStudentCountController);
courseRouter.get('/:courseId/teacher/:teacherId/is-owner', isTeacherOwnerController);
courseRouter.get('/:id', getCourseByIdController);
courseRouter.post('/create', createCourseController);
courseRouter.put('/update/:id', updateCourseController);
courseRouter.patch('/deactivate/:id', deactivateCourseController);

export default courseRouter;