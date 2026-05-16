class IEnrollmentRepository {
  findByCourse(courseId, options = {}) {
    throw new Error("Method not implemented");
  }

  findByStudent(studentId, year = new Date().getFullYear()) {
    throw new Error("Method not implemented");
  }

  findById(id) {
    throw new Error("Method not implemented");
  }

  findByCourseAndStudent(courseId, studentId) {
    throw new Error("Method not implemented");
  }

  create(enrollmentData) {
    throw new Error("Method not implemented");
  }

  bulkCreate(enrollmentsArray) {
    throw new Error("Method not implemented");
  }

  update(id, updateData) {
    throw new Error("Method not implemented");
  }

  updateStatus(id, status) {
    throw new Error("Method not implemented");
  }

  dropStudent(courseId, studentId) {
    throw new Error("Method not implemented");
  }

  getStudentsNotInCourse(schoolId, courseId, year) {
    throw new Error("Method not implemented");
  }

  countByCourse(courseId) {
    throw new Error("Method not implemented");
  }
}

export default IEnrollmentRepository;