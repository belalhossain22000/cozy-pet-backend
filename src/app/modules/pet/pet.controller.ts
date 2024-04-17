import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { petServices } from "./pet.service";


// pet add controller
const getAllPet = catchAsync(async (req: Request, res: Response) => {

    const result = await petServices.getPetFromDb()
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
// pet add controller
const updatePet = catchAsync(async (req: Request, res: Response) => {

    const id = req.params.id
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

    const result = await petServices.petAdoptionRequestIntoDb(req.body)
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Adoption request submitted successfully",
        data: result
    })
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

    const result = await petServices.updateAdoptionRequestStatus(id,req.body)
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