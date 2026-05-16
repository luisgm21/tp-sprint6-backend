import {
  getEvaluationsByCourseService,
  getEvaluationsByCourseAndStudentService,
  getEvaluationsByEnrollmentService,
  getEvaluationByIdService,
  getNumericEvaluationsByEnrollmentService,
  getRecoveriesService,
  createEvaluationService,
  updateEvaluationService,
  deleteEvaluationService,
  getDistinctEvaluationsByCourseService,
  getEvaluationExportDataService
} from '../services/evaluationService.mjs';

export const getEvaluationsByCourseController = async (req, res) => {
  try {
    const { courseId } = req.params;
    const isRecovery = req.query.isRecovery;
    const options = {};
    if (isRecovery !== undefined) {
      options.isRecovery = isRecovery === 'true';
    }
    const evaluations = await getEvaluationsByCourseService(courseId, options);
    res.json(evaluations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEvaluationsByCourseAndStudentController = async (req, res) => {
  try {
    const { courseId, studentId } = req.params;
    const evaluations = await getEvaluationsByCourseAndStudentService(courseId, studentId);
    res.json(evaluations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEvaluationsByEnrollmentController = async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const includeRecovery = req.query.includeRecovery !== 'false';
    const evaluations = await getEvaluationsByEnrollmentService(enrollmentId, { includeRecovery });
    res.json(evaluations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEvaluationByIdController = async (req, res) => {
  try {
    const evaluation = await getEvaluationByIdService(req.params.id);
    if (!evaluation) {
      return res.status(404).json({ error: 'Evaluacion no encontrada' });
    }
    res.json(evaluation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getNumericEvaluationsByEnrollmentController = async (req, res) => {
  try {
    const evaluations = await getNumericEvaluationsByEnrollmentService(req.params.enrollmentId);
    res.json(evaluations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRecoveriesController = async (req, res) => {
  try {
    const evaluations = await getRecoveriesService(req.params.originalEvaluationId);
    res.json(evaluations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createEvaluationController = async (req, res) => {
  try {
    const evaluation = await createEvaluationService(req.body);
    res.status(201).json(evaluation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEvaluationController = async (req, res) => {
  try {
    const evaluation = await updateEvaluationService(req.params.id, req.body);
    if (!evaluation) {
      return res.status(404).json({ error: 'Evaluacion no encontrada' });
    }
    res.json(evaluation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteEvaluationController = async (req, res) => {
  try {
    const evaluation = await deleteEvaluationService(req.params.id);
    if (!evaluation) {
      return res.status(404).json({ error: 'Evaluacion no encontrada' });
    }
    res.json({ message: 'Evaluacion eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDistinctEvaluationsByCourseController = async (req, res) => {
  try {
    const data = await getDistinctEvaluationsByCourseService(req.params.courseId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEvaluationExportDataController = async (req, res) => {
  try {
    const data = await getEvaluationExportDataService(req.params.courseId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};