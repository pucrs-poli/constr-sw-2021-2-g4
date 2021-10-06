"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const enviroment_1 = require("./config/enviroment");
server_1.default.listen(enviroment_1.ENVIROMENT_VARIABLES.APPLICATION.PORT, undefined);
