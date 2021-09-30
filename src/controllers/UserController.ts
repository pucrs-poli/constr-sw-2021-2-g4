import { Get, Path, Route, Request, Controller, Tags, Security, Header, Query, Post, Body, Put, Delete, Patch } from "tsoa";
import express from "express";
import { keycloak } from "../config/";
import UserRepresentation from "@keycloak/keycloak-admin-client/lib/defs/userRepresentation";
import { ExpressionWithTypeArguments } from "typescript";

interface UserResponse {
    message: UserRepresentation[];
    success: boolean
}
interface UserByIdResponse {
    message: UserRepresentation;
    success: boolean
}
interface UserCreationResponse {
    message: string;
    success: boolean
}
@Route("users")
@Tags("UserController")
export class UserController extends Controller {
    @Get("/")
    @Security("keycloakAuth")
    public async getAllUsers(
        @Request() request: express.Request,
    ): Promise<UserResponse> {
        try {
            return {
                message: await keycloak.users.find(),
                success: true
            };
        } catch (err) {
            console.log(err);
            return {
                message: [],
                success: false
            };
        }
    };

    @Get("/{realm}/{id}")
    @Security("keycloakAuth")
    public async getUserById(
        @Request() request: express.Request,
        @Path("id") id: string,
        @Path("realm") realm: string
    ): Promise<UserByIdResponse> {
        try {
            return {
                message: await keycloak.users.findOne({ id, realm }),
                success: true
            };
        } catch (err) {
            return {
                message: {},
                success: false
            };
        }
    };

    @Post("/")
    @Security("keycloakAuth")
    public async createUser(
        @Request() request: express.Request,
        @Body() body: { username: string, email: string, firstName: string, lastName: string, emailVerified: boolean, enabled: boolean }
    ): Promise<UserCreationResponse> {
        try {
            const { username, email, firstName, lastName, emailVerified, enabled } = request.body
            await keycloak.users.create({ username, email, firstName, lastName, emailVerified, enabled })
            return {
                message: "New user created",
                success: true
            };
        } catch (err) {
            return {
                message: "",
                success: false
            };
        }
    };

    @Put("/{id}")
    @Security("keycloakAuth")
    public async updateUser(
        @Request() request: express.Request,
        @Body() body: { username: string, email: string, firstName: string, lastName: string, emailVerified: boolean, enabled: boolean },
        @Path("id") id: string
    ): Promise<UserCreationResponse> {
        try {
            const updateUser: any = { username: "", email: "", firstName: "", lastName: "", emailVerified: "", enabled: false }
            const allKeys = Object.keys(updateUser)
            allKeys.forEach(key => {
                if (request.body[key])
                    updateUser[key] = request.body[key]
                else
                    delete updateUser[key];
            })

            await keycloak.users.update({ id }, updateUser)
            return {
                message: "Updated user",
                success: true
            };
        }
        catch (err) {
            return {
                message: "",
                success: false
            };
        }
    };

    @Delete("/{id}")
    @Security("keycloakAuth")
    public async deleteUser(
        @Request() request: express.Request,
        @Path("id") id: string
    ): Promise<UserCreationResponse> {
        try {
            await keycloak.users.update({ id }, { enabled: false })
            return {
                message: "Updated user",
                success: true
            };
        }
        catch (err) {
            return {
                message: "",
                success: false
            };
        }
    };

    @Patch("/{id}")
    @Security("keycloakAuth")
    public async updatePassword(
        @Request() request: express.Request,
        @Body() body: { password: string },
        @Path("id") id: string
    ): Promise<UserCreationResponse> {
        try {
            const { password } = request.body;
            const credentials: UserRepresentation = {}
            credentials.credentials![0].type = "password";
            credentials.credentials![0].value = password;
            await keycloak.users.update({ id }, credentials)
            return {
                message: "Updated user password",
                success: true
            };
        }
        catch (err) {
            return {
                message: "",
                success: false
            };
        }
    };
}