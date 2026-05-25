import mongoose from 'mongoose';

const evaluationSchema = new mongoose.Schema({
  enrollmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Enrollment', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  templateId: { type: mongoose.Schema.Types.ObjectId, ref: 'AssessmentTemplate' },
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

evaluationSchema.pre('validate', function validateTemplateForEvaluation() {
  const hasNumericScore = this.score !== undefined && this.score !== null;
  const hasRubric = Array.isArray(this.rubricResults) && this.rubricResults.length > 0;
  const hasChecklist = Array.isArray(this.checklistResults) && this.checklistResults.length > 0;

  // Numeric evaluations no longer depend on assessment templates.
  if (hasNumericScore) return;

  if ((hasRubric || hasChecklist) && !this.templateId) {
    this.invalidate('templateId', 'templateId es obligatorio para evaluaciones de rubrica o checklist');
  }
});

const Evaluation = mongoose.model("Evaluation", evaluationSchema);

export default Evaluation;