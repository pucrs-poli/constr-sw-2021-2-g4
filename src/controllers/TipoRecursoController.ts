import express from "express";
import { Mongoose } from "mongoose";
import { Get, Path, Route, Request, Controller, Tags, Security, Post, Body, Put, Delete, Patch } from "tsoa";
import TipoRecursoModel from '../models/TipoRecursoModel';

interface TipoRecursoResponse {
    message: string;
}
interface CreateUpdateResourceTypeInterface{
    categoria: string
}

@Route("tipoRecurso")
@Tags("TipoRecursoController")
export class TipoRecursoController extends Controller {
    @Get("/")
    public async gelAllResourceTypes(
        @Request() request: express.Request,
    ): Promise<TipoRecursoResponse | { message: string}> {
        try {

            console.log(await TipoRecursoModel.TipoRecursoModel.collection.find().toArray());
            this.setStatus(200);
             return {
                message: "get all resource types OK",
            };
        } catch (err: any) {
            return {
                message: `${err.message}`
            } as any;
        }
    };
    @Get("/{id}")//Done
    public async getResourceTypeById(
        @Request() request: express.Request,
        @Path() id: string
    ): Promise<TipoRecursoResponse> {
        try {
            const obj = TipoRecursoModel.TipoRecursoModel.findById(id); 
            if (obj === null) {
                this.setStatus(404);
                throw "Could not find this record";
            }
            this.setStatus(200)
            return {
                message: "Get by id"
            };
        } catch (err: any) {
            return {
                message: `${err.message}`
            };
        }
    };
    @Post("/")
    public async createResourceType(
        @Request() request: express.Request,
        @Body() requestBody: CreateUpdateResourceTypeInterface
    ): Promise<TipoRecursoResponse> {
        try {
            const { categoria } = request.body;
            const newResourceType = {
                categoria: categoria,
            }
            const obj = new TipoRecursoModel.TipoRecursoModel(newResourceType);
            obj.save(err => {
                if (err) return "Error";
            })
            this.setStatus(201);
            return {
                message: "New resource trype created",
            };
        } catch (err: any) {
            return {
                message: `${err.message}`
            };
        }
    };
    @Delete("/{id}")
    public async deleteTipoRecursoByID(
        @Request() request: express.Request,
        @Path() id: string
    ): Promise<TipoRecursoResponse> {
        try {
            const obj = TipoRecursoModel.TipoRecursoModel.findById(id).deleteOne();
            if(obj == null){
                this.setStatus(404);
                throw "Could not find this object to delete";
            }
            this.setStatus(204)
            return {
                message: `Resource Type deleted by id. ID deleted is ${id}`,
            };
        } catch (err: any) {
            return {
                message: `${err.message}`
            };
        }
    };
    @Put("/{id}")
    public async updateById(
        @Request() request: express.Request,
        @Path() id: string,
        @Body() requestBody : CreateUpdateResourceTypeInterface
    ): Promise<TipoRecursoResponse> {
        try {
            const tipoRecurso  = requestBody;
            if(!tipoRecurso.categoria){
                this.setStatus(404);
                throw "Could not update. Does not contains all required fields";
            }
            const obj = TipoRecursoModel.TipoRecursoModel.findByIdAndUpdate(id,tipoRecurso);
            if (obj === null) {
                this.setStatus(404);
                throw "Could not find this object";
            }
            this.setStatus(200) 
            return {
                message: "Resource Type updated",
            };
        } catch (err: any) {
            return {
                message: `${err.message}`
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
                message: `${err.message}`
            };
        }
    }*/
}