import IUserRepository from "./IRepository.mjs";


class UserRepository extends IUserRepository {
  async getAll() {
    // Lógica para obtener los usuarios desde la base de datos
    return [];
  }
}

export default UserRepository;
