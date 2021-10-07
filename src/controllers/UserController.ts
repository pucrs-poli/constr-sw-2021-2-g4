import { Get, Path, Route, Request, Controller, Tags, Security, Header, Query, Post, Body, Put, Delete, Patch } from "tsoa";
import express from "express";
import { keycloak } from "../config/";
import UserRepresentation from "@keycloak/keycloak-admin-client/lib/defs/userRepresentation";
import { ExpressionWithTypeArguments } from "typescript";
import { UserModel } from "../models/UserModel";
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

interface CreateUserInterface {
    username: string,
    firstName: string,
    lastName: string,
    password: string,
    email: string,
    enabled: boolean,
    emailVerified: boolean
}
interface UpdateUserInterface {
    username?: string,
    firstName?: string,
    lastName?: string,
    password?: string,
    email?: string,
    enabled?: boolean,
    emailVerified?: boolean
}
interface UpdatePasswordInterface {
    password: string
}

@Route("users")
@Tags("UserController")
export class UserController extends Controller {
    /**
     * @summary Retrieve all users in Keycloak Master Realm
     * 
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

    /**
     * @summary Get specific user in specific realm
     * 
     * @param realm Define the realm
     * @param id Define user ID to be fetched
     * 
    */
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

    /**
     * @summary Create user in Keycloak
     * 
     * 
     */
    @Post("/")
    @Security("keycloakAuth")
    public async createUser(
        @Request() request: express.Request,
        @Body() requestBody: CreateUserInterface
    ): Promise<UserCreationResponse> {
        try {
            const { username, email, firstName, lastName, emailVerified, enabled } = request.body
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

    /**
     * @summary  Update user field
     * 
     * @param body Send fields to be updated
     * @param id define user ID 
     * @param realm define user realm
     * 
     */
    @Put("/{realm}/{id}")
    @Security("keycloakAuth")
    public async updateUser(
        @Request() request: express.Request,
        @Body() body: UpdateUserInterface,
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

    /**
     * @summary Delete user in Keycloak
     * @param id Define user ID
     * @param realm Define user Realm
     */
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

    /**
     * 
     * @summary Update user Password
     * 
     * @param body Define new password
     * @param id Define User ID
     * @param realm Define User Realm
     * 
     */
    @Patch("/{realm}/{id}")
    @Security("keycloakAuth")
    public async updatePassword(
        @Request() request: express.Request,
        @Body() body: UpdatePasswordInterface,
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