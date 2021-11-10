"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const enviroment_1 = require("./enviroment");
const { HOST, NAME, PORT, USERNAME, PASSWORD } = enviroment_1.ENVIROMENT_VARIABLES.DATABASE;
const url = `mongodb://${HOST}:${PORT}/${NAME}`;
// const url = `mongodb://${HOST}:${PORT}`;
mongoose_1.default.connection.on('error', function (err) {
    console.log("fuck bro not working");
});
const connectToServer = () => {
    console.log(url);
    mongoose_1.default.connect(url, {
        user: USERNAME,
        pass: PASSWORD,
        authSource: "admin",
        autoIndex: true
    });
};
exports.default = connectToServer;
