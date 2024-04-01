 
import { z } from "zod";

const registerUserValidationSchema = z.object({
 
        name: z.string({
            required_error: "Name is required!"
        }),
        email: z.string({
            required_error: "Email is required!"
        }),
        bio: z.string({
            required_error: "Contact Number is required!"
        }),
        profession: z.string({
            required_error: "profession is required!"
        }),
        address: z.string({
            required_error: "address is required!"
        }),
 
});

 

export const userValidations = {
    registerUserValidationSchema,
  
}