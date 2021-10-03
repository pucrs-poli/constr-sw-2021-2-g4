"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const swagger_1 = __importDefault(require("./middlewares/swagger"));
const routes_1 = require("./routes/routes");
const init = () => {
    const server = (0, express_1.default)();
    require('dotenv').config();
    server.use((0, body_parser_1.json)());
    server.use((0, cors_1.default)());
    server.use(swagger_1.default);
    (0, routes_1.RegisterRoutes)(server); // New router version
    server.get("/", (_, res) => {
        res.send({
            status: "Api is running",
            message: `Go to /doc to see the routes documentation.`,
        });
    });
    const PORT = process.env.APPLICATION_PORT || "8080";
    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
};
exports.default = {
    init,
};
