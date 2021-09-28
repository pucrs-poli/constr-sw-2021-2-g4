"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressAuthentication = void 0;
const config_1 = require("../config/");
function expressAuthentication(request, securityName, scopes) {
    return __awaiter(this, void 0, void 0, function* () {
        if (securityName === "keycloakLogin") {
            const { username, password, grantType, clientId } = request.body;
            const result = yield config_1.keycloak.auth({
                username, password, grantType, clientId
            });
            if (!config_1.keycloak.accessToken || !config_1.keycloak.refreshToken)
                return Promise.reject(new Error("No token found."));
            const { refreshToken, accessToken } = config_1.keycloak;
            return Promise.resolve({
                refreshToken, accessToken
            });
        }
        else if (securityName === "keycloakAuth") {
            if (!config_1.keycloak.refreshToken || !config_1.keycloak.accessToken)
                return Promise.reject(new Error("Login required."));
            return Promise.resolve();
        }
    });
}
exports.expressAuthentication = expressAuthentication;
