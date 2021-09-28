import express from "express";
import { keycloak } from "../config/";


export async function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[]
): Promise<any> {
    if (securityName === "keycloakLogin") {
        const { username, password, grantType, clientId } = request.body;
        const result = await keycloak.auth({
            username, password, grantType, clientId
        })

        if (!keycloak.accessToken || !keycloak.refreshToken)
            return Promise.reject(new Error("No token found."));
        const { refreshToken, accessToken } = keycloak

        return Promise.resolve({
            refreshToken, accessToken
        });
    }
    else if (securityName === "keycloakAuth") {

        if (!keycloak.refreshToken || !keycloak.accessToken)
            return Promise.reject(new Error("Login required."));

        return Promise.resolve();
    }
}