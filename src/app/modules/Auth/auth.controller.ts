import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AuthServices } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const loginUser = catchAsync(async (req: Request, res: Response) => {
    console.log('funtion called');
    const result = await AuthServices.loginUser(req.body);

 
 
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged in successfully",
        data: {
result:    result.result
 
        }
    })
});

 

export const AuthController = {
    loginUser,
    
};