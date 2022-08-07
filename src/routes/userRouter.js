import { Router } from "express";
import { signUpUser } from "../controllers/userController.js";
import validateUser from "../middlewares/usersValidation.js";

const userRouter = Router();

userRouter.post("/signup",validateUser, signUpUser);

export default userRouter;