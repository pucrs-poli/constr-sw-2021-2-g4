"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RecursoSchema = new mongoose_1.Schema({
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
});
const RecursoModel = (0, mongoose_1.model)("Recurso", RecursoSchema);
exports.default = {
    RecursoModel
};
