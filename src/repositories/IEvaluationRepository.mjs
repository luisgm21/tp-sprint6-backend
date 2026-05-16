class IEvaluationRepository {
  findByCourse(courseId, options = {}) {
    throw new Error("Method not implemented");
  }

  findByCourseAndStudent(courseId, studentId) {
    throw new Error("Method not implemented");
  }

  findByEnrollment(enrollmentId, options = {}) {
    throw new Error("Method not implemented");
  }

  findById(id) {
    throw new Error("Method not implemented");
  }

  getNumericByEnrollment(enrollmentId) {
    throw new Error("Method not implemented");
  }

  findRecoveries(originalEvaluationId) {
    throw new Error("Method not implemented");
  }

  create(evaluationData) {
    throw new Error("Method not implemented");
  }

  update(id, updateData) {
    throw new Error("Method not implemented");
  }

  delete(id) {
    throw new Error("Method not implemented");
  }

  getDistinctEvaluationsByCourse(courseId) {
    throw new Error("Method not implemented");
  }

  getExportData(courseId) {
    throw new Error("Method not implemented");
  }
}

export default IEvaluationRepository;