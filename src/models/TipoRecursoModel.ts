import { Schema, model } from "mongoose";

export interface ITipoRecurso {
    name?: string
}

const TipoRecursoSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        }
    }
)

export const TipoRecursoModel = model("TipoRecurso", TipoRecursoSchema);