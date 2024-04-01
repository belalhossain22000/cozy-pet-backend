import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { petServices } from "./pet.service";


const AddPet = catchAsync(async (req: Request, res: Response) => {

    const result = await petServices.addPetIntoDb(req.body)
    sendResponse(res, {
        success: true,
        statusCode:201,
        message: "pet added successfully",
        data: result
    })
});

export const PetController={
    AddPet
}