import Course, { find, findById as _findById, findByIdAndUpdate, findOne, aggregate } from '../models/Course';
import ICourseRepository from './ICourseRepository.mjs';

class CourseRepository extends ICourseRepository {

  /**
   * Cursos activos de un docente en un año específico
   */
  async findByTeacher(teacherId, year = new Date().getFullYear()) {
    return find({ 
      teacherId, 
      year, 
      active: true 
    })
    .populate('schoolId', 'name')
    .sort({ name: 1 });
  }

  /**
   * Todos los cursos de una escuela en un año
   */
  async findBySchool(schoolId, year = new Date().getFullYear()) {
    return find({ 
      schoolId, 
      year, 
      active: true 
    })
    .populate('teacherId', 'fullName email')
    .sort({ grade: 1, section: 1 });
  }

  async findById(id) {
    return _findById(id)
      .populate('schoolId', 'name')
      .populate('teacherId', 'fullName email');
  }

  async create(courseData) {
    const course = new Course(courseData);
    return course.save();
  }

  async update(id, courseData) {
    return findByIdAndUpdate(id, courseData, { new: true, runValidators: true });
  }

  async deactivate(id) {
    return findByIdAndUpdate(id, { active: false }, { new: true });
  }

  /**
   * Verificar si un docente es dueño del curso
   */
  async isTeacherOwner(courseId, teacherId) {
    const course = await findOne({ _id: courseId, teacherId, active: true });
    return !!course;
  }

  /**
   * Cursos activos con cantidad de alumnos inscriptos (requiere agregación)
   */
  async getCoursesWithStudentCount(schoolId, year) {
    return aggregate([
      {
        $match: { schoolId, year, active: true }
      },
      {
        $lookup: {
          from: 'enrollments',
          localField: '_id',
          foreignField: 'courseId',
          pipeline: [
            { $match: { status: 'active' } }
          ],
          as: 'enrollments'
        }
      },
      {
        $addFields: {
          studentCount: { $size: '$enrollments' }
        }
      },
      {
        $project: {
          enrollments: 0
        }
      },
      {
        $sort: { name: 1 }
      }
    ]);
  }
}

export default new CourseRepository();