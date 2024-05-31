import { Request, RequestHandler, Response } from "express";

import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { userServices } from "./user.service";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";


const registerUser = catchAsync(async (req: Request, res: Response) => {

    const result = await userServices.registerUser(req.body)
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "User registered successfully",
        data: result
    })
});
const getAllUsers = catchAsync(async (req: Request, res: Response) => {

    const result = await userServices.getAllUsersFromDb()
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User retrieved  successfully",
        data: result
    })
});

// update use by id
const updateUser = catchAsync(async (req: Request, res: Response) => {

    const data = req.body
    const id = req.params.id

    const result = await userServices.updateUserIntoDb(data, id)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User updated  successfully",
        data: result
    })
});
// update use by id
const getAdoption = catchAsync(async (req: Request, res: Response) => {

   const token = req.headers.authorization

   if(!token){
    throw new ApiError(httpStatus.UNAUTHORIZED,"unauthorize access denied")
   }

    const result = await userServices.getAdoptionFromDb(token)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User updated  successfully",
        data: result
    })
});

// get user profile
const getMyProfile = catchAsync(async (req: Request, res: Response) => {

    const userToken = req.headers.authorization

    const result = await userServices.getMyProfile(userToken as string)
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "User profile retrieved successfully",
        data: result
    })
});

// update user profile
const updateMyProfile = catchAsync(async (req: Request, res: Response) => {

    const userToken = req.headers.authorization as string

    const result = await userServices.updateMyProfile(userToken, req.body)

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "User profile updated successfully",
        data: result
    })
});




export const userController = {
    registerUser,
    getMyProfile,
    updateMyProfile,
    getAllUsers,
    updateUser,
    getAdoption
}