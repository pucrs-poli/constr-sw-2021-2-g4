import express from "express";
import { Document, Mongoose } from "mongoose";
import { Get, Path, Route, Request, Controller, Tags, Security, Post, Body, Put, Delete, Patch } from "tsoa";
import { TipoRecursoModel } from '../models/TipoRecursoModel';

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
    @Get("/{id}")//Done
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
    public async updateById(
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
    // TODO getByCategory
    /*@Get("?categoria={categoria}")//TODO GET BY CATEGORY
     public async getResourceTypeByCategory(
         @Request() request: express.Request,
         @Path() categoria: string
     ): Promise<TipoRecursoResponse> {
         try {
 
             return {
                 message: ''
             };
         } catch (err: any) {
             return {
                 message: `${err}`
             };
         }
     }*/
}