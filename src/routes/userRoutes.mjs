import { Router } from "express";
import { userUpdateValidationRules, userValidationRules } from "../validators/userValidators.mjs";
import { validate } from "../middleware/validatorMiddleware.mjs";
import { getUsersController, createUserController, updateUserController, deleteUserController } from "../controllers/userController.mjs";

const userRouter = Router();

userRouter.get("/",getUsersController);
userRouter.post("/create",userValidationRules(), validate, createUserController);
userRouter.put("/update/:id", userUpdateValidationRules(), validate , updateUserController);
userRouter.delete("/delete/:id", deleteUserController);

export default userRouter;