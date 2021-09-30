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
                return {
                    message: yield config_1.keycloak.users.find(),
                    success: true
                };
            }
            catch (err) {
                console.log(err);
                return {
                    message: [],
                    success: false
                };
            }
        });
    }
    ;
    getUserById(request, id, realm) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return {
                    message: yield config_1.keycloak.users.findOne({ id, realm }),
                    success: true
                };
            }
            catch (err) {
                return {
                    message: {},
                    success: false
                };
            }
        });
    }
    ;
    createUser(request, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, firstName, lastName, emailVerified, enabled } = request.body;
                yield config_1.keycloak.users.create({ username, email, firstName, lastName, emailVerified, enabled });
                return {
                    message: "New user created",
                    success: true
                };
            }
            catch (err) {
                return {
                    message: "",
                    success: false
                };
            }
        });
    }
    ;
    updateUser(request, body, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateUser = { username: "", email: "", firstName: "", lastName: "", emailVerified: "", enabled: false };
                const allKeys = Object.keys(updateUser);
                allKeys.forEach(key => {
                    if (request.body[key])
                        updateUser[key] = request.body[key];
                    else
                        delete updateUser[key];
                });
                yield config_1.keycloak.users.update({ id }, updateUser);
                return {
                    message: "Updated user",
                    success: true
                };
            }
            catch (err) {
                return {
                    message: "",
                    success: false
                };
            }
        });
    }
    ;
    deleteUser(request, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield config_1.keycloak.users.update({ id }, { enabled: false });
                return {
                    message: "Updated user",
                    success: true
                };
            }
            catch (err) {
                return {
                    message: "",
                    success: false
                };
            }
        });
    }
    ;
    updatePassword(request, body, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { password } = request.body;
                const credentials = {};
                credentials.credentials[0].type = "password";
                credentials.credentials[0].value = password;
                yield config_1.keycloak.users.update({ id }, credentials);
                return {
                    message: "Updated user password",
                    success: true
                };
            }
            catch (err) {
                return {
                    message: "",
                    success: false
                };
            }
        });
    }
    ;
};
__decorate([
    (0, tsoa_1.Get)("/"),
    (0, tsoa_1.Security)("keycloakAuth"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, tsoa_1.Get)("/{realm}/{id}"),
    (0, tsoa_1.Security)("keycloakAuth"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("id")),
    __param(2, (0, tsoa_1.Path)("realm")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, tsoa_1.Post)("/"),
    (0, tsoa_1.Security)("keycloakAuth"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, tsoa_1.Put)("/{id}"),
    (0, tsoa_1.Security)("keycloakAuth"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Path)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, tsoa_1.Delete)("/{id}"),
    (0, tsoa_1.Security)("keycloakAuth"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, tsoa_1.Patch)("/{id}"),
    (0, tsoa_1.Security)("keycloakAuth"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Path)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePassword", null);
UserController = __decorate([
    (0, tsoa_1.Route)("users"),
    (0, tsoa_1.Tags)("UserController")
], UserController);
exports.UserController = UserController;
