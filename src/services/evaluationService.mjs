import evaluationRepository from '../repositories/EvaluationRepository.mjs';

export const getEvaluationsByCourseService = async (courseId, options = {}) => {
  return evaluationRepository.findByCourse(courseId, options);
};

export const getEvaluationsByCourseAndStudentService = async (courseId, studentId) => {
  return evaluationRepository.findByCourseAndStudent(courseId, studentId);
};

export const getEvaluationsByEnrollmentService = async (enrollmentId, options = {}) => {
  return evaluationRepository.findByEnrollment(enrollmentId, options);
};

export const getEvaluationByIdService = async (id) => {
  return evaluationRepository.findById(id);
};

export const getNumericEvaluationsByEnrollmentService = async (enrollmentId) => {
  return evaluationRepository.getNumericByEnrollment(enrollmentId);
};

export const getRecoveriesService = async (originalEvaluationId) => {
  return evaluationRepository.findRecoveries(originalEvaluationId);
};

export const createEvaluationService = async (evaluationData) => {
  return evaluationRepository.create(evaluationData);
};

export const updateEvaluationService = async (id, updateData) => {
  return evaluationRepository.update(id, updateData);
};

export const deleteEvaluationService = async (id) => {
  return evaluationRepository.delete(id);
};

export const getDistinctEvaluationsByCourseService = async (courseId) => {
  return evaluationRepository.getDistinctEvaluationsByCourse(courseId);
};

export const getEvaluationExportDataService = async (courseId) => {
  return evaluationRepository.getExportData(courseId);
};