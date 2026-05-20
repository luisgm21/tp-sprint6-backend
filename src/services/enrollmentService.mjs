import enrollmentRepository from '../repositories/EnrollmentRepository.mjs';
import studentRepository from '../repositories/StudentRepository.mjs';
import courseRepository from '../repositories/CourseRepository.mjs';

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

const normalizeText = (value) => String(value || '').trim();

const validateStudentPayload = (student) => {
  const firstName = normalizeText(student?.firstName);
  const lastName = normalizeText(student?.lastName);
  const documentNumber = normalizeText(student?.documentNumber);

  if (!firstName || !lastName || !documentNumber) {
    throw new Error('Los campos firstName, lastName y documentNumber son obligatorios');
  }

  return { firstName, lastName, documentNumber };
};

export const addStudentToCourseService = async (courseId, { schoolId, year, student }) => {
  if (!schoolId) throw new Error('schoolId es obligatorio');

  const course = await courseRepository.findById(courseId);
  if (!course || !course.active) throw new Error('Curso no encontrado');

  const normalizedStudent = validateStudentPayload(student);
  const targetYear = Number(year) || course.year || new Date().getFullYear();

  let existingStudent = await studentRepository.findByDocument(schoolId, normalizedStudent.documentNumber);
  let createdStudent = false;

  if (!existingStudent) {
    existingStudent = await studentRepository.create({
      schoolId,
      ...normalizedStudent,
    });
    createdStudent = true;
  }

  const existingEnrollment = await enrollmentRepository.findByCourseAndStudent(courseId, existingStudent._id);
  if (existingEnrollment) {
    return {
      student: existingStudent,
      enrollment: existingEnrollment,
      createdStudent,
      createdEnrollment: false,
      alreadyEnrolled: true,
    };
  }

  const enrollment = await enrollmentRepository.create({
    studentId: existingStudent._id,
    courseId,
    schoolId,
    year: targetYear,
    status: 'active',
  });

  return {
    student: existingStudent,
    enrollment,
    createdStudent,
    createdEnrollment: true,
    alreadyEnrolled: false,
  };
};

export const bulkAddStudentsToCourseService = async (courseId, { schoolId, year, students = [] }) => {
  if (!Array.isArray(students) || students.length === 0) {
    throw new Error('students debe ser un arreglo con al menos un alumno');
  }

  const results = [];
  let createdStudents = 0;
  let createdEnrollments = 0;
  let alreadyEnrolled = 0;

  for (const rawStudent of students) {
    try {
      const result = await addStudentToCourseService(courseId, {
        schoolId,
        year,
        student: rawStudent,
      });

      if (result.createdStudent) createdStudents += 1;
      if (result.createdEnrollment) createdEnrollments += 1;
      if (result.alreadyEnrolled) alreadyEnrolled += 1;

      results.push({
        status: 'ok',
        firstName: result.student.firstName,
        lastName: result.student.lastName,
        documentNumber: result.student.documentNumber,
        createdStudent: result.createdStudent,
        createdEnrollment: result.createdEnrollment,
        alreadyEnrolled: result.alreadyEnrolled,
      });
    } catch (error) {
      results.push({
        status: 'error',
        firstName: normalizeText(rawStudent?.firstName),
        lastName: normalizeText(rawStudent?.lastName),
        documentNumber: normalizeText(rawStudent?.documentNumber),
        error: error.message,
      });
    }
  }

  return {
    total: students.length,
    createdStudents,
    createdEnrollments,
    alreadyEnrolled,
    errors: results.filter((item) => item.status === 'error').length,
    results,
  };
};