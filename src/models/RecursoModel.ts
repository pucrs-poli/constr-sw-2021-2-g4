import { Schema, model, Mongoose } from "mongoose";

export interface IRecurso {
    name?: string,
    used?: boolean,
    description?: string
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
        },
        type_resource: {
            type: Schema.Types.ObjectId, ref: 'TipoRecurso'
        }

    }
)

export const RecursoModel = model("Recurso", RecursoSchema);