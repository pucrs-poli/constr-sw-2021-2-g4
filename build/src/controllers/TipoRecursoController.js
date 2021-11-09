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
exports.TipoRecursoController = void 0;
const express_1 = __importDefault(require("express"));
const tsoa_1 = require("tsoa");
const TipoRecursoModel_1 = __importDefault(require("../models/TipoRecursoModel"));
let TipoRecursoController = class TipoRecursoController extends tsoa_1.Controller {
    gelAllResourceTypes(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(yield TipoRecursoModel_1.default.TipoRecursoModel.collection.find().toArray());
                return {
                    message: "get all resource types OK",
                };
            }
            catch (err) {
                return {
                    message: `${err.message}`
                };
            }
        });
    }
    ;
    getResourceTypeById(request, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(yield TipoRecursoModel_1.default.TipoRecursoModel.findById(id));
                return {
                    message: "Get by id"
                };
            }
            catch (err) {
                return {
                    message: `${err.message}`
                };
            }
        });
    }
    ;
    createResourceType(request, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { categoria } = request.body;
                const newResourceType = {
                    categoria: categoria,
                };
                const obj = new TipoRecursoModel_1.default.TipoRecursoModel(newResourceType);
                obj.save(err => {
                    if (err)
                        return "Error";
                });
                return {
                    message: "New resource trype created",
                };
            }
            catch (err) {
                return {
                    message: `${err.message}`
                };
            }
        });
    }
    ;
    deleteTipoRecursoByID(request, id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(yield TipoRecursoModel_1.default.TipoRecursoModel.findById(id).deleteOne());
            return {
                message: `Resource Type deleted by id. ID deleted is ${id}`,
            };
        });
    }
    ;
    updateById(request, id, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tipoRecurso = requestBody;
                if (!tipoRecurso.categoria) {
                    this.setStatus(404);
                    throw "Could not update. Does not contains all required fields";
                }
                const obj = TipoRecursoModel_1.default.TipoRecursoModel.findByIdAndUpdate(id, tipoRecurso);
                if (obj === null) {
                    this.setStatus(404);
                    throw "Could not find this object";
                }
                return {
                    message: "Resource Type updated",
                };
            }
            catch (err) {
                return {
                    message: `${err.message}`
                };
            }
        });
    }
    ;
};
__decorate([
    (0, tsoa_1.Get)("/"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TipoRecursoController.prototype, "gelAllResourceTypes", null);
__decorate([
    (0, tsoa_1.Get)("/{id}") //Done
    ,
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TipoRecursoController.prototype, "getResourceTypeById", null);
__decorate([
    (0, tsoa_1.Post)("/"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TipoRecursoController.prototype, "createResourceType", null);
__decorate([
    (0, tsoa_1.Delete)("/{id}"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TipoRecursoController.prototype, "deleteTipoRecursoByID", null);
__decorate([
    (0, tsoa_1.Put)("/{id}"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)()),
    __param(2, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], TipoRecursoController.prototype, "updateById", null);
TipoRecursoController = __decorate([
    (0, tsoa_1.Route)("tipoRecurso"),
    (0, tsoa_1.Tags)("TipoRecursoController")
], TipoRecursoController);
exports.TipoRecursoController = TipoRecursoController;
