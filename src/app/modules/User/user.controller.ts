import { Request, RequestHandler, Response } from "express";
 
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { userServices } from "./user.service";
 

const registerUser = catchAsync(async (req: Request, res: Response) => {

    const result = await userServices.registerUser(req.body)
    sendResponse(res, {
        success: true,
        statusCode:201,
        message: "User registered successfully",
        data: result
    })
});

// get user profile
const getMyProfile = catchAsync(async (req: Request, res: Response) => {

    const result = await userServices.registerUser(req.body)
    sendResponse(res, {
        success: true,
        statusCode:201,
        message: "User profile retrieved successfully",
        data: result
    })
});

// update user profile
const updateMyProfile = catchAsync(async (req: Request, res: Response) => {

    const result = await userServices.registerUser(req.body)
    sendResponse(res, {
        success: true,
        statusCode:201,
        message: "User profile updated successfully",
        data: result
    })
});

 

 
export const userController = {
    registerUser,
    getMyProfile,
    updateMyProfile
     
}