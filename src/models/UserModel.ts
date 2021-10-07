import { Schema, model } from "mongoose";



const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
        },
        enabled: {
            type: Boolean,
            required: true
        },
        emailVerified: {
            type: Boolean,
            required: true
        }
    }
)

const UserModel = model("User", UserSchema);
export {
    UserModel
}