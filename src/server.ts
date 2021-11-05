import express from "express";
import { json } from "body-parser";
import cors from "cors";
import swaggerConfig from "./middlewares/swagger";
import { RegisterRoutes } from "./routes/routes";
import { connectToServer } from './config/';

const server = express();

server.use(json());
server.use(cors());
server.use(swaggerConfig);
connectToServer();
RegisterRoutes(server);

server.get("*", (_, res: express.Response) => {
    res.send({
        status: "Api is running",
        message: `Go to /doc to see the routes documentation.`,
    });
});

export default server;