
import * as bcrypt from 'bcrypt'
import prisma from '../../../shared/prisma';
import { jwtHelpers } from '../../../helpars/jwtHelpers';
import config from '../../../config';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';


// register user
const registerUser = async (payload: any) => {
    const hashedPassword: string = await bcrypt.hash(payload.password, 12)

    const result = await prisma.$transaction(async (prisma) => {

        const user = await prisma.user.create({
            data: {
                name: payload.name,
                email: payload.email,
                password: hashedPassword,
                role: "USER",
                isActive: true
            }
        });

        const { password, ...userWithoutPassword } = user;

        return userWithoutPassword;

    });


    return result;
};

// get all users
const getAllUsersFromDb = async () => {
    const result = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isActive: true,
            createdAt: true,
            updatedAt: true
        }
    })
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "any user not found")
    }
    return result
}

const updateUserIntoDb = async (payload: any, userId: string) => {
    console.log(payload, userId)
    const result = await prisma.user.update({
        where: {
            id: userId
        },
        data: payload,
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isActive: true,
            createdAt: true,
            updatedAt: true

        },
    })

    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    return result

}



// get user profile
const getMyProfile = async (userToken: string) => {
    const decodedToken = jwtHelpers.verifyToken(userToken, config.jwt.jwt_secret!);

    // Getting user data
    const userProfile = await prisma.user.findUnique({
        where: {
            id: decodedToken.id
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true
        }
    });



    return userProfile;
}

const getAdoptionFromDb = async (token: string) => {

    const decodedToken = jwtHelpers.verifyToken(token, config.jwt.jwt_secret!);

    const result = await prisma.adoptionRequest.findMany({
        where: {
            userId: decodedToken.id
        },
        include: {
            pet: true
        }
    })
    console.log(result)
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "No Adoption Request Found")
    }
    const pets = result.map(request => ({
        id: request.pet.id,
        name: request.pet.name,
        createdAt: request.createdAt
    }));

    return pets
}

// update user profile
const updateMyProfile = async (userToken: string, payload: any) => {

    const decodedToken = jwtHelpers.verifyToken(userToken, config.jwt.jwt_secret!);
    const { role, ...restPayload } = payload
    // if (payload.role) {
    //     throw new ApiError(httpStatus.UNAUTHORIZED, "YOu cannot update your role")
    // }

    const userProfile = await prisma.user.update({
        where: {
            id: decodedToken.id
        },
        data: restPayload,
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true
        }
    });

    return userProfile
}


export const userServices = {
    registerUser,
    updateMyProfile,
    getMyProfile,
    getAllUsersFromDb,
    updateUserIntoDb,
    getAdoptionFromDb
}