"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENVIROMENT_VARIABLES = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.ENVIROMENT_VARIABLES = {
    APPLICATION: {
        PORT: process.env.APPLICATION_PORT,
    },
    KEYCLOAK: {
        HOST: process.env.KEYCLOAK_HOST,
        STANDARD_REALM: process.env.KEYCLOACK_STANDARD_REALM,
        PORT: process.env.KEYCLOAK_PORT
    },
    DATABASE: {
        URL: process.env.MONGODB_URL,
        NAME: process.env.MONGODB_DATABASE,
        USERNAME: process.env.MONGODB_PASSWORD,
        PASSWORD: process.env.MONGODB_USER
    }
};
