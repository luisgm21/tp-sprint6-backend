import {
	getUsersService,
	getUserService,
	createUserService,
	updateUserService,
	deleteUserService,
	updatePasswordService,
	getTeachersBySchoolService,
	deactivateUserService
} from "../services/userService.mjs";


export const getUsersController = async (req, res) => {
	try {
		const users = await getUsersService();
		res.json(users);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const getUserController = async (req, res) => {
	try {
		const user = await getUserService(req.params.id);
		if (!user) {
			return res.status(404).json({ error: "Usuario no encontrado" });
		}
		res.json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const createUserController = async (req, res) => {
	try {
		const user = await createUserService(req.body);
		res.status(201).json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const updateUserController = async (req, res) => {
	try {
		const user = await updateUserService(req.params.id, req.body);
		if (!user) {
			return res.status(404).json({ error: "Usuario no encontrado" });
		}
		res.json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

export const changePasswordController = async (req, res) => {
	try {
		const { password } = req.body;
		
		const user = await updatePasswordService(req.params.id, password);
		if (!user) {
			return res.status(404).json({ error: "Usuario no encontrado" });
		}
		res.json({ message: "Contraseña actualizada correctamente" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

export const deleteUserController = async (req, res) => {
	try {
		const user = await deleteUserService(req.params.id);
		if (!user) {
			return res.status(404).json({ error: "Usuario no encontrado" });
		}
		res.json({ message: "Usuario eliminado correctamente" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const getTeachersBySchoolController = async (req, res) => {
	try {
		const teachers = await getTeachersBySchoolService(req.params.schoolId);
		res.json(teachers);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const deactivateUserController = async (req, res) => {
	try {
		const user = await deactivateUserService(req.params.id);
		if (!user) {
			return res.status(404).json({ error: "Usuario no encontrado" });
		}
		res.json({ message: "Usuario desactivado correctamente" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
