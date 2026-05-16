import {
  getGradeHistoryByEvaluationService,
  getGradeHistoryByCourseAndStudentService,
  getGradeHistoryByTeacherService,
  getGradeHistoryByCourseService,
  logEvaluationCreationService,
  logEvaluationUpdateService,
  logEvaluationDeletionService
} from '../services/gradeHistoryService.mjs';

export const getGradeHistoryByEvaluationController = async (req, res) => {
  try {
    const data = await getGradeHistoryByEvaluationService(req.params.evaluationId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getGradeHistoryByCourseAndStudentController = async (req, res) => {
  try {
    const { courseId, studentId } = req.params;
    const data = await getGradeHistoryByCourseAndStudentService(courseId, studentId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getGradeHistoryByTeacherController = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { startDate, endDate, courseId } = req.query;
    const options = { courseId };
    if (startDate) options.startDate = new Date(startDate);
    if (endDate) options.endDate = new Date(endDate);
    const data = await getGradeHistoryByTeacherService(teacherId, options);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getGradeHistoryByCourseController = async (req, res) => {
  try {
    const { courseId } = req.params;
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 100;
    const data = await getGradeHistoryByCourseService(courseId, { page, limit });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logEvaluationCreationController = async (req, res) => {
  try {
    const data = await logEvaluationCreationService(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logEvaluationUpdateController = async (req, res) => {
  try {
    const { oldEvaluation, newEvaluation, changedBy } = req.body;
    const data = await logEvaluationUpdateService(oldEvaluation, newEvaluation, changedBy);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logEvaluationDeletionController = async (req, res) => {
  try {
    const { evaluation, changedBy } = req.body;
    const data = await logEvaluationDeletionService(evaluation, changedBy);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};