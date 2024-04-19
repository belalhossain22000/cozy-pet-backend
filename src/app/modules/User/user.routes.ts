import express from 'express';
import { userController } from './user.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from './user.validation';


const router = express.Router();

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