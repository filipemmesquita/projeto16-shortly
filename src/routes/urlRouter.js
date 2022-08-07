import { Router } from "express";
import { shortenURL } from "../controllers/urlController.js";
import authenticateToken from "../middlewares/authenticate.js"
import validateUrl from "../middlewares/validateUrl.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten",authenticateToken,validateUrl, shortenURL);


export default urlRouter;