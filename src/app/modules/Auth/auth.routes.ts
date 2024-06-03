import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from '../User/user.validation';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';
 

const router = express.Router();

router.post(
    '/login',
    validateRequest(userValidations.userLoginValidationSchema),
    AuthController.loginUser
);
    router.put(
        '/change-password',
        auth(Role.USER,Role.ADMIN),
        AuthController.changePassword
    );

 
export const AuthRoutes = router;