import { Path, Route, Request, Controller, Tags, Body, Post, Security, Get, Example } from "tsoa";
import express from "express";

interface AuthResponse {
    message: string;
    accessToken: string;
    refreshToken: string;
}
interface AuthParams {
    username: string; password: string; grantType: string; clientId: string
}

@Route("auth")
@Path("auth")
@Tags("AuthController")
export class AuthController extends Controller {

    /**
     * @summary Authenticate user in API
     * @param requestBody Required fields to authenticate
     *
     */
    @Post("/login")
    @Security("keycloakLogin")
    public async authenticate(
        @Request() request: express.Request,
        @Body() requestBody: AuthParams,
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