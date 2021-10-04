"use strict";
// import "reflect-metadata";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import connectDatabase from "./database";
const server_1 = __importDefault(require("./server"));
server_1.default.init();
// connectDatabase()
//   .then(() => {
//     console.log("Connected successfully to database.");
//   })
//   .catch((err) => {
//     console.log(err);
//     console.log(`Error connecting to database!\n${err.message}`);
//   });
