"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RecursoSchema = new mongoose_1.Schema({
    categoria: {
        type: String,
        required: true
    }
});
const TipoRecursoModel = (0, mongoose_1.model)("TipoRecurso", RecursoSchema);
exports.default = {
    TipoRecursoModel
};
