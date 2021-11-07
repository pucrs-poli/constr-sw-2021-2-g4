import { Schema, model } from "mongoose";

export interface IRecurso {
    name: string,
    used: boolean,
    description: string
}

const RecursoSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        used: {
            type: Boolean,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }
)

export const RecursoModel = model("Recurso", RecursoSchema);