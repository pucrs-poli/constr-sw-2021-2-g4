import { Get, Path, Route, Request, Controller, Tags, Body, Post } from "tsoa";
import express from "express";
import { keycloak } from "../config/";

interface AuthResponse {
    message: string;
}

@Route("auth")
@Path("auth")
@Tags("AuthController")
export class AuthController extends Controller {
    @Post("/auth")
    public async getAllUsers(
        @Request() request: express.Request,
        @Body() requestBody: { username: string; password: string; grantType: any; clientId: any },
    ): Promise<AuthResponse> {
        try {
            const { username, password, grantType, clientId } = request.body;
            console.log(keycloak.baseUrl);
            console.log(keycloak.realmName)
            await keycloak.auth({
                username, password, grantType, clientId
            })
            return {
                message: `${keycloak.accessToken}`,

            };

        } catch (err: any) {
            return {
                message: `${err.message}`,
            };
        }
    };
}