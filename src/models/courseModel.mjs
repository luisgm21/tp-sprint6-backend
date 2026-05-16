import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  name: { type: String, required: true },               // "Matemáticas 1° A"
  year: { type: Number, required: true },                // 2026
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  grade: { type: String },                               // "1°"
  section: { type: String },                             // "A"
  active: { type: Boolean, default: true }
});

const Course = mongoose.model("Course", courseSchema);

export default Course;