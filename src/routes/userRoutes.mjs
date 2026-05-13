import { Router } from "express";
export { getUsersController, createUserController } from "../controllers/userController.mjs";

const userRouter = Router();

userRouter.get("/", getUsersController);
userRouter.post("/create", createUserController);

export default userRouter;