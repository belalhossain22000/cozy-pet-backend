import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
 

const router = express.Router();

router.post(
    "/register",userController.registerUser 
);

 

export const userRoutes = router;