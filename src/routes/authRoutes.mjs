import { Router } from 'express';
import { registerController, loginController } from '../controllers/authController.mjs';

const authRouter = Router();

authRouter.post('/register', registerController);
authRouter.post('/login', loginController);

export default authRouter;
