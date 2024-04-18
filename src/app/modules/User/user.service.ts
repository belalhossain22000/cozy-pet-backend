
import * as bcrypt from 'bcrypt'
import prisma from '../../../shared/prisma';
import { jwtHelpers } from '../../../helpars/jwtHelpers';
import config from '../../../config';

const registerUser = async (payload: any) => {
    const hashedPassword: string = await bcrypt.hash(payload.password, 12)
   
    const result = await prisma.$transaction(async (prisma) => {

        const user = await prisma.user.create({
            data: {
                name: payload.name,
                email: payload.email,
                password: hashedPassword
            }
        });

        const { password, ...userWithoutPassword } = user;
        
        return userWithoutPassword;

    });
    
    return result;
};


// get user profile
const getMyProfile = async (userToken: string) => {
    const decodedToken = jwtHelpers.verifyToken(userToken, config.jwt.jwt_secret!);
    console.log(decodedToken);
    
    // Getting user data
    const userProfile = await prisma.user.findUnique({
        where: {
            id: decodedToken.id  
        },
       
    });

    return userProfile; 
}


// update user profile
const updateMyProfile =  async (userToken: string,payload:any) => {
    const decodedToken = jwtHelpers.verifyToken(userToken, config.jwt.jwt_secret!);
    

    console.log(decodedToken);
 // Getting user data
    const userProfile = await prisma.user.update({
        where: {
           id: decodedToken.id  
        },
        data:payload
    });

    return userProfile 
}


export const userServices = {
    registerUser,
    updateMyProfile,
    getMyProfile
}