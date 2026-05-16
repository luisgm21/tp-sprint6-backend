import mongoose from 'mongoose';

const gradeHistorySchema = new mongoose.Schema({
  evaluationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Evaluation', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  changeType: { type: String, enum: ['create', 'update', 'delete'], required: true },
  oldData: { type: mongoose.Schema.Types.Mixed, default: null },
  newData: { type: mongoose.Schema.Types.Mixed, default: null },
  timestamp: { type: Date, default: Date.now }
});

const GradeHistory = mongoose.model('GradeHistory', gradeHistorySchema);

export default GradeHistory;