import express from "express";
import { json } from "body-parser";
import cors from "cors";
import swaggerConfig from "./middlewares/swagger";


import { RegisterRoutes } from "./routes/routes";

const init = () => {
    const server = express();

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

    const PORT = 8000

    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
};

export default {
    init,
};
