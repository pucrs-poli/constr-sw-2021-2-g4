"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.keycloak = void 0;
const keycloak_admin_client_1 = __importDefault(require("@keycloak/keycloak-admin-client"));
require('dotenv').config();
exports.keycloak = new keycloak_admin_client_1.default({
    baseUrl: `http://${process.env.KEYCLOAK_HOST}:${process.env.KEYCLOAK_PORT}/auth`,
    realmName: `${process.env.KEYCLOACK_STANDARD_REALM}`
});
