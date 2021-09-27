import { Get, Path, Route, Request, Controller, Tags } from "tsoa";
import express from "express";
import { keycloak } from "../config/";

interface UserResponse {
    message: string;
}

@Route("user")
@Path("user")
@Tags("UserController")
export class UserController extends Controller {
    @Get("/users")
    public async getAllUsers(
        @Request() request: express.Request
    ): Promise<UserResponse> {
        try {
            // keycloak.auth({
            //     username, password
            // })
            console.log(keycloak.accessToken);

            // if (!keycloak.accessToken) {
            //     return response.status(400).json({
            //         message: "test lol",
            //     });
            // }

            const user = await keycloak.users.find();
            console.log(user);
            return {
                message: `TEST`,
            };
        } catch (err) {
            return {
                message: "TESTAAA",
            };
        }
    };
}