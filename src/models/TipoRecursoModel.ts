import { Schema, model } from "mongoose";

const RecursoSchema = new Schema(
    {
        categoria: {
            type: String,
            required: true
        }
    }
)

const TipoRecursoModel = model("TipoRecurso", RecursoSchema);
export default {
    TipoRecursoModel
}
