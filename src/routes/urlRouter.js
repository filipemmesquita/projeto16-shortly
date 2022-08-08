import { Router } from "express";
import { shortenURL,openUrl,getUrl, deleteUrl } from "../controllers/urlController.js";
import authenticateToken from "../middlewares/authenticate.js"
import validateUrl from "../middlewares/validateUrl.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten",authenticateToken,validateUrl, shortenURL);
urlRouter.get("/urls/open/:shortUrl",openUrl);
urlRouter.get("/urls/:id",getUrl);
urlRouter.delete("/urls/:id",authenticateToken,deleteUrl);


export default urlRouter;