import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

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

// Hash password before saving if modified
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("User", userSchema);

export default User;


