"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tsoa_1 = require("tsoa");
const express_1 = __importDefault(require("express"));
const config_1 = require("../config/");
let UserController = class UserController extends tsoa_1.Controller {
    getAllUsers(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // keycloak.auth({
                //     username, password
                // })
                console.log(config_1.keycloak.accessToken);
                // if (!keycloak.accessToken) {
                //     return response.status(400).json({
                //         message: "test lol",
                //     });
                // }
                const user = yield config_1.keycloak.users.find();
                console.log(user);
                return {
                    message: `TEST`,
                };
            }
            catch (err) {
                return {
                    message: "TESTAAA",
                };
            }
        });
    }
    ;
};
__decorate([
    (0, tsoa_1.Get)("/users"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
UserController = __decorate([
    (0, tsoa_1.Route)("user"),
    (0, tsoa_1.Path)("user"),
    (0, tsoa_1.Tags)("UserController")
], UserController);
exports.UserController = UserController;
