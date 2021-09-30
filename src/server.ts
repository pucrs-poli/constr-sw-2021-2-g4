import express from "express";
import { json } from "body-parser";
import cors from "cors";
import swaggerConfig from "./middlewares/swagger";

import { RegisterRoutes } from "./routes/routes";

const init = () => {
    const server = express();

    require('dotenv').config()

    server.use(json());
    server.use(cors());
    server.use(swaggerConfig);

    RegisterRoutes(server); // New router version

    server.get("/", (_, res: express.Response) => {
        res.send({
            status: "Api is running",
            docs: `Go to /doc to see the routes documentation.`,
        });
    });

    const PORT = process.env.APPLICATION_PORT || "8080"

    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
};

export default {
    init,
};