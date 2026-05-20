import { Router } from "express";
import userRouter from "./userRoutes.mjs";
import authRouter from './authRoutes.mjs';
import assessmentTemplateRouter from './assessmentTemplateRoutes.mjs';
import courseRouter from './courseRoutes.mjs';
import enrollmentRouter from './enrollmentRoutes.mjs';
import evaluationRouter from './evaluationRoutes.mjs';
import gradeHistoryRouter from './gradeHistoryRoutes.mjs';
import schoolRouter from './schoolRoutes.mjs';
import studentRouter from './studentRoutes.mjs';

const router = Router();
router.use('/auth', authRouter);
router.use("/users", userRouter);
router.use('/assessment-templates', assessmentTemplateRouter);
router.use('/courses', courseRouter);
router.use('/enrollments', enrollmentRouter);
router.use('/evaluations', evaluationRouter);
router.use('/grade-history', gradeHistoryRouter);
router.use('/schools', schoolRouter);
router.use('/students', studentRouter);

export default router;