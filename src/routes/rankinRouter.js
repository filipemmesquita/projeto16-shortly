import { Router } from "express";
import { rankUsers } from "../controllers/rankingController.js";

const rankRouter = Router();

rankRouter.get("/ranking", rankUsers);


export default rankRouter;