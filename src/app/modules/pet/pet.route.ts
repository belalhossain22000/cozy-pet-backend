
import express, { NextFunction, Request, Response } from 'express';
import { PetController } from './pet.controller';
import auth from '../../middlewares/auth';



const router = express.Router();

// get pet  
router.get(
    "/pets", PetController.getAllPet
);

// add pet request
router.post(
    "/pets", auth(), PetController.AddPet
);

// update pet
router.put(
    "/pets/:petId", auth(), PetController.updatePet
);

// get pet adoption request
router.get(
    "/adoption-requests", auth(), PetController.getPetAdoptionRequest
);
// add pet adoption  request
router.post(
    "/adoption-request", auth(), PetController.petAdoptionRequest
);

// Update Adoption Request Status
router.put(
    "/adoption-requests/:requestId", auth(), PetController.adoptionRequestStatusUpdate
)



export const petRoutes = router;