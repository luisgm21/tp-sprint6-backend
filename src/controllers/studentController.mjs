import {
  getStudentsBySchoolService,
  getStudentByIdService,
  getStudentByDocumentService,
  searchStudentsService,
  createStudentService,
  updateStudentService,
  deactivateStudentService,
  bulkCreateStudentsService
} from '../services/studentService.mjs';

export const getStudentsBySchoolController = async (req, res) => {
  try {
    const { schoolId } = req.params;
    const active = req.query.active !== 'false';
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 50;
    const data = await getStudentsBySchoolService(schoolId, { active, page, limit });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStudentByIdController = async (req, res) => {
  try {
    const student = await getStudentByIdService(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStudentByDocumentController = async (req, res) => {
  try {
    const { schoolId, documentNumber } = req.params;
    const student = await getStudentByDocumentService(schoolId, documentNumber);
    if (!student) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const searchStudentsController = async (req, res) => {
  try {
    const { schoolId } = req.params;
    const { q } = req.query;
    const students = await searchStudentsService(schoolId, q || '');
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createStudentController = async (req, res) => {
  try {
    const student = await createStudentService(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateStudentController = async (req, res) => {
  try {
    const student = await updateStudentService(req.params.id, req.body);
    if (!student) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deactivateStudentController = async (req, res) => {
  try {
    const student = await deactivateStudentService(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }
    res.json({ message: 'Alumno desactivado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const bulkCreateStudentsController = async (req, res) => {
  try {
    const students = await bulkCreateStudentsService(req.body);
    res.status(201).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};