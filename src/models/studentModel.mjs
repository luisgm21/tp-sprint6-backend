import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  documentNumber: { type: String, required: true },
  active: { type: Boolean, default: true }
});

const Student = mongoose.model("Student", studentSchema);

export default Student;