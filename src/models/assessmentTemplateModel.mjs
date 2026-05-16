import mongoose from 'mongoose';

const assessmentTemplateSchema = new mongoose.Schema({
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School' },
  name: { type: String, required: true },               // "Rúbrica de exposiciones", "Lista de asistencia"
  type: { type: String, enum: ['numeric', 'rubric', 'checklist'], required: true },
  // Campos específicos según type
  maxScore: { type: Number },                            // solo para 'numeric' (ej. 10)
  criteria: [{                                           // solo para 'rubric'
    name: { type: String },                              // "Contenido"
    levels: [{
      label: { type: String },                           // "Excelente", "Bueno", etc.
      score: { type: Number }                            // puntaje asociado al nivel
    }]
  }],
  items: [{                                              // solo para 'checklist'
    description: { type: String }
  }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  active: { type: Boolean, default: true }
}, { timestamps: true });

const AssessmentTemplate = mongoose.model("AssessmentTemplate", assessmentTemplateSchema);

export default AssessmentTemplate;