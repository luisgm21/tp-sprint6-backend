import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "student", "teacher", "admin"], default: "user", required: true },
  schoolIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'School' }],
  isDeleted: { type: Boolean, default: false } // Added field for soft delete
},
{ 
  timestamps: true 
});

const User = mongoose.model("User", userSchema);

export default User;


