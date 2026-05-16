import mongoose from 'mongoose';

const evaluationSchema = new mongoose.Schema({
  enrollmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Enrollment', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  templateId: { type: mongoose.Schema.Types.ObjectId, ref: 'AssessmentTemplate', required: true },
  name: { type: String, required: true },                // "Parcial 1", "Exposición oral" (puede copiarse del template)
  date: { type: Date, required: true },
  isRecovery: { type: Boolean, default: false },
  originalEvaluationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Evaluation', default: null },
  // Resultado específico según el tipo de plantilla
  score: { type: Number },                               // para 'numeric' (1-10)
  rubricResults: [{                                      // para 'rubric'
    criterionName: { type: String },
    selectedLevel: { type: String },
    score: { type: Number }
  }],
  checklistResults: [{                                   // para 'checklist'
    itemDescription: { type: String },
    checked: { type: Boolean }
  }],
  comments: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Evaluation = mongoose.model("Evaluation", evaluationSchema);

export default Evaluation;