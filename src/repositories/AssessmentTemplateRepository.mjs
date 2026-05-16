import AssessmentTemplate, { find, findById as _findById, findByIdAndUpdate, exists } from '../models/AssessmentTemplate';
import IAssessmentTemplateRepository from './IAssessmentTemplateRepository.mjs';

class AssessmentTemplateRepository extends IAssessmentTemplateRepository {

  /**
   * Plantillas disponibles por escuela y tipo
   */
  async findBySchool(schoolId, type = null) {
    const query = { schoolId, active: true };
    if (type) query.type = type;
    
    return find(query)
      .populate('createdBy', 'fullName')
      .sort({ name: 1 });
  }

  /**
   * Plantillas globales (sin escuela) + las de una escuela específica
   */
  async findAvailable(schoolId, type = null) {
    const query = { 
      $or: [
        { schoolId: null, active: true },
        { schoolId, active: true }
      ]
    };
    if (type) query.type = type;
    
    return find(query)
      .populate('createdBy', 'fullName')
      .sort({ name: 1 });
  }

  async findById(id) {
    return _findById(id)
      .populate('createdBy', 'fullName');
  }

  async create(templateData) {
    const template = new AssessmentTemplate(templateData);
    return template.save();
  }

  async update(id, templateData) {
    return findByIdAndUpdate(id, templateData, { 
      new: true, 
      runValidators: true 
    });
  }

  async deactivate(id) {
    return findByIdAndUpdate(id, { active: false }, { new: true });
  }

  /**
   * Para validar que la plantilla existe y está activa
   */
  async isActive(id) {
    return exists({ _id: id, active: true });
  }
}

export default new AssessmentTemplateRepository();