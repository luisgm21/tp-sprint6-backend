import {
  getCoursesByTeacherService,
  getCoursesBySchoolService,
  getCourseByIdService,
  createCourseService,
  updateCourseService,
  deactivateCourseService,
  isTeacherOwnerService,
  getCoursesWithStudentCountService
} from '../services/courseService.mjs';

export const getCoursesByTeacherController = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const year = req.query.year ? Number(req.query.year) : undefined;
    const courses = await getCoursesByTeacherService(teacherId, year);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCoursesBySchoolController = async (req, res) => {
  try {
    const { schoolId } = req.params;
    const year = req.query.year ? Number(req.query.year) : undefined;
    const courses = await getCoursesBySchoolService(schoolId, year);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCourseByIdController = async (req, res) => {
  try {
    const course = await getCourseByIdService(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCourseController = async (req, res) => {
  try {
    const course = await createCourseService(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCourseController = async (req, res) => {
  try {
    const course = await updateCourseService(req.params.id, req.body);
    if (!course) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deactivateCourseController = async (req, res) => {
  try {
    const course = await deactivateCourseService(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }
    res.json({ message: 'Curso desactivado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const isTeacherOwnerController = async (req, res) => {
  try {
    const { courseId, teacherId } = req.params;
    const isOwner = await isTeacherOwnerService(courseId, teacherId);
    res.json({ isOwner });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCoursesWithStudentCountController = async (req, res) => {
  try {
    const { schoolId } = req.params;
    const year = req.query.year ? Number(req.query.year) : undefined;
    const courses = await getCoursesWithStudentCountService(schoolId, year);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};