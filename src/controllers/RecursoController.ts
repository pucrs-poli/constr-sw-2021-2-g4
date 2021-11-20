import express from "express";
import { Get, Path, Route, Request, Controller, Tags, Post, Body, Delete, Put, Patch } from "tsoa";
import { RecursoModel, IRecurso } from '../models/RecursoModel';
interface RecursoResponse {
    result: any,
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
            let message = undefined;
            const result = (await RecursoModel.collection.find().toArray());
            if (result.length === 0)
                message = "No resource found";
            else
                message = "Found objects"
            return {
                result,
                message,
                success: true
            };
        }
        catch (err: any) {
            return {
                result: null,
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
                result,
                message: `Resource found.`,
                success: true
            };
        }
        catch (err: any) {
            return {
                result: null,
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
            if (!resource.name || !resource.used || !resource.description || !resource.type_resource) {
                this.setStatus(404);
                throw "Could not update. Does not contains all required fields";
            }
            const testFieldName = Object.keys(resource)
                .every((element) => { return ["name", "used", "description", "type_resource"].includes(element) });
            if (!testFieldName) {
                this.setStatus(405);
                throw "Request contains invalid field";
            }
            const obj = new RecursoModel(resource);
            let newResource = null;
            obj.save().then((resource) => {
                newResource = resource
            }).catch(
                () => { return "oops" }
            );
            return {
                result: newResource,
                message: `New resource created. ID : ${obj._id}`,
                success: true
            };
        } catch (err: any) {
            return {
                result: null,
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
                result,
                message: `Resource successfully deleted.`,
                success: true
            };
        }
        catch (err: any) {
            return {
                result: null,
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
            if (!recurso.name || !recurso.used || !recurso.description || !recurso.type_resource) {
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
                recurso,
                { new: true }
            );
            if (update === null) {
                this.setStatus(404);
                throw "Could not find this object";
            }
            return {
                result: update,
                message: `Resource successfully updated.`,
                success: true
            };
        }
        catch (err: any) {
            return {
                result: null,
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
                .every((element) => { return ["name", "used", "description", "type_resource"].includes(element) });
            if (!testFieldName) {
                this.setStatus(405);
                throw "Request contains invalid field";
            }
            const update = await RecursoModel.findByIdAndUpdate(
                id,
                recurso,
                { new: true }
            );
            return {
                result: update,
                message: `Resource successfully updated.`,
                success: true
            };
        }
        catch (err: any) {
            return {
                result: null,
                message: `${err}`,
                success: false
            };
        }
    }
}