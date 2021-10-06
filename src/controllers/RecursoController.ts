import express from "express";
import { Get, Path, Route, Request, Controller, Tags } from "tsoa";

interface RecursoResponse {
    message: string;
}

@Route("recurso")
@Path("recurso")
@Tags("RecursoController")
export class RecursoController extends Controller {
    @Get("/")
    public async getMessage(): Promise<RecursoResponse> {
        return {
            message: "recurso TODO",
        };
    }
    @Get("/{id}")
    public async getRecurso(
        @Request() request: express.Request,
        @Path() id: string
    ): Promise<RecursoResponse> {
        return {
            message: `Recurso by id to be done. ID is ${id}`,
        };
    }
}


