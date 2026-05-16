class IStudentRepository {
  findBySchool(schoolId, options = {}) {
    throw new Error("Method not implemented");
  }

  findById(id) {
    throw new Error("Method not implemented");
  }

  findByDocument(schoolId, documentNumber) {
    throw new Error("Method not implemented");
  }

  search(schoolId, searchTerm) {
    throw new Error("Method not implemented");
  }

  create(studentData) {
    throw new Error("Method not implemented");
  }

  update(id, studentData) {
    throw new Error("Method not implemented");
  }

  deactivate(id) {
    throw new Error("Method not implemented");
  }

  bulkCreate(studentsArray) {
    throw new Error("Method not implemented");
  }
}

export default IStudentRepository;