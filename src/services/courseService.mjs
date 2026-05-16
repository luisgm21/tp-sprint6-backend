import courseRepository from '../repositories/CourseRepository.mjs';

export const getCoursesByTeacherService = async (teacherId, year) => {
  return courseRepository.findByTeacher(teacherId, year);
};

export const getCoursesBySchoolService = async (schoolId, year) => {
  return courseRepository.findBySchool(schoolId, year);
};

export const getCourseByIdService = async (id) => {
  return courseRepository.findById(id);
};

export const createCourseService = async (courseData) => {
  return courseRepository.create(courseData);
};

export const updateCourseService = async (id, courseData) => {
  return courseRepository.update(id, courseData);
};

export const deactivateCourseService = async (id) => {
  return courseRepository.deactivate(id);
};

export const isTeacherOwnerService = async (courseId, teacherId) => {
  return courseRepository.isTeacherOwner(courseId, teacherId);
};

export const getCoursesWithStudentCountService = async (schoolId, year) => {
  return courseRepository.getCoursesWithStudentCount(schoolId, year);
};