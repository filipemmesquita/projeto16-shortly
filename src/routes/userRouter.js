import { Router } from "express";
import { signUpUser } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/signup", signUpUser);

export default userRouter;