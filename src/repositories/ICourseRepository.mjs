class ICourseRepository {
  findByTeacher(teacherId, year = new Date().getFullYear()) {
    throw new Error("Method not implemented");
  }

  findBySchool(schoolId, year = new Date().getFullYear()) {
    throw new Error("Method not implemented");
  }

  findById(id) {
    throw new Error("Method not implemented");
  }

  create(courseData) {
    throw new Error("Method not implemented");
  }

  update(id, courseData) {
    throw new Error("Method not implemented");
  }

  deactivate(id) {
    throw new Error("Method not implemented");
  }

  isTeacherOwner(courseId, teacherId) {
    throw new Error("Method not implemented");
  }

  getCoursesWithStudentCount(schoolId, year) {
    throw new Error("Method not implemented");
  }
}

export default ICourseRepository;