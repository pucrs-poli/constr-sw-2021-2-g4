import express from "express";
import { Mongoose } from "mongoose";
import { Get, Path, Route, Request, Controller, Tags, Post, Body, Delete, Put, Patch } from "tsoa";
import { RecursoModel, IRecurso } from '../models/RecursoModel';
import { Recurso } from "../models/TipoRecursoModel";
interface RecursoResponse {
    message: string,
    success: boolean
}
@Route("resource")
@Path("resource")
@Tags("RecursoController")
export class RecursoController extends Controller {
    @Get("/")
    public async getRecurso(): Promise<RecursoResponse> {
        try {

            let message = (await RecursoModel.collection.find().toArray());
            let result = "";
            if (message.length === 0)
                result = "No resource found";
            else
                for (let obj in message)
                    result += JSON.stringify(message) + "\n";
            return {
                message: result,
                success: true
            };
        }
        catch (err: any) {
            return {
                message: `${err.message}`,
                success: false
            } as any;
        }
    }
    @Get("/{id}")
    public async getRecursoByID(
        @Request() request: express.Request,
        @Path() id: string
    ): Promise<RecursoResponse> {
        try {
            const result = (await (RecursoModel.findById(id)).exec());
            if (!result) {
                throw 'Resource not found'
            }
            return {
                message: `Resource found. Resource : \n ${JSON.stringify(result)}`,
                success: true
            };
        }
        catch (err: any) {
            return {
                message: `${err.message}`,
                success: false
            };
        }
    }
    @Post("/")
    public async createResource(
        @Request() request: express.Request,
        @Body() requestBody: IRecurso
    ): Promise<RecursoResponse> {
        try {
            const resource = requestBody
            for (let value in Object.values(resource)) {
                if (value === undefined) {
                    throw "Contains undefined value"

                }
            }
            const obj = new RecursoModel(resource);
            let id = "";
            obj.save().then((resource) => {
                // if (err) return "oops";
                id = resource._id
            }).catch(
                () => { return "oops" }
            );
            return {
                message: `New resource created. ID : ${obj._id}`,
                success: true
            };
        } catch (err: any) {
            return {
                message: `${err.message}`,
                success: false
            };
        }
    };
    @Delete("/{id}")
    public async removeRecursoByID(
        @Request() request: express.Request,
        @Path() id: string
    ): Promise<RecursoResponse> {
        try {
            const result = (await RecursoModel.findById(id).deleteOne()).ok;
            if (result !== 1) {
                throw "Resource was not deleted"
            }
            return {
                message: `Resource successfully deleted.`,
                success: true
            };
        }
        catch (err: any) {
            return {
                message: `${err.message}`,
                success: false
            };
        }
    }
    @Put("/{id}")
    public async updatePutRecursoByID(
        @Request() request: express.Request,
        @Path() id: string,
        @Body() requestBody: IRecurso
    ): Promise<RecursoResponse> {
        try {
            const recurso = requestBody;

            for (const value in Object.values(recurso)) {
                if (value === undefined)
                    throw "Could not update. Contains undefined value";
            }
            const update = await RecursoModel.findByIdAndUpdate(
                id,
                recurso
            );
            return {
                message: `Resource successfully updated.`,
                success: true
            };
        }
        catch (err: any) {
            return {
                message: `${err.message}`,
                success: false
            };
        }

    }
    @Patch("/{id}")
    public async updatePatchRecursoByID(
        @Request() request: express.Request,
        @Path() id: string,
        @Body() requestBody: IRecurso
    ): Promise<RecursoResponse> {
        try {
            const recurso = requestBody;
            const newRecurso = recurso as any;
            for (const key in newRecurso) {
                if (newRecurso[key] === undefined)
                    delete newRecurso[key];
            }
            const update = await RecursoModel.findByIdAndUpdate(
                id,
                newRecurso
            );
            return {
                message: `Resource successfully updated.`,
                success: true
            };
        }
        catch (err: any) {
            return {
                message: `${err.message}`,
                success: false
            };
        }

    }

}