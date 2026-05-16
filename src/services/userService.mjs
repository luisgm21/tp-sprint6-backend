import userRepository from '../repositories/userRepository.mjs';

export const getUsersService = async () => {
  // Lógica para obtener los usuarios desde la base de datos
  return await userRepository.getAll();
}
export const getUserService = async (id) => {
  // Lógica para obtener un usuario específico desde la base de datos
  return await userRepository.getById(id);
}

export const createUserService = async (userData) => {
  // Lógica para crear un nuevo usuario en la base de datos
  return await userRepository.create(userData);
}

export const updateUserService = async (id, userData) => {
  // Lógica para actualizar un usuario existente en la base de datos
  return await userRepository.update(id, userData);
}

export const deleteUserService = async (id) => {
  // Lógica para eliminar un usuario de la base de datos
  return await userRepository.delete(id);
}

export const getUserByEmailService = async (email) => {
  return userRepository.findByEmail(email);
}

export const getTeachersBySchoolService = async (schoolId) => {
  return userRepository.findTeachersBySchool(schoolId);
}

export const deactivateUserService = async (id) => {
  return userRepository.deactivate(id);
}

export const updatePasswordService = async (id, password) => {
  return userRepository.updatePassword(id, password);
}