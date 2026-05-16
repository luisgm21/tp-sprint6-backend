import Student, { find, countDocuments, findOne, findByIdAndUpdate, insertMany } from '../models/Student';

class StudentRepository {

  async findBySchool(schoolId, { active = true, page = 1, limit = 50 } = {}) {
    const query = { schoolId, active };
    const skip = (page - 1) * limit;
    
    const [students, total] = await Promise.all([
      find(query).skip(skip).limit(limit).sort({ lastName: 1, firstName: 1 }),
      countDocuments(query)
    ]);
    
    return { students, total, page, totalPages: Math.ceil(total / limit) };
  }

  async findById(id) {
    return findOne({ _id: id, active: true });
  }

  async findByDocument(schoolId, documentNumber) {
    return findOne({ schoolId, documentNumber, active: true });
  }

  async search(schoolId, searchTerm) {
    const regex = new RegExp(searchTerm, 'i');
    return find({
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
    return findByIdAndUpdate(id, studentData, { new: true, runValidators: true });
  }

  async deactivate(id) {
    return findByIdAndUpdate(id, { active: false }, { new: true });
  }

  async bulkCreate(studentsArray) {
    return insertMany(studentsArray);
  }
}

export default new StudentRepository();