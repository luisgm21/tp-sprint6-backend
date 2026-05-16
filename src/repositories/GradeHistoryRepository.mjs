import { find, countDocuments, create } from '../models/GradeHistory';
import IGradeHistoryRepository from './IGradeHistoryRepository.mjs';

class GradeHistoryRepository extends IGradeHistoryRepository {

  /**
   * Historial de cambios de una evaluación específica
   */
  async findByEvaluation(evaluationId) {
    return find({ evaluationId })
      .populate('changedBy', 'fullName email')
      .sort({ timestamp: -1 });
  }

  /**
   * Historial de cambios de un alumno en un curso
   */
  async findByCourseAndStudent(courseId, studentId) {
    return find({ courseId, studentId })
      .populate('changedBy', 'fullName')
      .populate('evaluationId', 'name date')
      .sort({ timestamp: -1 });
  }

  /**
   * Todos los cambios realizados por un docente en un período
   */
  async findByTeacher(teacherId, { startDate, endDate, courseId } = {}) {
    const query = { changedBy: teacherId };
    
    if (startDate && endDate) {
      query.timestamp = { $gte: startDate, $lte: endDate };
    }
    if (courseId) {
      query.courseId = courseId;
    }
    
    return find(query)
      .populate('studentId', 'firstName lastName')
      .populate('evaluationId', 'name date')
      .sort({ timestamp: -1 })
      .limit(500);
  }

  /**
   * Historial completo de un curso
   */
  async findByCourse(courseId, { page = 1, limit = 100 } = {}) {
    const skip = (page - 1) * limit;
    
    const [history, total] = await Promise.all([
      find({ courseId })
        .populate('changedBy', 'fullName')
        .populate('studentId', 'firstName lastName')
        .populate('evaluationId', 'name date')
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(limit),
      countDocuments({ courseId })
    ]);
    
    return { history, total, page, totalPages: Math.ceil(total / limit) };
  }

  /**
   * Registrar creación de evaluación
   */
  async logCreation(evaluation) {
    return create({
      evaluationId: evaluation._id,
      courseId: evaluation.courseId,
      studentId: evaluation.studentId,
      changedBy: evaluation.createdBy,
      changeType: 'create',
      newData: {
        score: evaluation.score,
        rubricResults: evaluation.rubricResults,
        checklistResults: evaluation.checklistResults,
        comments: evaluation.comments
      },
      timestamp: new Date()
    });
  }

  /**
   * Registrar modificación de evaluación
   */
  async logUpdate(oldEvaluation, newEvaluation, changedBy) {
    return create({
      evaluationId: newEvaluation._id,
      courseId: newEvaluation.courseId,
      studentId: newEvaluation.studentId,
      changedBy: changedBy,
      changeType: 'update',
      oldData: {
        score: oldEvaluation.score,
        rubricResults: oldEvaluation.rubricResults,
        checklistResults: oldEvaluation.checklistResults,
        comments: oldEvaluation.comments
      },
      newData: {
        score: newEvaluation.score,
        rubricResults: newEvaluation.rubricResults,
        checklistResults: newEvaluation.checklistResults,
        comments: newEvaluation.comments
      },
      timestamp: new Date()
    });
  }

  /**
   * Registrar eliminación de evaluación
   */
  async logDeletion(evaluation, changedBy) {
    return create({
      evaluationId: evaluation._id,
      courseId: evaluation.courseId,
      studentId: evaluation.studentId,
      changedBy: changedBy,
      changeType: 'delete',
      oldData: {
        score: evaluation.score,
        rubricResults: evaluation.rubricResults,
        checklistResults: evaluation.checklistResults,
        comments: evaluation.comments
      },
      newData: null,
      timestamp: new Date()
    });
  }
}

export default new GradeHistoryRepository();