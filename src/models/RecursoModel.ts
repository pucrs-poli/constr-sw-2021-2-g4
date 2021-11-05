import { Schema, model } from "mongoose";

const RecursoSchema = new Schema(
    {
        nome: {
            type: String,
            required: true
        },
        emprestado: {
            type: Boolean,
            required: true
        },
        descricao: {
            type: String,
            required: true
        }
    }
)

const RecursoModel = model("Recurso", RecursoSchema);
export default {
    RecursoModel
}