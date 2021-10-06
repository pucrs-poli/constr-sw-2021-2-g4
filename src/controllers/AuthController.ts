import { Path, Route, Request, Controller, Tags, Body, Post, Security, Get, Example } from "tsoa";
import express from "express";

interface AuthResponse {
    message: string;
    accessToken: string;
    refreshToken: string;
}

@Route("auth")
@Path("auth")
@Tags("AuthController")
export class AuthController extends Controller {

    /**
     * @param requestBody Description for the request body object
     * @example requestBody {
     *   "username": "JohnnyBravo",
     *   "password": "my-secret",
     *   "grantType": "password",
     *   "clientId": "admin-cli"
     * }
     * just testing
     */
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