"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservaModel = void 0;
const mongoose_1 = require("mongoose");
const ReservaSchema = new mongoose_1.Schema({
    id_user: {
        type: String,
        required: true
    },
    resource: {
        type: mongoose_1.Schema.Types.ObjectId, ref: 'Recurso',
        required: true
    },
    reserva: {
        type: [[Date]],
        default: []
    }
});
ReservaSchema.index({ id_user: 1, id_resource: 1 }, { unique: true });
exports.ReservaModel = (0, mongoose_1.model)("Reserva", ReservaSchema);
