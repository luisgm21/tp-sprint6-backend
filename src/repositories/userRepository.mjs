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
}

export default UserRepository;

