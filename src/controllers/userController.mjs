import { getUsersService, getUserService , createUserService , updateUserService , deleteUserService  } from "../services/userService.mjs";


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
