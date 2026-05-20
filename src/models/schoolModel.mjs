import mongoose from 'mongoose';

const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  active: { type: Boolean, default: true }
});

const School = mongoose.model("School", schoolSchema);

export default School;