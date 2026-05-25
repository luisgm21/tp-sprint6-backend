import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  name: { type: String, required: true },               // "Matemáticas 1° A"
  year: { type: Number, required: true },                // 2026
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startMonth: { type: Number, min: 1, max: 12, default: 1 },
  endMonth: { type: Number, min: 1, max: 12, default: 12 },
  grade: { type: String },                               // "1°"
  section: { type: String },                             // "A"
  active: { type: Boolean, default: true }
});

const Course = mongoose.model("Course", courseSchema);

export default Course;