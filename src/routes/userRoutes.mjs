import { Router } from "express";
export { getUsersController } from "../controllers/userController.mjs";

const userRouter = Router();

userRouter.get("/", getUsersController);

export default userRouter;