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
const TipoRecursoModel_1 = require("../models/TipoRecursoModel");
let TipoRecursoController = class TipoRecursoController extends tsoa_1.Controller {
    gelAllResourceTypes(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let message = undefined;
                const result = (yield TipoRecursoModel_1.TipoRecursoModel.collection.find().toArray());
                if (result.length === 0)
                    message = "No object found";
                else
                    message = "Found objects";
                this.setStatus(200);
                return {
                    result,
                    message
                };
            }
            catch (err) {
                return {
                    message: `${err}`
                };
            }
        });
    }
    ;
    getResourceTypeByAttribute(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const name = request.query;
                if (!name) {
                    this.setStatus(405);
                    throw "Request contains invalid field";
                }
                const obj = yield TipoRecursoModel_1.TipoRecursoModel.findOne({ name: request.query['name'] }).exec();
                if (obj === null) {
                    this.setStatus(404);
                    throw "Could not find this record";
                }
                this.setStatus(200);
                return {
                    result: obj,
                    message: "Get by id"
                };
            }
            catch (err) {
                return {
                    result: null,
                    message: `${err}`
                };
            }
        });
    }
    ;
    getResourceTypeById(request, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const obj = yield TipoRecursoModel_1.TipoRecursoModel.findById(id).exec();
                if (obj === null) {
                    this.setStatus(404);
                    throw "Could not find this record";
                }
                this.setStatus(200);
                return {
                    result: obj,
                    message: "Get by id"
                };
            }
            catch (err) {
                return {
                    result: null,
                    message: `${err}`
                };
            }
        });
    }
    ;
    createResourceType(request, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resourceType = request.body;
                const obj = new TipoRecursoModel_1.TipoRecursoModel(resourceType);
                let newObj = null;
                const containsType = yield TipoRecursoModel_1.TipoRecursoModel.findOne({ name: resourceType.name }).exec();
                if (containsType) {
                    this.setStatus(404);
                    throw "Duplicated name";
                }
                obj.save()
                    .then(obj => { newObj = obj; })
                    .catch(err => { throw err; });
                this.setStatus(201);
                return {
                    result: newObj,
                    message: "New resource trype created. ID: " + obj._id,
                };
            }
            catch (err) {
                return {
                    result: null,
                    message: `${err}`
                };
            }
        });
    }
    ;
    deleteTipoRecursoByID(request, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const obj = yield TipoRecursoModel_1.TipoRecursoModel.findById(id).deleteOne();
                if (obj.deletedCount === 0) {
                    this.setStatus(404);
                    throw "Resource Type was not deleted";
                }
                this.setStatus(204);
                return {
                    result: obj,
                    message: `Resource Type deleted by id. ID deleted is ${id}`,
                };
            }
            catch (err) {
                return {
                    result: null,
                    message: `${err}`
                };
            }
        });
    }
    ;
    updateCompleteById(request, id, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tipoRecurso = requestBody;
                if (!tipoRecurso.name) {
                    this.setStatus(404);
                    throw "Could not update. Does not contains all required fields";
                }
                const containsType = yield TipoRecursoModel_1.TipoRecursoModel.findOne({ name: tipoRecurso.name }).exec();
                if (containsType) {
                    this.setStatus(404);
                    throw "Duplicated name";
                }
                const obj = yield TipoRecursoModel_1.TipoRecursoModel.findByIdAndUpdate(id, tipoRecurso, { new: true });
                if (obj === null) {
                    this.setStatus(404);
                    throw "Could not find this object";
                }
                this.setStatus(200);
                return {
                    result: obj,
                    message: "Resource Type updated",
                };
            }
            catch (err) {
                return {
                    result: null,
                    message: `${err}`
                };
            }
        });
    }
    ;
    updatePartialById(request, id, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tipoRecurso = requestBody;
                if (!tipoRecurso.name) {
                    this.setStatus(404);
                    throw "Could not update. Does not contains all required fields";
                }
                const containsType = yield TipoRecursoModel_1.TipoRecursoModel.findOne({ name: tipoRecurso.name }).exec();
                if (containsType) {
                    this.setStatus(404);
                    throw "Duplicated name";
                }
                const obj = yield TipoRecursoModel_1.TipoRecursoModel.findByIdAndUpdate(id, tipoRecurso, { new: true });
                if (obj === null) {
                    this.setStatus(404);
                    throw "Could not find this object";
                }
                this.setStatus(200);
                return {
                    result: obj,
                    message: "Resource Type updated",
                };
            }
            catch (err) {
                return {
                    result: null,
                    message: `${err}`
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
    (0, tsoa_1.Get)("/query/all/"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TipoRecursoController.prototype, "getResourceTypeByAttribute", null);
__decorate([
    (0, tsoa_1.Get)("/{id}"),
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
], TipoRecursoController.prototype, "updateCompleteById", null);
__decorate([
    (0, tsoa_1.Patch)("/{id}"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)()),
    __param(2, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], TipoRecursoController.prototype, "updatePartialById", null);
TipoRecursoController = __decorate([
    (0, tsoa_1.Route)("tipoRecurso"),
    (0, tsoa_1.Tags)("TipoRecursoController")
], TipoRecursoController);
exports.TipoRecursoController = TipoRecursoController;
