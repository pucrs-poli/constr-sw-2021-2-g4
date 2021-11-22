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
exports.RecursoController = void 0;
const express_1 = __importDefault(require("express"));
const tsoa_1 = require("tsoa");
const RecursoModel_1 = require("../models/RecursoModel");
const TipoRecursoModel_1 = require("../models/TipoRecursoModel");
let RecursoController = class RecursoController extends tsoa_1.Controller {
    getRecurso() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let message = undefined;
                const result = (yield RecursoModel_1.RecursoModel.find().populate("type_resource"));
                if (result.length === 0)
                    message = "No resource found";
                else
                    message = "Found objects";
                return {
                    result,
                    message,
                    success: true
                };
            }
            catch (err) {
                return {
                    result: null,
                    message: `${err}`,
                    success: false
                };
            }
        });
    }
    getResourceTypeByAttribute(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const name = request.query;
                const objQuery = {};
                for (let value in request.query) {
                    if (["name", "used", "description", "type_resource"].includes(value)) {
                        Object.assign(objQuery, { [value]: request.query[value] });
                    }
                }
                if (!objQuery) {
                    this.setStatus(404);
                    throw "No query sent";
                }
                const obj = yield RecursoModel_1.RecursoModel.findOne(objQuery).exec();
                if (obj === null) {
                    this.setStatus(404);
                    throw "Could not find this record";
                }
                this.setStatus(200);
                return {
                    result: obj,
                    message: "Get by id",
                    success: false
                };
            }
            catch (err) {
                return {
                    result: null,
                    message: `${err}`,
                    success: false
                };
            }
        });
    }
    ;
    getRecursoByID(request, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = (yield (RecursoModel_1.RecursoModel.findById(id).populate("type_resource")).exec());
                if (result === null) {
                    this.setStatus(404);
                    throw 'Resource not found';
                }
                return {
                    result,
                    message: `Resource found.`,
                    success: true
                };
            }
            catch (err) {
                return {
                    result: null,
                    message: `${err}`,
                    success: false
                };
            }
        });
    }
    createResource(request, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resource = requestBody;
                for (let value in Object.values(resource)) {
                    if (value === undefined) {
                        throw "Contains undefined value";
                    }
                }
                if (!resource.name || !resource.hasOwnProperty('used') || !resource.description || !resource.type_resource) {
                    this.setStatus(404);
                    throw "Could not update. Does not contains all required fields";
                }
                const testFieldName = Object.keys(resource)
                    .every((element) => { return ["name", "used", "description", "type_resource"].includes(element); });
                if (!testFieldName) {
                    this.setStatus(405);
                    throw "Request contains invalid field";
                }
                const containsType = yield TipoRecursoModel_1.TipoRecursoModel.findById(resource.type_resource).exec();
                if (!containsType) {
                    this.setStatus(404);
                    throw "Does not contains resource type";
                }
                const obj = new RecursoModel_1.RecursoModel(resource);
                let newResource = null;
                obj.save().then((resource) => {
                    newResource = resource;
                }).catch((err) => { console.log(err); return "oops"; });
                return {
                    result: newResource,
                    message: `New resource created. ID : ${obj._id}`,
                    success: true
                };
            }
            catch (err) {
                return {
                    result: null,
                    message: `${err}`,
                    success: false
                };
            }
        });
    }
    ;
    removeRecursoByID(request, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = (yield RecursoModel_1.RecursoModel.findById(id).deleteOne());
                if (result.deletedCount === 0) {
                    this.setStatus(404);
                    throw "Resource was not deleted";
                }
                return {
                    result,
                    message: `Resource successfully deleted.`,
                    success: true
                };
            }
            catch (err) {
                return {
                    result: null,
                    message: `${err}`,
                    success: false
                };
            }
        });
    }
    updateCompleteRecursoByID(request, id, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const recurso = requestBody;
                if (!recurso.name || !recurso.used || !recurso.description || !recurso.type_resource) {
                    this.setStatus(404);
                    throw "Could not update. Does not contains all required fields";
                }
                const testFieldName = Object.keys(recurso)
                    .every((element) => { return ["name", "used", "description", "type_resource"].includes(element); });
                if (!testFieldName) {
                    this.setStatus(405);
                    throw "Request contains invalid field";
                }
                const containsType = yield TipoRecursoModel_1.TipoRecursoModel.findById(recurso.type_resource).exec();
                if (!containsType) {
                    this.setStatus(404);
                    throw "Does not contains resource type";
                }
                const update = yield RecursoModel_1.RecursoModel.findByIdAndUpdate(id, recurso, { new: true });
                if (update === null) {
                    this.setStatus(404);
                    throw "Could not find this object";
                }
                return {
                    result: update,
                    message: `Resource successfully updated.`,
                    success: true
                };
            }
            catch (err) {
                return {
                    result: null,
                    message: `${err}`,
                    success: false
                };
            }
        });
    }
    updatePartialRecursoByID(request, id, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const recurso = requestBody;
                const testFieldName = Object.keys(recurso)
                    .every((element) => { return ["name", "used", "description", "type_resource"].includes(element); });
                if (!testFieldName) {
                    this.setStatus(405);
                    throw "Request contains invalid field";
                }
                if (recurso.type_resource) {
                    const containsType = yield TipoRecursoModel_1.TipoRecursoModel.findById(recurso.type_resource).exec();
                    if (!containsType) {
                        this.setStatus(404);
                        throw "Does not contains resource type";
                    }
                }
                const containsType = yield TipoRecursoModel_1.TipoRecursoModel.findById(recurso.type_resource).exec();
                if (!containsType) {
                    this.setStatus(404);
                    throw "Does not contains resource type";
                }
                const update = yield RecursoModel_1.RecursoModel.findByIdAndUpdate(id, recurso, { new: true });
                return {
                    result: update,
                    message: `Resource successfully updated.`,
                    success: true
                };
            }
            catch (err) {
                return {
                    result: null,
                    message: `${err}`,
                    success: false
                };
            }
        });
    }
};
__decorate([
    (0, tsoa_1.Get)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecursoController.prototype, "getRecurso", null);
__decorate([
    (0, tsoa_1.Get)("/query/all/"),
    (0, tsoa_1.Hidden)(),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RecursoController.prototype, "getResourceTypeByAttribute", null);
__decorate([
    (0, tsoa_1.Get)("/{id}"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RecursoController.prototype, "getRecursoByID", null);
__decorate([
    (0, tsoa_1.Post)("/"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RecursoController.prototype, "createResource", null);
__decorate([
    (0, tsoa_1.Delete)("/{id}"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RecursoController.prototype, "removeRecursoByID", null);
__decorate([
    (0, tsoa_1.Put)("/{id}"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)()),
    __param(2, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], RecursoController.prototype, "updateCompleteRecursoByID", null);
__decorate([
    (0, tsoa_1.Patch)("/{id}"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)()),
    __param(2, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], RecursoController.prototype, "updatePartialRecursoByID", null);
RecursoController = __decorate([
    (0, tsoa_1.Route)("resource"),
    (0, tsoa_1.Path)("resource"),
    (0, tsoa_1.Tags)("RecursoController")
], RecursoController);
exports.RecursoController = RecursoController;
