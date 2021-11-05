"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToServer = exports.keycloak = void 0;
const keycloak_1 = require("./keycloak");
Object.defineProperty(exports, "keycloak", { enumerable: true, get: function () { return keycloak_1.keycloak; } });
const database_1 = __importDefault(require("./database"));
exports.connectToServer = database_1.default;
