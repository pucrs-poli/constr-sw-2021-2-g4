import express from "express";
import { Get, Path, Route, Request, Controller, Tags, Post, Body, Delete } from "tsoa";
import RecursoModel from '../models/RecursoModel';
interface RecursoResponse {
    message: string;
}
interface CreateResourceInterface {
    name: string,
    used: boolean,
    description: string
}
@Route("recurso")
@Path("recurso")
@Tags("RecursoController")
export class RecursoController extends Controller {
    @Get("/")
    public async getRecurso(): Promise<RecursoResponse> {
        console.log(await RecursoModel.RecursoModel.collection.find().toArray());
        return {
            message: "recurso TODO",
        };
    }
    @Get("/{id}")
    public async getRecursoByID(
        @Request() request: express.Request,
        @Path() id: string
    ): Promise<RecursoResponse> {
        return {
            message: `Recurso by id to be done. ID is ${id}`,
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


