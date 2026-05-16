class IUserRepository {
  getAll() {
    throw new Error("Method not implemented");
  }

  getById(id) {
    throw new Error("Method not implemented");
  }

  create(userData) {
    throw new Error("Method not implemented");
  }
  update(id, userData) {
    throw new Error("Method not implemented");
  }
  delete(id) {
    throw new Error("Method not implemented");
  }

  findByEmail(email) {
    throw new Error("Method not implemented");
  }

  findTeachersBySchool(schoolId) {
    throw new Error("Method not implemented");
  }

  deactivate(id) {
    throw new Error("Method not implemented");
  }

  updatePassword(id, password) {
    throw new Error("Method not implemented");
  }
}

export default IUserRepository;