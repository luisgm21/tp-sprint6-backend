import assessmentTemplateRepository from '../repositories/AssessmentTemplateRepository.mjs';

export const getTemplatesBySchoolService = async (schoolId, type = null) => {
  return assessmentTemplateRepository.findBySchool(schoolId, type);
};

export const getAvailableTemplatesService = async (schoolId, type = null) => {
  return assessmentTemplateRepository.findAvailable(schoolId, type);
};

export const getAssessmentTemplateByIdService = async (id) => {
  return assessmentTemplateRepository.findById(id);
};

export const createAssessmentTemplateService = async (templateData) => {
  return assessmentTemplateRepository.create(templateData);
};

export const updateAssessmentTemplateService = async (id, templateData) => {
  return assessmentTemplateRepository.update(id, templateData);
};

export const deactivateAssessmentTemplateService = async (id) => {
  return assessmentTemplateRepository.deactivate(id);
};

export const isAssessmentTemplateActiveService = async (id) => {
  return assessmentTemplateRepository.isActive(id);
};