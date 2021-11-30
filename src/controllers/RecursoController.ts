import express from "express";
import { Get, Path, Route, Request, Controller, Tags, Post, Body, Delete, Put, Patch, Hidden } from "tsoa";
import { RecursoModel, IRecurso } from '../models/RecursoModel';
import { TipoRecursoModel } from "../models/TipoRecursoModel";
import { IReserva, ReservaModel } from '../models/ReservaModel';
import mongoose from 'mongoose';
interface RecursoResponse {
    result: any,
    message: string,
    success: boolean
}
interface IRecursoFree {
    name?: string,
    resourceTypeName?: string,
    timestamp: Date[]
}
interface IRecursoUserClear {
    id_resource: string,
    id_user: string
}
@Route("resource")
@Path("resource")
@Tags("RecursoController")
export class RecursoController extends Controller {
    @Get("/")
    public async getRecurso(): Promise<RecursoResponse> {
        try {
            let message = undefined;
            const result = (await RecursoModel.find().populate("type_resource"));
            if (result.length === 0)
                message = "No resource found";
            else
                message = "Found objects"
            return {
                result,
                message,
                success: true
            };
        }
        catch (err: any) {
            return {
                result: null,
                message: `${err}`,
                success: false
            } as any;
        }
    }
    @Get("/query/all/")
    @Hidden()
    public async getResourceTypeByAttribute(
        @Request() request: express.Request
    ): Promise<RecursoResponse> {
        try {
            const name = request.query
            const objQuery = {}
            for (let value in request.query) {
                if (["name", "used", "description", "type_resource"].includes(value)) {
                    Object.assign(objQuery, { [value]: request.query[value] })
                }
            }
            if (!objQuery) {
                this.setStatus(404)
                throw "No query sent";
            }
            const obj = await RecursoModel.findOne(objQuery).exec();
            if (obj === null) {
                this.setStatus(404);
                throw "Could not find this record";
            }
            this.setStatus(200)
            return {
                result: obj,
                message: "Get by id",
                success: false
            };
        } catch (err: any) {
            return {
                result: null,
                message: `${err}`,
                success: false
            };
        }
    };
    @Get("/{id}")
    public async getRecursoByID(
        @Request() request: express.Request,
        @Path() id: string,
    ): Promise<RecursoResponse> {
        try {
            const result = (await (RecursoModel.findById(id).populate("type_resource")).exec());
            if (result === null) {
                this.setStatus(404);
                throw 'Resource not found'
            }
            return {
                result,
                message: `Resource found.`,
                success: true
            };
        }
        catch (err: any) {
            return {
                result: null,
                message: `${err}`,
                success: false
            };
        }
    }
    @Get("/query/free/")
    @Hidden()
    public async getFreeResource(
        @Request() request: express.Request,
    ): Promise<RecursoResponse> {
        try {
            const { name, resourceTypeName } = request.query
            const { startTime, endTime } = request.query;
            if (typeof startTime !== 'string')
                throw "startTime is a must field"
            if (typeof endTime !== 'string')
                throw "endTime is a must field"
            const timestamp = [new Date(startTime), new Date(endTime)]
            if (timestamp[0]?.toString() === 'Invalid Date' || timestamp[1]?.toString() === 'Invalid Date') {
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
                this.setStatus(400)
                throw `\nCheck values [${timestamp}]. The first and second element must be a date`
            }
            if (timestamp[0] >= timestamp[1]) {
                this.setStatus(400);
                throw `\nCheck values [${timestamp}]. The first should be smaller than the second`
            }
            let resourcesID: any
            if (name) {
                resourcesID = (await RecursoModel.find({ name }).exec());
                console.log(resourcesID);
            }
            else {
                const typeRec = (await TipoRecursoModel.find({ name: resourceTypeName }).select("resource").exec());
                if (!typeRec) {
                    this.setStatus(404)
                    throw "Resource type not found";
                }
                resourcesID = (await RecursoModel.find().where('type_resource').equals(typeRec).exec());
            }

            const obj = (await ReservaModel.find().where('resource').in(resourcesID).populate('resource').exec());
            const suitableResources: any[] = [];

            resourcesID.forEach((el: any) => {
                const exists = obj.find((rec) => el._id.equals(rec.get("resource")._id))

                if (!exists)
                    suitableResources.push(el);
            })

            for (let resource of obj) {
                const allReservation = resource.get("reserva") as Date[][]
                const notOverlap = allReservation.every((dates) => {
                    return dates[1] <= timestamp[0] || dates[0] >= timestamp[1]
                })
                if (notOverlap) suitableResources.push(resource);
            }
            if (!suitableResources.length) {
                this.setStatus(404)
                throw "No suitable resources found"
            }

            this.setStatus(200)
            return {
                result: suitableResources,
                message: "Resources suitables for this timestamp",
                success: true
            };
        } catch (err: any) {
            return {
                result: null,
                message: `${err}`,
                success: false
            };
        }
    };
    @Post("/")
    public async createResource(
        @Request() request: express.Request,
        @Body() requestBody: IRecurso
    ): Promise<RecursoResponse> {
        try {
            const resource = requestBody
            for (let value in Object.values(resource)) {
                if (value === undefined) {
                    throw "Contains undefined value"
                }
            }

            if (!resource.name || !resource.hasOwnProperty('used') || !resource.description || !resource.type_resource) {
                this.setStatus(404);
                throw "Could not update. Does not contains all required fields";
            }
            const testFieldName = Object.keys(resource)
                .every((element) => { return ["name", "used", "description", "type_resource"].includes(element) });
            if (!testFieldName) {
                this.setStatus(405);
                throw "Request contains invalid field";
            }
            const containsType = await TipoRecursoModel.findById(resource.type_resource).exec();
            if (!containsType) {
                this.setStatus(404);
                throw "Does not contains resource type";
            }
            const obj = new RecursoModel(resource);
            let newResource = null;
            obj.save().then((resource) => {
                newResource = resource
            }).catch(
                (err) => { console.log(err); return "oops" }
            );
            return {
                result: newResource,
                message: `New resource created. ID : ${obj._id}`,
                success: true
            };
        } catch (err: any) {
            return {
                result: null,
                message: `${err}`,
                success: false
            };
        }
    };
    @Delete("/{id}")
    public async removeRecursoByID(
        @Request() request: express.Request,
        @Path() id: string
    ): Promise<RecursoResponse> {
        try {
            const result = (await RecursoModel.findById(id).deleteOne());
            if (result.deletedCount === 0) {
                this.setStatus(404);
                throw "Resource was not deleted"
            }
            return {
                result,
                message: `Resource successfully deleted.`,
                success: true
            };
        }
        catch (err: any) {
            return {
                result: null,
                message: `${err}`,
                success: false
            };
        }
    }
    @Put("/{id}")
    public async updateCompleteRecursoByID(
        @Request() request: express.Request,
        @Path() id: string,
        @Body() requestBody: IRecurso
    ): Promise<RecursoResponse> {
        try {
            const recurso = requestBody;
            if (!recurso.name || !recurso.hasOwnProperty('used') || !recurso.description || !recurso.type_resource) {
                this.setStatus(404);
                throw "Could not update. Does not contains all required fields";
            }
            const testFieldName = Object.keys(recurso)
                .every((element) => { return ["name", "used", "description", "type_resource"].includes(element) });
            if (!testFieldName) {
                this.setStatus(405);
                throw "Request contains invalid field";
            }
            const containsType = await TipoRecursoModel.findById(recurso.type_resource).exec();
            if (!containsType) {
                this.setStatus(404);
                throw "Does not contains resource type";
            }
            const update = await RecursoModel.findByIdAndUpdate(
                id,
                recurso,
                { new: true }
            );
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
        catch (err: any) {
            return {
                result: null,
                message: `${err}`,
                success: false
            };
        }
    }
    @Patch("/{id}")
    public async updatePartialRecursoByID(
        @Request() request: express.Request,
        @Path() id: string,
        @Body() requestBody: IRecurso
    ): Promise<RecursoResponse> {
        try {
            const recurso = requestBody;

            const testFieldName = Object.keys(recurso)
                .every((element) => { return ["name", "used", "description", "type_resource"].includes(element) });
            if (!testFieldName) {
                this.setStatus(405);
                throw "Request contains invalid field";
            }
            if (recurso.type_resource) {
                const containsType = await TipoRecursoModel.findById(recurso.type_resource).exec();
                if (!containsType) {
                    this.setStatus(404);
                    throw "Does not contains resource type";
                }
            }
            const update = await RecursoModel.findByIdAndUpdate(
                id,
                recurso,
                { new: true }
            );
            return {
                result: update,
                message: `Resource successfully updated.`,
                success: true
            };
        }
        catch (err: any) {
            return {
                result: null,
                message: `${err}`,
                success: false
            };
        }
    }
    @Patch("/reservation/clear")
    public async deleteReservasRecursoByUser(
        @Request() request: express.Request,
        @Body() body: IRecursoUserClear,
    ): Promise<RecursoResponse> {
        try {
            const { id_user, id_resource } = body;
            const update = await ReservaModel.findOneAndDelete(
                {
                    id_user,
                    resource: id_resource
                }
            );
            return {
                result: null,
                message: `Clear all reservation. User ID: ${id_user}. Resource ID: ${id_resource}`,
                success: true
            };
        }
        catch (err: any) {
            return {
                result: null,
                message: `${err}`,
                success: false
            };
        }
    }
    @Post("/reserve")
    public async reserveResource(
        @Request() request: express.Request,
        @Body() requestBody: IReserva

    ): Promise<RecursoResponse> {
        try {
            let finalMessage = "";
            const recurso = requestBody;

            const date = recurso.reserva

            if (!date[0] || !date[1]) {
                this.setStatus(400)
                throw `\nCheck values [${date}]. The first and second element must be a date`
            }
            if (date[0] >= date[1]) {
                this.setStatus(400);
                throw `\nCheck values [${date}]. The first should be smaller than the second`
            }
            const obj = (await ReservaModel.findOne(
                {
                    "resource": recurso.resource_id,
                    "id_user": recurso.user_id
                }
            ).exec())
            if (obj) {
                const allReservation = obj.get("reserva") as Date[][];
                const notOverlap = allReservation.every((dates) => {
                    return dates[1] <= date[0] || dates[0] >= date[1]
                })
                if (notOverlap) {
                    await ReservaModel.findByIdAndUpdate(
                        obj._id,
                        { $push: { reserva: date } },
                        { new: true }
                    );
                }
                else {
                    this.setStatus(400);
                    throw `\nvalues [${date}] overlaps.`
                }
                return {
                    result: finalMessage,
                    message: `Resource successfully reserved.`,
                    success: true
                };
            }
            else {
                const obj = new ReservaModel({ id_user: recurso.user_id, resource: recurso.resource_id, reserva: recurso.reserva });
                let newResource = null;
                obj.save().then((resource) => {
                    newResource = resource
                }).catch(
                    (err) => { console.log(err); return "oops" }
                );
                return {
                    result: newResource,
                    message: `Resource successfully reserved.`,
                    success: true
                };
            }
        }
        catch (err: any) {
            return {
                result: null,
                message: `${err}`,
                success: false
            };
        }
    }
    @Post("/unreserve")
    public async unreserveResource(
        @Body() requestBody: IReserva

    ): Promise<RecursoResponse> {
        try {
            let finalMessage = "";
            const recurso = requestBody;
            const obj = (await ReservaModel.findOne(
                {
                    "resource": recurso.resource_id,
                    "id_user": recurso.user_id
                }
            ).exec())
            if (obj) {
                let originalReservation = obj.get("reserva") as Date[][];
                if (originalReservation.length) {
                    let element = recurso.reserva
                    const index = originalReservation.findIndex((date) => {
                        return (date[0].getTime() === element[0].getTime() && date[1].getTime() === element[1].getTime())
                    })
                    if (index) {

                        originalReservation = originalReservation.splice(index, 1);

                        const a = await ReservaModel.findByIdAndUpdate(
                            obj._id,
                            {
                                reserva: originalReservation
                            },
                            { new: true }
                        );

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
        catch (err: any) {
            return {
                result: null,
                message: `${err}`,
                success: false
            };
        }
    }

}