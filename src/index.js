import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from './routes/userRouter.js'
import urlRouter from "./routes/urlRouter.js";
import rankRouter from "./routes/rankinRouter.js";

dotenv.config();

const server = express();

server.use(cors());
server.use(express.json());

server.use(userRouter);
server.use(urlRouter);
server.use(rankRouter);

const PORT = process.env.PORT;
server.listen(PORT, () => console.log('Server Online on port '+process.env.PORT));