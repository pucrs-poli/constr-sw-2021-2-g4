import express from "express";
import { Document, Mongoose } from "mongoose";
import { Get, Path, Route, Request, Controller, Tags, Security, Post, Body, Put, Delete, Patch, Query, Hidden } from "tsoa";
import { RecursoModel } from "../models/RecursoModel";
import { ITipoRecurso, TipoRecursoModel } from '../models/TipoRecursoModel';

interface TipoRecursoResponse {
    result: any,
    message: string;
}
interface CreateUpdateResourceTypeInterface {
    name: string
}

@Route("tipoRecurso")
@Tags("TipoRecursoController")
export class TipoRecursoController extends Controller {

    @Get("/")
    public async gelAllResourceTypes(
        @Request() request: express.Request,
    ): Promise<TipoRecursoResponse> {
        try {
            let message = undefined;
            const result = (await TipoRecursoModel.collection.find().toArray());
            if (result.length === 0)
                message = "No object found";
            else
                message = "Found objects";
            this.setStatus(200);
            return {
                result,
                message
            };
        } catch (err: any) {
            return {
                message: `${err}`
            } as any;
        }
    };
    @Get("/query/all/")
    @Hidden()
    public async getResourceTypeByAttribute(
        @Request() request: express.Request
    ): Promise<TipoRecursoResponse> {
        try {
            const name = request.query
            if (!name) {
                this.setStatus(405);
                throw "Request contains invalid field";
            }
            const obj = await TipoRecursoModel.findOne({ name: request.query['name'] }).exec();
            if (obj === null) {
                this.setStatus(404);
                throw "Could not find this record";
            }
            this.setStatus(200)
            return {
                result: obj,
                message: "Get by id"
            };
        } catch (err: any) {
            return {
                result: null,
                message: `${err}`
            };
        }
    };
    @Get("/{id}")
    public async getResourceTypeById(
        @Request() request: express.Request,
        @Path() id: string
    ): Promise<TipoRecursoResponse> {
        try {
            const obj = await TipoRecursoModel.findById(id).exec();
            if (obj === null) {
                this.setStatus(404);
                throw "Could not find this record";
            }
            this.setStatus(200)
            return {
                result: obj,
                message: "Get by id"
            };
        } catch (err: any) {
            return {
                result: null,
                message: `${err}`
            };
        }
    };
    @Post("/")
    public async createResourceType(
        @Request() request: express.Request,
        @Body() requestBody: CreateUpdateResourceTypeInterface
    ): Promise<TipoRecursoResponse> {
        try {
            const resourceType = request.body;
            const obj = new TipoRecursoModel(resourceType);
            let newObj = null;
            const containsType = await TipoRecursoModel.findOne({ name: resourceType.name }).exec();
            if (containsType) {
                this.setStatus(404);
                throw "Duplicated name";
            }
            obj.save()
                .then(obj => { newObj = obj })
                .catch(err => { throw err })
            this.setStatus(201);
            return {
                result: newObj,
                message: "New resource trype created. ID: " + obj._id,
            };
        } catch (err: any) {
            return {
                result: null,
                message: `${err}`
            };
        }
    };
    @Delete("/{id}")
    public async deleteTipoRecursoByID(
        @Request() request: express.Request,
        @Path() id: string
    ): Promise<TipoRecursoResponse> {
        try {
            const obj = await TipoRecursoModel.findById(id).deleteOne();
            if (obj.deletedCount === 0) {
                this.setStatus(404);
                throw "Resource Type was not deleted"
            }
            await RecursoModel.deleteMany({ 'type_resource': id })
            this.setStatus(204)
            return {
                result: obj,
                message: `Resource Type deleted by id. ID deleted is ${id}`,
            };
        } catch (err: any) {
            return {
                result: null,
                message: `${err}`
            };
        }
    };
    @Put("/{id}")
    public async updateCompleteById(
        @Request() request: express.Request,
        @Path() id: string,
        @Body() requestBody: CreateUpdateResourceTypeInterface
    ): Promise<TipoRecursoResponse> {
        try {
            const tipoRecurso = requestBody;
            if (!tipoRecurso.name) {
                this.setStatus(404);
                throw "Could not update. Does not contains all required fields";
            }
            const containsType = await TipoRecursoModel.findOne({ name: tipoRecurso.name }).exec();
            if (containsType) {
                this.setStatus(404);
                throw "Duplicated name";
            }
            const obj = await TipoRecursoModel.findByIdAndUpdate(id, tipoRecurso, { new: true });
            if (obj === null) {
                this.setStatus(404);
                throw "Could not find this object";
            }
            this.setStatus(200)
            return {
                result: obj,
                message: "Resource Type updated",
            };
        } catch (err: any) {
            return {
                result: null,
                message: `${err}`
            };
        }
    };
    @Patch("/{id}")
    public async updatePartialById(
        @Request() request: express.Request,
        @Path() id: string,
        @Body() requestBody: CreateUpdateResourceTypeInterface
    ): Promise<TipoRecursoResponse> {
        try {
            const tipoRecurso = requestBody;
            if (!tipoRecurso.name) {
                this.setStatus(404);
                throw "Could not update. Does not contains all required fields";
            }
            const containsType = await TipoRecursoModel.findOne({ name: tipoRecurso.name }).exec();
            if (containsType) {
                this.setStatus(404);
                throw "Duplicated name";
            }
            const obj = await TipoRecursoModel.findByIdAndUpdate(id, tipoRecurso, { new: true });
            if (obj === null) {
                this.setStatus(404);
                throw "Could not find this object";
            }
            this.setStatus(200)
            return {
                result: obj,
                message: "Resource Type updated",
            };
        } catch (err: any) {
            return {
                result: null,
                message: `${err}`
            };
        }
    };

}