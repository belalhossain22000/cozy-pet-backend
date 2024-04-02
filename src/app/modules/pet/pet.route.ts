
import express, { NextFunction, Request, Response } from 'express';
import { PetController } from './pet.controller';

 

const router = express.Router();

// get pet  
router.get(
    "/pets",  PetController.getAllPet
);

// add pet request
router.post(
    "/pets",  PetController.AddPet
);
// add pet request
router.put(
    "/pets/:id",  PetController.updatePet
);

// add pet request
router.post (
    "/adoption-request",  PetController.petAdoptionRequest
);

 

export const petRoutes = router;