
import * as bcrypt from 'bcrypt'
import prisma from '../../../shared/prisma';

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


export const userServices = {
    registerUser
}