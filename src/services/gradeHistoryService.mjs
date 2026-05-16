import gradeHistoryRepository from '../repositories/GradeHistoryRepository.mjs';

export const getGradeHistoryByEvaluationService = async (evaluationId) => {
  return gradeHistoryRepository.findByEvaluation(evaluationId);
};

export const getGradeHistoryByCourseAndStudentService = async (courseId, studentId) => {
  return gradeHistoryRepository.findByCourseAndStudent(courseId, studentId);
};

export const getGradeHistoryByTeacherService = async (teacherId, options = {}) => {
  return gradeHistoryRepository.findByTeacher(teacherId, options);
};

export const getGradeHistoryByCourseService = async (courseId, options = {}) => {
  return gradeHistoryRepository.findByCourse(courseId, options);
};

export const logEvaluationCreationService = async (evaluation) => {
  return gradeHistoryRepository.logCreation(evaluation);
};

export const logEvaluationUpdateService = async (oldEvaluation, newEvaluation, changedBy) => {
  return gradeHistoryRepository.logUpdate(oldEvaluation, newEvaluation, changedBy);
};

export const logEvaluationDeletionService = async (evaluation, changedBy) => {
  return gradeHistoryRepository.logDeletion(evaluation, changedBy);
};