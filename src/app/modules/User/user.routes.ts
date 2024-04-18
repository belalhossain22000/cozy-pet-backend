import express from 'express';
import { userController } from './user.controller';
 

const router = express.Router();

router.post(
    "/register",userController.registerUser 
);
router.get(
    "/profile",userController.getMyProfile
);
router.put(
    "/profile",userController.updateMyProfile
);

 

export const userRoutes = router;