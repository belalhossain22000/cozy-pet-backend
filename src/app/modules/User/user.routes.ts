import express from 'express';
import { userController } from './user.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from './user.validation';
import { Role } from '@prisma/client';


const router = express.Router();

router.get(
    "/users", auth(Role.ADMIN), userController.getAllUsers
);

router.put(
    "/user/:id", auth(Role.ADMIN,Role.USER), userController.updateUser
);
router.get(
    "/user/adoption", auth(Role.ADMIN,Role.USER), userController.getAdoption
);
router.post(
    "/register", validateRequest(userValidations.registerUserValidationSchema), userController.registerUser
);
router.get(
    "/profile", auth(Role.ADMIN,Role.USER), userController.getMyProfile
);
router.put(
    "/profile", auth(Role.ADMIN,Role.USER), validateRequest(userValidations.updateUserValidationSchema), userController.updateMyProfile
);



export const userRoutes = router;