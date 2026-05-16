import { Router } from "express";
import {changePasswordValidationRules ,userUpdateValidationRules, userValidationRules } from "../validators/userValidators.mjs";
import { validate } from "../middleware/validatorMiddleware.mjs";
import { changePasswordController , getUsersController , getUserController , createUserController, updateUserController, deleteUserController } from "../controllers/userController.mjs";

const userRouter = Router();

userRouter.get("/",getUsersController);
userRouter.get("/:id", getUserController);
userRouter.post("/create",userValidationRules(), validate, createUserController);
userRouter.put("/update/:id", userUpdateValidationRules(), validate , updateUserController);
userRouter.patch("/update/:id/password", changePasswordValidationRules(), validate, changePasswordController);
userRouter.delete("/delete/:id", deleteUserController);

export default userRouter;