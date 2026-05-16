class IGradeHistoryRepository {
  findByEvaluation(evaluationId) {
    throw new Error("Method not implemented");
  }

  findByCourseAndStudent(courseId, studentId) {
    throw new Error("Method not implemented");
  }

  findByTeacher(teacherId, options = {}) {
    throw new Error("Method not implemented");
  }

  findByCourse(courseId, options = {}) {
    throw new Error("Method not implemented");
  }

  logCreation(evaluation) {
    throw new Error("Method not implemented");
  }

  logUpdate(oldEvaluation, newEvaluation, changedBy) {
    throw new Error("Method not implemented");
  }

  logDeletion(evaluation, changedBy) {
    throw new Error("Method not implemented");
  }
}

export default IGradeHistoryRepository;