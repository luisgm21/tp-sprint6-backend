
export const getUsersService = async () => {
  // Lógica para obtener los usuarios desde la base de datos
  return await userRepository.getAll();
}

export const createUserService = async (userData) => {
  // Lógica para crear un nuevo usuario en la base de datos
  return await userRepository.create(userData);
}