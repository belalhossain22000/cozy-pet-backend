import { NextFunction, Request, Response } from "express";
 
import config from "../../config";
import { Secret } from "jsonwebtoken";
import ApiError from "../errors/ApiError";
import httpStatus from "http-status";
import { jwtHelpers } from "../../helpars/jwtHelpers";
import { IUser } from "../modules/User/user.interface";


declare global {
    namespace Express {
      interface Request {
        user?: IUser; 
      }
    }
  }

const auth = () => {
    return async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization

            if (!token) {
                throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized Access!")
            }

            const verifiedUser = jwtHelpers.verifyToken(token, config.jwt.jwt_secret as Secret)

            req.user = verifiedUser;

            next()
        }
        catch (err) {
            next(err)
        }
    }
};

export default auth;