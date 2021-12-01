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
const ReservaModel_1 = require("../models/ReservaModel");
let RecursoController = class RecursoController extends tsoa_1.Controller {
    getRecurso() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let message = undefined;
                const result = (yield RecursoModel_1.RecursoModel.find().populate("type_resource")).map((el) => el.toObject());
                const result_reservation = (yield ReservaModel_1.ReservaModel.find());
                const result2 = result.forEach((el, index, array) => {
                    const el_id = el._id;
                    const index_reservation = result_reservation.filter((obj) => {
                        return obj.get("resource").equals(el_id);
                    });
                    array[index] = Object.assign(array[index], { "reservation": index_reservation });
                    console.log({ "reservation": index_reservation });
                    console.log(array[index]);
                });
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
    getFreeResource(request) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, resourceTypeName } = request.query;
                const { startTime, endTime } = request.query;
                if (typeof startTime !== 'string')
                    throw "startTime is a must field";
                if (typeof endTime !== 'string')
                    throw "endTime is a must field";
                const timestamp = [new Date(startTime), new Date(endTime)];
                if (((_a = timestamp[0]) === null || _a === void 0 ? void 0 : _a.toString()) === 'Invalid Date' || ((_b = timestamp[1]) === null || _b === void 0 ? void 0 : _b.toString()) === 'Invalid Date') {
                    this.setStatus(405);
                    throw "Request must contains valid date. Check value and format (Should be 2021-11-23T22:35:33.881Z, no quotes)";
                }
                if ((!name && !resourceTypeName) || (name && resourceTypeName)) {
                    this.setStatus(405);
                    throw "Request must contains either recourse name or type recourse name";
                }
                if (!timestamp) {
                    this.setStatus(405);
                    throw "Request must contains the timestamp field";
                }
                if (timestamp.length !== 2) {
                    this.setStatus(405);
                    throw "Timestamp must contains two values";
                }
                if (!timestamp[0] || !timestamp[1]) {
                    this.setStatus(400);
                    throw `\nCheck values [${timestamp}]. The first and second element must be a date`;
                }
                if (timestamp[0] >= timestamp[1]) {
                    this.setStatus(400);
                    throw `\nCheck values [${timestamp}]. The first should be smaller than the second`;
                }
                let resourcesID;
                if (name) {
                    resourcesID = (yield RecursoModel_1.RecursoModel.find({ name }).exec());
                    console.log(resourcesID);
                }
                else {
                    const typeRec = (yield TipoRecursoModel_1.TipoRecursoModel.find({ name: resourceTypeName }).select("resource").exec());
                    if (!typeRec) {
                        this.setStatus(404);
                        throw "Resource type not found";
                    }
                    resourcesID = (yield RecursoModel_1.RecursoModel.find().where('type_resource').equals(typeRec).exec());
                }
                const obj = (yield ReservaModel_1.ReservaModel.find().where('resource').in(resourcesID).populate('resource').exec());
                const suitableResources = [];
                resourcesID.forEach((el) => {
                    const exists = obj.find((rec) => el._id.equals(rec.get("resource")._id));
                    if (!exists)
                        suitableResources.push(el);
                });
                for (let resource of obj) {
                    const allReservation = resource.get("reserva");
                    const notOverlap = allReservation.every((dates) => {
                        return dates[1] <= timestamp[0] || dates[0] >= timestamp[1];
                    });
                    if (notOverlap)
                        suitableResources.push(resource);
                }
                if (!suitableResources.length) {
                    this.setStatus(404);
                    throw "No suitable resources found";
                }
                this.setStatus(200);
                return {
                    result: suitableResources,
                    message: "Resources suitables for this timestamp",
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
                if (!recurso.name || !recurso.hasOwnProperty('used') || !recurso.description || !recurso.type_resource) {
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
    deleteReservasRecursoByUser(request, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_user, id_resource } = body;
                const update = yield ReservaModel_1.ReservaModel.findOneAndDelete({
                    id_user,
                    resource: id_resource
                });
                return {
                    result: null,
                    message: `Clear all reservation. User ID: ${id_user}. Resource ID: ${id_resource}`,
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
    reserveResource(request, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let finalMessage = "";
                const recurso = requestBody;
                const date = recurso.reserva;
                if (!date[0] || !date[1]) {
                    this.setStatus(400);
                    throw `\nCheck values [${date}]. The first and second element must be a date`;
                }
                if (date[0] >= date[1]) {
                    this.setStatus(400);
                    throw `\nCheck values [${date}]. The first should be smaller than the second`;
                }
                const obj = (yield ReservaModel_1.ReservaModel.findOne({
                    "resource": recurso.resource_id,
                    "id_user": recurso.user_id
                }).exec());
                if (obj) {
                    const allReservation = obj.get("reserva");
                    const notOverlap = allReservation.every((dates) => {
                        return dates[1] <= date[0] || dates[0] >= date[1];
                    });
                    if (notOverlap) {
                        yield ReservaModel_1.ReservaModel.findByIdAndUpdate(obj._id, { $push: { reserva: date } }, { new: true });
                    }
                    else {
                        this.setStatus(400);
                        throw `\nvalues [${date}] overlaps.`;
                    }
                    return {
                        result: finalMessage,
                        message: `Resource successfully reserved.`,
                        success: true
                    };
                }
                else {
                    const obj = new ReservaModel_1.ReservaModel({ id_user: recurso.user_id, resource: recurso.resource_id, reserva: recurso.reserva });
                    let newResource = null;
                    obj.save().then((resource) => {
                        newResource = resource;
                    }).catch((err) => { console.log(err); return "oops"; });
                    return {
                        result: newResource,
                        message: `Resource successfully reserved.`,
                        success: true
                    };
                }
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
    unreserveResource(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let finalMessage = "";
                const recurso = requestBody;
                const obj = (yield ReservaModel_1.ReservaModel.findOne({
                    "resource": recurso.resource_id,
                    "id_user": recurso.user_id
                }).exec());
                if (obj) {
                    let originalReservation = obj.get("reserva");
                    if (originalReservation.length) {
                        let element = recurso.reserva;
                        const index = originalReservation.findIndex((date) => {
                            return (date[0].getTime() === element[0].getTime() && date[1].getTime() === element[1].getTime());
                        });
                        if (index) {
                            originalReservation = originalReservation.splice(index, 1);
                            const a = yield ReservaModel_1.ReservaModel.findByIdAndUpdate(obj._id, {
                                reserva: originalReservation
                            }, { new: true });
                            return {
                                result: null,
                                message: `Deleted reservation.`,
                                success: false
                            };
                        }
                        else
                            return {
                                result: null,
                                message: `Reservation not found.`,
                                success: false
                            };
                    }
                    else {
                        return {
                            result: null,
                            message: `No reservation for this resource.`,
                            success: false
                        };
                    }
                }
                else {
                    return {
                        result: null,
                        message: `No reservation for this resource.`,
                        success: false
                    };
                }
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
    (0, tsoa_1.Get)("/query/free/"),
    (0, tsoa_1.Hidden)(),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RecursoController.prototype, "getFreeResource", null);
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
__decorate([
    (0, tsoa_1.Patch)("/reservation/clear"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RecursoController.prototype, "deleteReservasRecursoByUser", null);
__decorate([
    (0, tsoa_1.Post)("/reserve"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RecursoController.prototype, "reserveResource", null);
__decorate([
    (0, tsoa_1.Post)("/unreserve"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RecursoController.prototype, "unreserveResource", null);
RecursoController = __decorate([
    (0, tsoa_1.Route)("resource"),
    (0, tsoa_1.Path)("resource"),
    (0, tsoa_1.Tags)("RecursoController")
], RecursoController);
exports.RecursoController = RecursoController;
