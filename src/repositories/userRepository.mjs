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
}

const userRepository = new UserRepository();
export default userRepository;

