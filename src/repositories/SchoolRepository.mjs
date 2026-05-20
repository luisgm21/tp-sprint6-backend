import School from '../models/schoolModel.mjs';
import ISchoolRepository from './ISchoolRepository.mjs';

class SchoolRepository extends ISchoolRepository {
  
  async findAll() {
    return School.find({ active: true });
  }

  async findByCreator(createdBy) {
    return School.find({ createdBy, active: true }).sort({ name: 1 });
  }

  async findById(id) {
    return School.findById(id);
  }

  async create(schoolData) {
    const school = new School(schoolData);
    return school.save();
  }

  async update(id, schoolData) {
    return School.findByIdAndUpdate(id, schoolData, { new: true, runValidators: true });
  }

  async deactivate(id) {
    return School.findByIdAndUpdate(id, { active: false }, { new: true });
  }

  async exists(id) {
    return School.exists({ _id: id, active: true });
  }
}

export default new SchoolRepository();