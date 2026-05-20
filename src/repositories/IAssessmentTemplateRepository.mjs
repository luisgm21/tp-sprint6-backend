class IAssessmentTemplateRepository {
  findGlobal(type = null) {
    throw new Error("Method not implemented");
  }

  findBySchool(schoolId, type = null) {
    throw new Error("Method not implemented");
  }

  findAvailable(schoolId, type = null) {
    throw new Error("Method not implemented");
  }

  findById(id) {
    throw new Error("Method not implemented");
  }

  create(templateData) {
    throw new Error("Method not implemented");
  }

  update(id, templateData) {
    throw new Error("Method not implemented");
  }

  deactivate(id) {
    throw new Error("Method not implemented");
  }

  isActive(id) {
    throw new Error("Method not implemented");
  }
}

export default IAssessmentTemplateRepository;