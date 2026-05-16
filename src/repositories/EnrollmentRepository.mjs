import Enrollment from '../models/enrollmentModel.mjs';
import Student from '../models/studentModel.mjs';
import IEnrollmentRepository from './IEnrollmentRepository.mjs';

class EnrollmentRepository extends IEnrollmentRepository {

  /**
   * Alumnos inscriptos en un curso
   */
  async findByCourse(courseId, { status = 'active' } = {}) {
    return Enrollment.find({ courseId, status })
      .populate('studentId', 'firstName lastName documentNumber')
      .sort({ 'studentId.lastName': 1, 'studentId.firstName': 1 });
  }

  /**
   * Cursos en los que está inscripto un alumno
   */
  async findByStudent(studentId, year = new Date().getFullYear()) {
    return Enrollment.find({ studentId, year, status: 'active' })
      .populate({
        path: 'courseId',
        select: 'name grade section',
        populate: {
          path: 'teacherId',
          select: 'fullName'
        }
      });
  }

  async findById(id) {
    return Enrollment.findById(id)
      .populate('studentId', 'firstName lastName documentNumber')
      .populate('courseId', 'name grade section year');
  }

  /**
   * Inscripción específica de un alumno en un curso
   */
  async findByCourseAndStudent(courseId, studentId) {
    return Enrollment.findOne({ courseId, studentId, status: 'active' });
  }

  async create(enrollmentData) {
    const enrollment = new Enrollment(enrollmentData);
    return enrollment.save();
  }

  /**
   * Inscribir varios alumnos a un curso
   */
  async bulkCreate(enrollmentsArray) {
    return Enrollment.insertMany(enrollmentsArray);
  }

  async update(id, updateData) {
    return Enrollment.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  }

  async updateStatus(id, status) {
    return Enrollment.findByIdAndUpdate(id, { status }, { new: true });
  }

  /**
   * Dar de baja un alumno de un curso
   */
  async dropStudent(courseId, studentId) {
    return Enrollment.findOneAndUpdate(
      { courseId, studentId, status: 'active' },
      { status: 'dropped' },
      { new: true }
    );
  }

  /**
   * Alumnos sin curso activo en un año (útil para inscribir nuevos)
   */
  async getStudentsNotInCourse(schoolId, courseId, year) {
    // Primero obtenemos los IDs de alumnos ya inscriptos en este curso
    const enrolledStudents = await Enrollment.find({ 
      courseId, 
      status: 'active' 
    }).distinct('studentId');

    // Buscamos alumnos de la escuela que no están en esa lista
    return Student.find({
      schoolId,
      active: true,
      _id: { $nin: enrolledStudents }
    }).sort({ lastName: 1, firstName: 1 });
  }

  /**
   * Cantidad de alumnos activos en un curso
   */
  async countByCourse(courseId) {
    return Enrollment.countDocuments({ courseId, status: 'active' });
  }
}

export default new EnrollmentRepository();