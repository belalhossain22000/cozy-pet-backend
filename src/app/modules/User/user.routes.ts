import express from 'express';
import { userController } from './user.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from './user.validation';


const router = express.Router();

router.get(
    "/users", auth(), userController.getAllUsers
);

router.put(
    "/user/:id", auth(), userController.updateUser
);
router.get(
    "/user/adoption", auth(), userController.getAdoption
);
router.post(
    "/register", validateRequest(userValidations.registerUserValidationSchema), userController.registerUser
);
router.get(
    "/profile", auth(), userController.getMyProfile
);
router.put(
    "/profile", auth(), validateRequest(userValidations.updateUserValidationSchema), userController.updateMyProfile
);



export const userRoutes = router;