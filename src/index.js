import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from './routes/userRouter.js'

dotenv.config();

const server = express();

server.use(cors());
server.use(express.json());

server.use(userRouter);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log('Server Online'));