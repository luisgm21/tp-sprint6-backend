import IUserRepository from "./IRepository.mjs";
import User from "../models/userModel.mjs";


class UserRepository extends IUserRepository {
  async getAll() {
    const users = await User.find({isDeleted: false});
    if (users.length === 0) {
      return [];
    }
    return users;
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

export default UserRepository;

