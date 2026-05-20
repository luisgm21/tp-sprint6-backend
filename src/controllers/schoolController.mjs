import {
  getSchoolsService,
  getSchoolsByCreatorService,
  getSchoolByIdService,
  createSchoolService,
  updateSchoolService,
  deactivateSchoolService,
  schoolExistsService
} from '../services/schoolService.mjs';

export const getSchoolsController = async (req, res) => {
  try {
    const schools = await getSchoolsService();
    res.json(schools);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMySchoolsController = async (req, res) => {
  try {
    const schools = await getSchoolsByCreatorService(req.user.id);
    res.json(schools);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSchoolByIdController = async (req, res) => {
  try {
    const school = await getSchoolByIdService(req.params.id);
    if (!school) {
      return res.status(404).json({ error: 'Escuela no encontrada' });
    }
    res.json(school);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createSchoolController = async (req, res) => {
  try {
    const school = await createSchoolService({
      ...req.body,
      createdBy: req.user.id,
    });
    res.status(201).json(school);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSchoolController = async (req, res) => {
  try {
    const school = await updateSchoolService(req.params.id, req.body);
    if (!school) {
      return res.status(404).json({ error: 'Escuela no encontrada' });
    }
    res.json(school);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deactivateSchoolController = async (req, res) => {
  try {
    const school = await deactivateSchoolService(req.params.id);
    if (!school) {
      return res.status(404).json({ error: 'Escuela no encontrada' });
    }
    res.json({ message: 'Escuela desactivada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const schoolExistsController = async (req, res) => {
  try {
    const exists = await schoolExistsService(req.params.id);
    res.json({ exists: !!exists });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};