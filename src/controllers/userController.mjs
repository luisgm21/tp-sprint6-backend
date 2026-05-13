import { getUsersService , createUserController } from "../services/userService.mjs";


export const getUsersController = async (req, res) => {
	try {
		const users = await getUsersService();
		res.json(users);
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
