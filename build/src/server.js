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
const server = (0, express_1.default)();
server.use((0, body_parser_1.json)());
server.use((0, cors_1.default)());
server.use(swagger_1.default);
(0, routes_1.RegisterRoutes)(server);
server.get("/", (_, res) => {
    res.send({
        status: "Api is running",
        message: `Go to /doc to see the routes documentation.`,
    });
});
exports.default = server;
