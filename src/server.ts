// import express from "express";
// import { json } from "body-parser";
// import cors from "cors";
// import swaggerConfig from "./middlewares/swagger";

// import { RegisterRoutes } from "./routes/routes";

// const server = express();

// require('dotenv').config()

// server.use(json());
// server.use(cors());
// server.use(swaggerConfig);

// RegisterRoutes(server); // New router version

// server.get("/", (_, res: express.Response) => {
//     res.send({
//         status: "Api is running",
//         docs: `Go to /doc to see the routes documentation.`,
//     });
// });

// export default server;

const express = require("express");
const a = express();
a.get("/", () => { return 'null' });

export default a;