
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

// get pet adoption request
router.get (
    "/adoption-requests",  PetController.getPetAdoptionRequest
);
// add pet adoption  request
router.post (
    "/adoption-request",  PetController.petAdoptionRequest
);

// Update Adoption Request Status
router.put(
    "/adoption-requests/:requestId", PetController.adoptionRequestStatusUpdate
)

 

export const petRoutes = router;