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
const RecursoModel_1 = __importDefault(require("../models/RecursoModel"));
let RecursoController = class RecursoController extends tsoa_1.Controller {
    getRecurso() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(yield RecursoModel_1.default.RecursoModel.collection.find().toArray());
            return {
                message: "recurso TODO",
            };
        });
    }
    getRecursoByID(request, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                message: `Recurso by id to be done. ID is ${id}`,
            };
        });
    }
    createUser(request, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, used, description } = request.body;
                const newResource = {
                    nome: name,
                    emprestado: used,
                    descricao: description
                };
                const obj = new RecursoModel_1.default.RecursoModel(newResource);
                obj.save(err => {
                    if (err)
                        return "oops";
                });
                return {
                    message: "New resource created",
                    // success: true
                };
            }
            catch (err) {
                return {
                    message: `${err.message}` //,
                    // success: false
                };
            }
        });
    }
    ;
    removeRecursoByID(request, id) {
        return __awaiter(this, void 0, void 0, function* () {
            // RecursoModel.RecursoModel.collection.deleteOne({
            //     "_id": "618547e74505d65b12368c54"
            // });
            console.log(yield RecursoModel_1.default.RecursoModel.findById(id).deleteOne());
            // findByIdAndDelete("618547e74505d65b12368c54");
            return {
                message: `Recurso by id to be done. ID is ${id}`,
            };
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
], RecursoController.prototype, "createUser", null);
__decorate([
    (0, tsoa_1.Delete)("/{id}"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RecursoController.prototype, "removeRecursoByID", null);
RecursoController = __decorate([
    (0, tsoa_1.Route)("recurso"),
    (0, tsoa_1.Path)("recurso"),
    (0, tsoa_1.Tags)("RecursoController")
], RecursoController);
exports.RecursoController = RecursoController;
