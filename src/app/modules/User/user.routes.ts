import express from 'express';
import { userController } from './user.controller';
import auth from '../../middlewares/auth';


const router = express.Router();

router.post(
    "/register", userController.registerUser
);
router.get(
    "/profile", auth(), userController.getMyProfile
);
router.put(
    "/profile",auth(), userController.updateMyProfile
);



export const userRoutes = router;