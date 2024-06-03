import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AuthServices } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";

const loginUser = catchAsync(async (req: Request, res: Response) => {
    console.log(req.body)
    const result = await AuthServices.loginUser(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged in successfully",
        data: result
    })
});

// change password
const changePassword = catchAsync(async (req: Request, res: Response) => {

    const token = req.headers.authorization

    if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "unauthorized access")
    }



    const result = await AuthServices.changePasswordIntoDb(req.body, token);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Password changed successfully",
        data: result
    })
});



export const AuthController = {
    loginUser,
    changePassword
};