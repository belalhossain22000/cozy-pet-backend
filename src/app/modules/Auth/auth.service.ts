
import { jwtHelpers } from "../../../helpars/jwtHelpers";
import prisma from "../../../shared/prisma";
import * as bcrypt from 'bcrypt'
import config from "../../../config";
import { Secret } from "jsonwebtoken";



const loginUser = async (payload: {
    email: string,
    password: string
}) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,

        }
    });


    const isCorrectPassword: boolean = await bcrypt.compare(payload.password, userData.password);

    if (!isCorrectPassword) {
        throw new Error("Password incorrect!")
    }
    const accessToken = jwtHelpers.generateToken({
        id: userData.id,
        name: userData.name,
        email: userData.email,
    },
        config.jwt.jwt_secret as Secret,
        config.jwt.expires_in as string
    );


    const result = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        token: accessToken
    }
    return result;
};

const changePasswordIntoDb = async (payload: { oldPassword: string, newPassword: string }, token: string) => {
    // Decode the token to get user information
    const decodedToken = jwtHelpers.verifyToken(token, config.jwt.jwt_secret!);

    // Find the user by email
    const isUserExist = await prisma.user.findUniqueOrThrow({
        where: {
            email: decodedToken.email,
        }
    });

    // Verify the old password
    const isCorrectPassword: boolean = await bcrypt.compare(payload.oldPassword, isUserExist.password);

    if (!isCorrectPassword) {
        throw new Error("Old password is incorrect!");
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(12);
    const hashedNewPassword = await bcrypt.hash(payload.newPassword, salt);

    // Update the user's password
    const result = await prisma.user.update({
        where: {
            id: decodedToken.id,
        },
        data: {
            password: hashedNewPassword,
        }
    });

    return {
        id: result.id,
        email: result.email,
        name: result.name,
    };
};


export const AuthServices = {
    loginUser,
    changePasswordIntoDb
}