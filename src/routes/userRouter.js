import { Router } from "express";
import { signUpUser,signInUser,getUser } from "../controllers/userController.js";
import validateSignUp from "../middlewares/usersValidation.js";
import validateSignIn from "../middlewares/usersSignInValidation.js";
import authenticateToken from "../middlewares/authenticate.js";

const userRouter = Router();

userRouter.post("/signup",validateSignUp, signUpUser);
userRouter.post("/signin",validateSignIn, signInUser);
userRouter.get("/users/me",authenticateToken, getUser);


export default userRouter;