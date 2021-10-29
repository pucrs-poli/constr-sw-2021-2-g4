"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
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
});
const UserModel = (0, mongoose_1.model)("User", UserSchema);
exports.UserModel = UserModel;
