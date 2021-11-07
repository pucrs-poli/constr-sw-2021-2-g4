import express from "express";
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
    ): Promise<TipoRecursoResponse | { message: string, status: boolean }> {
        try {

            console.log(await TipoRecursoModel.TipoRecursoModel.collection.find().toArray());
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
            return {
                message: await TipoRecursoModel.TipoRecursoModel.findById(id)
            };
        } catch (err: any) {
            return {
                message: `${err.message}`
            };
        }
    }
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
        console.log(await TipoRecursoModel.TipoRecursoModel.findById(id).deleteOne());
        return {
            message: `Resource Type deleted by id. ID deleted is ${id}`,
        };
    }
    @Put("/{id}")
    public async updateById(
        @Request() request: express.Request,
        @Path() id: string,
        @Body() requestBody : CreateUpdateResourceTypeInterface
    ): Promise<TipoRecursoResponse> {
        try {
            const { categoria } = request.body;
            const obj = TipoRecursoModel.TipoRecursoModel.findById(id);
            obj.categoria = categoria;
            obj.save(err => {
                if (err) return "Error";
            })
            return {
                message: "Resource Type updated",
            };
        } catch (err: any) {
            return {
                message: `${err.message}`
            };
        }
    }
    // TODO getByCategory
    @Get("/")//TODO GET BY CATEGORY
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
    }
}