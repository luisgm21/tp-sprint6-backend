import enrollmentRepository from '../repositories/EnrollmentRepository.mjs';

export const getEnrollmentsByCourseService = async (courseId, options = {}) => {
  return enrollmentRepository.findByCourse(courseId, options);
};

export const getEnrollmentsByStudentService = async (studentId, year) => {
  return enrollmentRepository.findByStudent(studentId, year);
};

export const getEnrollmentByIdService = async (id) => {
  return enrollmentRepository.findById(id);
};

export const getEnrollmentByCourseAndStudentService = async (courseId, studentId) => {
  return enrollmentRepository.findByCourseAndStudent(courseId, studentId);
};

export const createEnrollmentService = async (enrollmentData) => {
  return enrollmentRepository.create(enrollmentData);
};

export const bulkCreateEnrollmentsService = async (enrollmentsArray) => {
  return enrollmentRepository.bulkCreate(enrollmentsArray);
};

export const updateEnrollmentService = async (id, updateData) => {
  return enrollmentRepository.update(id, updateData);
};

export const updateEnrollmentStatusService = async (id, status) => {
  return enrollmentRepository.updateStatus(id, status);
};

export const dropStudentService = async (courseId, studentId) => {
  return enrollmentRepository.dropStudent(courseId, studentId);
};

export const getStudentsNotInCourseService = async (schoolId, courseId, year) => {
  return enrollmentRepository.getStudentsNotInCourse(schoolId, courseId, year);
};

export const countEnrollmentsByCourseService = async (courseId) => {
  return enrollmentRepository.countByCourse(courseId);
};