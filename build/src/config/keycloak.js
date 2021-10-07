"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.keycloak = void 0;
const keycloak_admin_client_1 = __importDefault(require("@keycloak/keycloak-admin-client"));
const enviroment_1 = require("./enviroment");
exports.keycloak = new keycloak_admin_client_1.default({
    baseUrl: `http://${enviroment_1.ENVIROMENT_VARIABLES.KEYCLOAK.HOST}:${enviroment_1.ENVIROMENT_VARIABLES.KEYCLOAK.PORT}/auth`,
    realmName: `${enviroment_1.ENVIROMENT_VARIABLES.KEYCLOAK.STANDARD_REALM}`
});
