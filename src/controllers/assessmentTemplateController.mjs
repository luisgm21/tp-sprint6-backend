import {
  getTemplatesBySchoolService,
  getAvailableTemplatesService,
  getAssessmentTemplateByIdService,
  createAssessmentTemplateService,
  updateAssessmentTemplateService,
  deactivateAssessmentTemplateService,
  isAssessmentTemplateActiveService
} from '../services/assessmentTemplateService.mjs';

export const getTemplatesBySchoolController = async (req, res) => {
  try {
    const { schoolId } = req.params;
    const { type } = req.query;
    const templates = await getTemplatesBySchoolService(schoolId, type || null);
    res.json(templates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAvailableTemplatesController = async (req, res) => {
  try {
    const { schoolId } = req.params;
    const { type } = req.query;
    const templates = await getAvailableTemplatesService(schoolId, type || null);
    res.json(templates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAssessmentTemplateByIdController = async (req, res) => {
  try {
    const template = await getAssessmentTemplateByIdService(req.params.id);
    if (!template) {
      return res.status(404).json({ error: 'Plantilla no encontrada' });
    }
    res.json(template);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createAssessmentTemplateController = async (req, res) => {
  try {
    const template = await createAssessmentTemplateService(req.body);
    res.status(201).json(template);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAssessmentTemplateController = async (req, res) => {
  try {
    const template = await updateAssessmentTemplateService(req.params.id, req.body);
    if (!template) {
      return res.status(404).json({ error: 'Plantilla no encontrada' });
    }
    res.json(template);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deactivateAssessmentTemplateController = async (req, res) => {
  try {
    const template = await deactivateAssessmentTemplateService(req.params.id);
    if (!template) {
      return res.status(404).json({ error: 'Plantilla no encontrada' });
    }
    res.json({ message: 'Plantilla desactivada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const isAssessmentTemplateActiveController = async (req, res) => {
  try {
    const exists = await isAssessmentTemplateActiveService(req.params.id);
    res.json({ active: !!exists });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};