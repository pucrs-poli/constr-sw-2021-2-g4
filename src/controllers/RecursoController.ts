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
                message: `${err}`,
                success: false
            } as any;
        }
    }
    @Get("/{id}")
    public async getRecursoByID(
        @Request() request: express.Request,
        @Path() id: string,
    ): Promise<RecursoResponse> {
        try {
            const result = (await (RecursoModel.findById(id)).exec());
            if (result === null) {
                this.setStatus(404);
                throw 'Resource not found'
            }
            return {
                message: `Resource found. Resource : \n ${JSON.stringify(result)}`,
                success: true
            };
        }
        catch (err: any) {
            return {
                message: `${err}`,
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
                message: `${err}`,
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
            const result = (await RecursoModel.findById(id).deleteOne());
            if (result.deletedCount === 0) {
                this.setStatus(404);
                throw "Resource was not deleted"
            }
            return {
                message: `Resource successfully deleted.`,
                success: true
            };
        }
        catch (err: any) {
            return {
                message: `${err}`,
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
            if (!recurso.name || !recurso.used || !recurso.description) {
                this.setStatus(404);
                throw "Could not update. Does not contains all required fields";
            }
            const testFieldName = Object.keys(recurso)
                .every((element) => { return ["name", "used", "description"].includes(element) });
            if (!testFieldName) {
                this.setStatus(405);
                throw "Request contains invalid field";
            }
            const update = await RecursoModel.findByIdAndUpdate(
                id,
                recurso
            );
            if (update === null) {
                this.setStatus(404);
                throw "Could not find this object";
            }
            return {
                message: `Resource successfully updated.`,
                success: true
            };
        }
        catch (err: any) {
            return {
                message: `${err}`,
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

            const testFieldName = Object.keys(recurso)
                .every((element) => { return ["name", "used", "description"].includes(element) });
            if (!testFieldName) {
                this.setStatus(405);
                throw "Request contains invalid field";
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
                message: `${err}`,
                success: false
            };
        }



    }
}