import schoolRepository from '../repositories/SchoolRepository.mjs';

export const getSchoolsService = async () => {
  return schoolRepository.findAll();
};

export const getSchoolByIdService = async (id) => {
  return schoolRepository.findById(id);
};

export const createSchoolService = async (schoolData) => {
  return schoolRepository.create(schoolData);
};

export const updateSchoolService = async (id, schoolData) => {
  return schoolRepository.update(id, schoolData);
};

export const deactivateSchoolService = async (id) => {
  return schoolRepository.deactivate(id);
};

export const schoolExistsService = async (id) => {
  return schoolRepository.exists(id);
};