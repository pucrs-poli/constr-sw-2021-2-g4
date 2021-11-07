"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecursoModel = void 0;
const mongoose_1 = require("mongoose");
const RecursoSchema = new mongoose_1.Schema({
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
});
exports.RecursoModel = (0, mongoose_1.model)("Recurso", RecursoSchema);
