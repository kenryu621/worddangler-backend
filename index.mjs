import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import {env} from "node:process";
dotenv.config();

const app = express();
const port = env.PORT;

app.use(cors({
    origin: `http://${env.DOMAIN}:${env.CLIENT_PORT}`,
    credentials: true
}));

app.use(express.json());

app.listen(port, () => {
    console.log(`server started on port ${port}`);
});