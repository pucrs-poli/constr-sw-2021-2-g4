import { Get, Path, Route, Request, Controller, Tags, Security, Header, Query, Post, Body, Put, Delete, Patch } from "tsoa";
import express from "express";
import { keycloak } from "../config/";
import UserRepresentation from "@keycloak/keycloak-admin-client/lib/defs/userRepresentation";
import { ExpressionWithTypeArguments } from "typescript";
import UserModel from "../models/UserModel";
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
    /**
     * This endpoint is used to  
     */
    @Get("/")
    @Security("keycloakAuth")
    public async getAllUsers(
        @Request() request: express.Request,
    ): Promise<UserResponse | { message: string, status: boolean }> {
        try {

            return {
                message: await keycloak.users.find(),
                success: true
            };
        } catch (err: any) {
            return {
                message: `${err.message}`,
                success: false
            } as any;
        }
    };

    @Get("/{realm}/{id}")
    @Security("keycloakAuth")
    public async getUserById(
        @Request() request: express.Request,
        @Path("id") id: string,
        @Path("realm") realm: string
    ): Promise<UserByIdResponse | { message: string; success: boolean }> {
        try {
            return {
                message: await keycloak.users.findOne({ id, realm }),
                success: true
            };
        } catch (err: any) {
            return {
                message: `${err.message}`,
                success: false
            };
        }
    };

    @Post("/")
    @Security("keycloakAuth")
    public async createUser(
        @Request() request: express.Request,
        @Body() body: { username: string, email: string, firstName: string, lastName: string, emailVerified: boolean, enabled: boolean, password: string }
    ): Promise<UserCreationResponse> {
        try {
            const { username, email, firstName, lastName, emailVerified, enabled, password } = request.body
            await keycloak.users.create({ username, email, firstName, lastName, emailVerified, enabled })
            return {
                message: "New user created",
                success: true
            };
        } catch (err: any) {
            return {
                message: `${err.message}`,
                success: false
            };
        }
    };

    @Put("/{realm}/{id}")
    @Security("keycloakAuth")
    public async updateUser(
        @Request() request: express.Request,
        @Body() body: { email?: string, firstName?: string, lastName?: string, emailVerified?: boolean, enabled?: boolean },
        @Path("id") id: string,
        @Path("realm") realm: string
    ): Promise<UserCreationResponse> {
        try {
            const user = keycloak.users.findOne({ id, realm })
            if (!user) {
                throw new Error("No user found");
            }
            await keycloak.users.update({ id, realm }, request.body)
            return {
                message: "Updated user",
                success: true
            };
        }
        catch (err: any) {
            return {
                message: `${err.message}`,
                success: false
            };
        }
    };

    @Delete("/{realm}/{id}")
    @Security("keycloakAuth")
    public async deleteUser(
        @Request() request: express.Request,
        @Path("id") id: string,
        @Path("realm") realm: string
    ): Promise<UserCreationResponse> {
        try {
            await keycloak.users.update({ id, realm }, { enabled: false })
            return {
                message: "Updated user",
                success: true
            };
        }
        catch (err: any) {
            return {
                message: `${err.message}`,
                success: false
            };
        }
    };

    @Patch("/{realm}/{id}")
    @Security("keycloakAuth")
    public async updatePassword(
        @Request() request: express.Request,
        @Body() body: { password: string },
        @Path("id") id: string,
        @Path("realm") realm: string,
    ): Promise<UserCreationResponse> {
        try {
            const { password } = request.body;
            const cred_list: { type: string, value: string }[] = [{ type: "password", value: password }]
            const credentials: UserRepresentation = {
                credentials: cred_list
            }
            await keycloak.users.update({ id, realm }, credentials)
            return {
                message: "Updated user password",
                success: true
            };
        }
        catch (err: any) {
            return {
                message: `${err.message}`,
                success: false
            };
        }
    };
}