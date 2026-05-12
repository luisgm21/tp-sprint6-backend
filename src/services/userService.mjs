
export const getUsersService = async () => {
  // Lógica para obtener los usuarios desde la base de datos
  return await userRepository.getAll();
}