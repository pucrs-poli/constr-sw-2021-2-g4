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
let RecursoController = class RecursoController extends tsoa_1.Controller {
    getRecurso() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let message = (yield RecursoModel_1.RecursoModel.collection.find().toArray());
                let result = "";
                if (message.length === 0)
                    result = "No resource found";
                else
                    for (let obj in message)
                        result += JSON.stringify(message) + "\n";
                return {
                    message: result,
                    success: true
                };
            }
            catch (err) {
                return {
                    message: `${err}`,
                    success: false
                };
            }
        });
    }
    getRecursoByID(request, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = (yield (RecursoModel_1.RecursoModel.findById(id)).exec());
                if (result === null) {
                    this.setStatus(404);
                    throw 'Resource not found';
                }
                return {
                    message: `Resource found. Resource : \n ${JSON.stringify(result)}`,
                    success: true
                };
            }
            catch (err) {
                return {
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
                const obj = new RecursoModel_1.RecursoModel(resource);
                let id = "";
                obj.save().then((resource) => {
                    // if (err) return "oops";
                    id = resource._id;
                }).catch(() => { return "oops"; });
                return {
                    message: `New resource created. ID : ${obj._id}`,
                    success: true
                };
            }
            catch (err) {
                return {
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
                    message: `Resource successfully deleted.`,
                    success: true
                };
            }
            catch (err) {
                return {
                    message: `${err}`,
                    success: false
                };
            }
        });
    }
    updatePutRecursoByID(request, id, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const recurso = requestBody;
                if (!recurso.name || !recurso.used || !recurso.description) {
                    this.setStatus(404);
                    throw "Could not update. Does not contains all required fields";
                }
                const testFieldName = Object.keys(recurso)
                    .every((element) => { return ["name", "used", "description"].includes(element); });
                if (!testFieldName) {
                    this.setStatus(405);
                    throw "Request contains invalid field";
                }
                const update = yield RecursoModel_1.RecursoModel.findByIdAndUpdate(id, recurso);
                if (update === null) {
                    this.setStatus(404);
                    throw "Could not find this object";
                }
                return {
                    message: `Resource successfully updated.`,
                    success: true
                };
            }
            catch (err) {
                return {
                    message: `${err}`,
                    success: false
                };
            }
        });
    }
    updatePatchRecursoByID(request, id, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const recurso = requestBody;
                const testFieldName = Object.keys(recurso)
                    .every((element) => { return ["name", "used", "description"].includes(element); });
                if (!testFieldName) {
                    this.setStatus(405);
                    throw "Request contains invalid field";
                }
                const update = yield RecursoModel_1.RecursoModel.findByIdAndUpdate(id, recurso);
                return {
                    message: `Resource successfully updated.`,
                    success: true
                };
            }
            catch (err) {
                return {
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
], RecursoController.prototype, "updatePutRecursoByID", null);
__decorate([
    (0, tsoa_1.Patch)("/{id}"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)()),
    __param(2, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], RecursoController.prototype, "updatePatchRecursoByID", null);
RecursoController = __decorate([
    (0, tsoa_1.Route)("resource"),
    (0, tsoa_1.Path)("resource"),
    (0, tsoa_1.Tags)("RecursoController")
], RecursoController);
exports.RecursoController = RecursoController;
