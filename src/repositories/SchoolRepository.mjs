import School, { find, findById as _findById, findByIdAndUpdate, exists as _exists } from '../models/School';
import ISchoolRepository from './ISchoolRepository.mjs';

class SchoolRepository extends ISchoolRepository {
  
  async findAll() {
    return find({ active: true });
  }

  async findById(id) {
    return _findById(id);
  }

  async create(schoolData) {
    const school = new School(schoolData);
    return school.save();
  }

  async update(id, schoolData) {
    return findByIdAndUpdate(id, schoolData, { new: true, runValidators: true });
  }

  async deactivate(id) {
    return findByIdAndUpdate(id, { active: false }, { new: true });
  }

  async exists(id) {
    return _exists({ _id: id, active: true });
  }
}

export default new SchoolRepository();