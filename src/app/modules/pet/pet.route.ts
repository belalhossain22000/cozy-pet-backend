
import express, { NextFunction, Request, Response } from 'express';
import { PetController } from './pet.controller';

 

const router = express.Router();

router.post(
    "/pets",  PetController.AddPet
);

 

export const petRoutes = router;