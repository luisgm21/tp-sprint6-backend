const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  active: { type: Boolean, default: true }
});

const School = mongoose.model("School", schoolSchema);

export default School;