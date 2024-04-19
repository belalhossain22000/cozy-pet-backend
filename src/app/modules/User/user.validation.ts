 
import { z } from "zod";

const registerUserValidationSchema = z.object({
 
        name: z.string({
            required_error: "Name is required!"
        }),
        email: z.string({
            required_error: "Email is required!"
        }),
        password: z.string({
            required_error: "password is required!"
        }),
        
 
});

 const userLoginValidationSchema=z.object({
    email: z.string({
        required_error: "Email is required!"
    }),
    password: z.string({
        required_error: "password is required!"
    }),
 })

 const updateUserValidationSchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().optional(), 
});

export const userValidations = {
    registerUserValidationSchema,
    userLoginValidationSchema,
    updateUserValidationSchema
   
  
}