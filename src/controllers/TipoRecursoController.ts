import { Controller, Get, Path, Route, Tags } from "tsoa";

interface TipoRecursoResponse {
    message: string;
}

@Route("tipoRecurso")
@Tags("TipoRecursoController")
export class TipoRecursoController extends Controller {
    @Get("/")
    public async getMessage(): Promise<TipoRecursoResponse> {
        return {
            message: "tipo-de-recurso TODO",
        };
    }
}