import { Schema, model } from "mongoose";
export interface IReserva {
    user_id?: string,
    resource_id?: string,
    reserva: Date[]
}
const ReservaSchema = new Schema(
    {
        id_user: {
            type: String,
            required: true
        },
        resource: {
            type: Schema.Types.ObjectId, ref: 'Recurso',
            required: true
        },
        reserva: {
            type: [[Date]],
            default: []
        }
    }
)

ReservaSchema.index({ id_user: 1, id_resource: 1 }, { unique: true });

export const ReservaModel = model("Reserva", ReservaSchema);