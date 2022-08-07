import { Router } from "express";
import { signUpUser,signInUser } from "../controllers/userController.js";
import validateSignUp from "../middlewares/usersValidation.js";
import validateSignIn from "../middlewares/usersSignInValidation.js";

const userRouter = Router();

userRouter.post("/signup",validateSignUp, signUpUser);
userRouter.post("/signin",validateSignIn, signInUser);


export default userRouter;