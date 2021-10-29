import express from "express";
import { json } from "body-parser";
import cors from "cors";
import swaggerConfig from "./middlewares/swagger";
import { RegisterRoutes } from "./routes/routes";

const server = express();

server.use(json());
server.use(cors());
// server.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
server.use(swaggerConfig);

RegisterRoutes(server);

server.get("/", (_, res: express.Response) => {
    res.send({
        status: "Api is running",
        message: `Go to /doc to see the routes documentation.`,
    });
});

export default server;