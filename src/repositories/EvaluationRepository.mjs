import Evaluation, { find, findById as _findById, findByIdAndUpdate, findByIdAndDelete, aggregate } from '../models/Evaluation';
import IEvaluationRepository from './IEvaluationRepository.mjs';

class EvaluationRepository extends IEvaluationRepository {

  /**
   * Todas las evaluaciones de un curso (para planilla del docente)
   */
  async findByCourse(courseId, { isRecovery = null } = {}) {
    const query = { courseId };
    if (isRecovery !== null) query.isRecovery = isRecovery;
    
    return find(query)
      .populate('studentId', 'firstName lastName documentNumber')
      .populate('templateId', 'name type')
      .sort({ date: -1, 'studentId.lastName': 1 });
  }

  /**
   * Evaluaciones de un alumno en un curso específico
   */
  async findByCourseAndStudent(courseId, studentId) {
    return find({ courseId, studentId })
      .populate('templateId', 'name type')
      .sort({ date: -1 });
  }

  /**
   * Todas las evaluaciones de una inscripción
   */
  async findByEnrollment(enrollmentId, { includeRecovery = true } = {}) {
    const query = { enrollmentId };
    if (!includeRecovery) query.isRecovery = false;
    
    return find(query)
      .populate('templateId', 'name type')
      .sort({ date: -1 });
  }

  async findById(id) {
    return _findById(id)
      .populate('studentId', 'firstName lastName documentNumber')
      .populate('templateId')
      .populate('originalEvaluationId');
  }

  /**
   * Solo evaluaciones numéricas (para cálculo de promedios)
   */
  async getNumericByEnrollment(enrollmentId) {
    return find({
      enrollmentId,
      isRecovery: false,
      score: { $exists: true, $ne: null }
    }).select('score name date');
  }

  /**
   * Evaluaciones de recuperación de una evaluación original
   */
  async findRecoveries(originalEvaluationId) {
    return find({ 
      originalEvaluationId, 
      isRecovery: true 
    }).sort({ date: -1 });
  }

  async create(evaluationData) {
    const evaluation = new Evaluation(evaluationData);
    return evaluation.save();
  }

  async update(id, updateData) {
    return findByIdAndUpdate(id, updateData, { 
      new: true, 
      runValidators: true 
    });
  }

  async delete(id) {
    return findByIdAndDelete(id);
  }

  /**
   * Para obtener las columnas de la planilla (evaluaciones únicas por nombre y fecha)
   */
  async getDistinctEvaluationsByCourse(courseId) {
    return aggregate([
      { $match: { courseId, isRecovery: false } },
      { $group: { 
        _id: { name: '$name', date: '$date' },
        templateId: { $first: '$templateId' },
        count: { $sum: 1 }
      }},
      { $sort: { '_id.date': 1 } }
    ]);
  }

  /**
   * Datos completos para exportación (planilla)
   */
  async getExportData(courseId) {
    return find({ courseId, isRecovery: false })
      .populate('studentId', 'firstName lastName')
      .populate('templateId', 'name type')
      .sort({ 'studentId.lastName': 1, date: 1 });
  }
}

export default new EvaluationRepository();