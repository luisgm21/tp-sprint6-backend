import IUserRepository from "./IUserRepository.mjs";
import User from "../models/userModel.mjs";


class UserRepository extends IUserRepository {
  async getAll() {
    const users = await User.find({ isDeleted: false }).select('-password');
    if (users.length === 0) {
      return [];
    }
    return users;
  }
  async getById(id) {
    const user = await User.findOne({ _id: id, isDeleted: false }).select('-password');
    return user;
  }
  async create(userData) {
    const newUser = new User(userData);
    await newUser.save();
    return User.findById(newUser._id).select('-password');
  }
  async update(id, userData) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: id, isDeleted: false },
      userData,
      { new: true, runValidators: true }
    ).select('-password');
    return updatedUser;
  }
  async delete(id) {
    const deletedUser = await User.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    ).select('-password');
    return deletedUser;
  }

  async findByEmail(email) {
    return User.findOne({ email, isDeleted: false }).select('-password');
  }

  async findTeachersBySchool(schoolId) {
    return User.find({ 
      schoolIds: schoolId, 
      role: 'teacher', 
      isDeleted: false 
    }).select('-password');
  }

  async deactivate(id) {
    return User.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    ).select('-password');
  }

  async updatePassword(id, password) {
    return User.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { password },
      { new: true, runValidators: true }
    ).select('-password');
  }
}

const userRepository = new UserRepository();
export default userRepository;

