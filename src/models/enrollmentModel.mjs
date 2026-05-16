const enrollmentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  year: { type: Number, required: true },
  enrollmentDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'dropped', 'completed'], default: 'active' },
  finalGrade: { type: Number, default: null }
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

export default Enrollment;