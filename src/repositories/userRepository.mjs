import IUserRepository from "./IUserRepository.mjs";
import User from "../models/userModel.mjs";


class UserRepository extends IUserRepository {
  async getAll() {
    const users = await User.find({isDeleted: false});
    if (users.length === 0) {
      return [];
    }
    return users;
  }
  async getById(id) {
    const user = await User.findOne({ _id: id, isDeleted: false });
    return user;
  }
  async create(userData) {
    const newUser = new User(userData);
    return await newUser.save();
  }
  async update(id, userData) {
    const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });
    return updatedUser;
  }
  async delete(id) {
    const deletedUser = await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
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
    return User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  }

  async updatePassword(id, password) {
    return User.findByIdAndUpdate(id, { password }, { new: true });
  }
}

const userRepository = new UserRepository();
export default userRepository;

