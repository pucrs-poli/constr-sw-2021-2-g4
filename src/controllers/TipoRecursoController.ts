import express from "express";
import { Get, Path, Route, Request, Controller, Tags, Security, Post, Body, Put, Delete, Patch } from "tsoa";
import { keycloak } from "../config/";
import TipoRecursoModel from '../models/TipoRecursoModel';

interface TipoRecursoResponse {
    message: string;
}
interface CreateResourceTypeInterface{
    description: string
}
interface UpdateResourceTypeInterface{
    description: string
}

@Route("tipoRecurso")
@Tags("TipoRecursoController")
export class TipoRecursoController extends Controller {
    @Get("/")
    @Security("keycloakAuth")
    public async gelAllResourceTypes(
        @Request() request: express.Request,
    ): Promise<TipoRecursoResponse | { message: string, status: boolean }> {
        try {

            return {
                console.log(await TipoRecursoModel.TipoRecursoModel.collection.find().toArray());
            };
        } catch (err: any) {
            return {
                message: `${err.message}`,
                success: false
            } as any;
        }
    };
    @Get("/{id}")//Done
    public async getResourceTypeById(
        @Request() request: express.Request,
        @Path() id: string
    ): Promise<TipoRecursoResponse> {
        return {
            message: `Tipo Recurso by id to be done. ID is ${id}`,
        };
    }
    @Post("/")
    public async createUser(
        @Request() request: express.Request,
        @Body() requestBody: CreateResourceInterface
    ): Promise<RecursoResponse> {
        try {
            const { name, used, description } = request.body;
            const newResource = {
                nome: name,
                emprestado: used,
                descricao: description
            }
            const obj = new RecursoModel.RecursoModel(newResource);
            obj.save(err => {
                if (err) return "oops";
            })
            return {
                message: "New resource created",
                // success: true
            };
        } catch (err: any) {
            return {
                message: `${err.message}`//,
                // success: false
            };
        }
    };
    @Delete("/{id}")
    public async removeRecursoByID(
        @Request() request: express.Request,
        @Path() id: string
    ): Promise<RecursoResponse> {

        // RecursoModel.RecursoModel.collection.deleteOne({
        //     "_id": "618547e74505d65b12368c54"
        // });

        console.log(await RecursoModel.RecursoModel.findById(id).deleteOne());

        // findByIdAndDelete("618547e74505d65b12368c54");

        return {
            message: `Recurso by id to be done. ID is ${id}`,
        };
    }
}