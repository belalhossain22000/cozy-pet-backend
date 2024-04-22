import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { petServices } from "./pet.service";
import { JwtPayload } from "jsonwebtoken";
import pick from "../../../shared/pick";
import { petFilterableFields } from "./pet.constant";
import { clearScreenDown } from "readline";


// pet add controller
const getAllPet = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, petFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])

    const result = await petServices.getPetFromDb(filters,options)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Pets retrieved successfully",
        data: result
    })
});

// pet add controller
const AddPet = catchAsync(async (req: Request, res: Response) => {

    const result = await petServices.addPetIntoDb(req.body)
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "pet added successfully",
        data: result
    })
});
// pet update controller
const updatePet = catchAsync(async (req: Request, res: Response) => {

    const id = req.params.petId
    const data = req.body

    const result = await petServices.updatePete(id, data)
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Pet profile updated successfully",
        data: result
    })
});

// pet adoption request
const petAdoptionRequest = catchAsync(async (req: Request, res: Response) => {

    console.log(req)

    const usrId = req.user ? req.user.id : undefined;

    if (usrId !== undefined) {

        const result = await petServices.petAdoptionRequestIntoDb(req.body, usrId)
        sendResponse(res, {
            success: true,
            statusCode: 201,
            message: "Adoption request submitted successfully",
            data: result
        })
    }
});

// pet adoption request from db
const getPetAdoptionRequest = catchAsync(async (req: Request, res: Response) => {

    const result = await petServices.petAdoptionRequestFromDb()
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Adoption requests retrieved successfully",
        data: result
    })
});
// Update Adoption Request Status
const adoptionRequestStatusUpdate = catchAsync(async (req: Request, res: Response) => {

    const id = req.params.requestId

    const result = await petServices.updateAdoptionRequestStatus(id, req.body)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Adoption request updated successfully",
        data: result
    })
});

export const PetController = {
    AddPet,
    getAllPet,
    updatePet,
    petAdoptionRequest,
    getPetAdoptionRequest,
    adoptionRequestStatusUpdate
}