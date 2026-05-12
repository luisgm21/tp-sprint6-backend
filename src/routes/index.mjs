import { Router } from "express";
import userRouter from "./userRoutes.mjs";

const router = Router();
router.use("/users", userRouter);

export default router;