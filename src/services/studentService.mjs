import studentRepository from '../repositories/StudentRepository.mjs';

export const getStudentsBySchoolService = async (schoolId, options = {}) => {
  return studentRepository.findBySchool(schoolId, options);
};

export const getStudentByIdService = async (id) => {
  return studentRepository.findById(id);
};

export const getStudentByDocumentService = async (schoolId, documentNumber) => {
  return studentRepository.findByDocument(schoolId, documentNumber);
};

export const searchStudentsService = async (schoolId, searchTerm) => {
  return studentRepository.search(schoolId, searchTerm);
};

export const createStudentService = async (studentData) => {
  return studentRepository.create(studentData);
};

export const updateStudentService = async (id, studentData) => {
  return studentRepository.update(id, studentData);
};

export const deactivateStudentService = async (id) => {
  return studentRepository.deactivate(id);
};

export const bulkCreateStudentsService = async (studentsArray) => {
  return studentRepository.bulkCreate(studentsArray);
};