import { Path, Route, Request, Controller, Tags, Body, Post, Security, Get } from "tsoa";
import express from "express";
import { keycloak } from "../config/";

interface AuthResponse {
    message: string;
    accessToken: string;
    refreshToken: string;
}

@Route("auth")
@Path("auth")
@Tags("AuthController")
export class AuthController extends Controller {
    @Post("/login")
    @Security("keycloakLogin")
    public async authenticate(
        @Request() request: express.Request,
        @Body() requestBody: { username: string; password: string; grantType: any; clientId: any },
    ): Promise<AuthResponse> {
        try {
            if (!request.user) {
                throw new Error("No user found");
            }
            const { refreshToken, accessToken } = request.user

            if (refreshToken && accessToken)
                return {
                    message: `Successfully authenticated!`,
                    refreshToken,
                    accessToken
                };
            else {
                throw new Error("No token found");
            }
        } catch (err: any) {
            return {
                message: `${err.message}`,
                accessToken: '',
                refreshToken: ''
            };
        }
    };

}