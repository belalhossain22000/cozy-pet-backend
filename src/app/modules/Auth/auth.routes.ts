import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from '../User/user.validation';
 

const router = express.Router();

router.post(
    '/login',
    validateRequest(userValidations.userLoginValidationSchema),
    AuthController.loginUser
);
router.put(
    '/change-password',
    
    AuthController.changePassword
);

 
export const AuthRoutes = router;