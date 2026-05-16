import {
  getEnrollmentsByCourseService,
  getEnrollmentsByStudentService,
  getEnrollmentByIdService,
  getEnrollmentByCourseAndStudentService,
  createEnrollmentService,
  bulkCreateEnrollmentsService,
  updateEnrollmentService,
  updateEnrollmentStatusService,
  dropStudentService,
  getStudentsNotInCourseService,
  countEnrollmentsByCourseService
} from '../services/enrollmentService.mjs';

export const getEnrollmentsByCourseController = async (req, res) => {
  try {
    const { courseId } = req.params;
    const status = req.query.status || 'active';
    const enrollments = await getEnrollmentsByCourseService(courseId, { status });
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEnrollmentsByStudentController = async (req, res) => {
  try {
    const { studentId } = req.params;
    const year = req.query.year ? Number(req.query.year) : undefined;
    const enrollments = await getEnrollmentsByStudentService(studentId, year);
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEnrollmentByIdController = async (req, res) => {
  try {
    const enrollment = await getEnrollmentByIdService(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ error: 'Inscripcion no encontrada' });
    }
    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEnrollmentByCourseAndStudentController = async (req, res) => {
  try {
    const { courseId, studentId } = req.params;
    const enrollment = await getEnrollmentByCourseAndStudentService(courseId, studentId);
    if (!enrollment) {
      return res.status(404).json({ error: 'Inscripcion no encontrada' });
    }
    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createEnrollmentController = async (req, res) => {
  try {
    const enrollment = await createEnrollmentService(req.body);
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const bulkCreateEnrollmentsController = async (req, res) => {
  try {
    const enrollments = await bulkCreateEnrollmentsService(req.body);
    res.status(201).json(enrollments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEnrollmentController = async (req, res) => {
  try {
    const enrollment = await updateEnrollmentService(req.params.id, req.body);
    if (!enrollment) {
      return res.status(404).json({ error: 'Inscripcion no encontrada' });
    }
    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEnrollmentStatusController = async (req, res) => {
  try {
    const { status } = req.body;
    const enrollment = await updateEnrollmentStatusService(req.params.id, status);
    if (!enrollment) {
      return res.status(404).json({ error: 'Inscripcion no encontrada' });
    }
    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const dropStudentController = async (req, res) => {
  try {
    const { courseId, studentId } = req.params;
    const enrollment = await dropStudentService(courseId, studentId);
    if (!enrollment) {
      return res.status(404).json({ error: 'Inscripcion no encontrada' });
    }
    res.json({ message: 'Alumno dado de baja correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStudentsNotInCourseController = async (req, res) => {
  try {
    const { schoolId, courseId } = req.params;
    const year = req.query.year ? Number(req.query.year) : undefined;
    const students = await getStudentsNotInCourseService(schoolId, courseId, year);
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const countEnrollmentsByCourseController = async (req, res) => {
  try {
    const total = await countEnrollmentsByCourseService(req.params.courseId);
    res.json({ total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};