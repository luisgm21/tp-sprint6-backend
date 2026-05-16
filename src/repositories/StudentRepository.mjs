import Student from '../models/studentModel.mjs';
import IStudentRepository from './IStudentRepository.mjs';

class StudentRepository extends IStudentRepository {

  async findBySchool(schoolId, { active = true, page = 1, limit = 50 } = {}) {
    const query = { schoolId, active };
    const skip = (page - 1) * limit;
    
    const [students, total] = await Promise.all([
      Student.find(query).skip(skip).limit(limit).sort({ lastName: 1, firstName: 1 }),
      Student.countDocuments(query)
    ]);
    
    return { students, total, page, totalPages: Math.ceil(total / limit) };
  }

  async findById(id) {
    return Student.findOne({ _id: id, active: true });
  }

  async findByDocument(schoolId, documentNumber) {
    return Student.findOne({ schoolId, documentNumber, active: true });
  }

  async search(schoolId, searchTerm) {
    const regex = new RegExp(searchTerm, 'i');
    return Student.find({
      schoolId,
      active: true,
      $or: [
        { firstName: regex },
        { lastName: regex },
        { documentNumber: regex }
      ]
    }).sort({ lastName: 1, firstName: 1 });
  }

  async create(studentData) {
    const student = new Student(studentData);
    return student.save();
  }

  async update(id, studentData) {
    return Student.findByIdAndUpdate(id, studentData, { new: true, runValidators: true });
  }

  async deactivate(id) {
    return Student.findByIdAndUpdate(id, { active: false }, { new: true });
  }

  async bulkCreate(studentsArray) {
    return Student.insertMany(studentsArray);
  }
}

export default new StudentRepository();