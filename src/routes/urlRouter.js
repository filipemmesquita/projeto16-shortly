import { Router } from "express";
import { shortenURL,openUrl } from "../controllers/urlController.js";
import authenticateToken from "../middlewares/authenticate.js"
import validateUrl from "../middlewares/validateUrl.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten",authenticateToken,validateUrl, shortenURL);
urlRouter.get("/urls/open/:shortUrl",openUrl);


export default urlRouter;