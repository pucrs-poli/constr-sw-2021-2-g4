"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoRecursoModel = void 0;
const mongoose_1 = require("mongoose");
const TipoRecursoSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});
exports.TipoRecursoModel = (0, mongoose_1.model)("TipoRecurso", TipoRecursoSchema);
