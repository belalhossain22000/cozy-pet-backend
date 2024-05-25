
import express, { NextFunction, Request, Response } from 'express';
import { PetController } from './pet.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { petValidationSchema } from './pet.validation';



const router = express.Router();

// get pet  
router.get(
    "/pets", PetController.getAllPet
);
// get pet  
router.get(
    "/pets/:id", PetController.getSingePet
);

// add pet request
router.post(
    "/pets", auth(), validateRequest(petValidationSchema.petAddValidationSchema), PetController.AddPet
);

// update pet
router.put(
    "/pets/:petId", auth(), validateRequest(petValidationSchema.updatePetValidationSchema), PetController.updatePet
);

// get pet adoption request
router.get(
    "/adoption-requests", auth(), PetController.getPetAdoptionRequest
);
// add pet adoption  request
router.post(
    "/adoption-request", auth(), validateRequest(petValidationSchema.petOwnershipExperienceSchema), PetController.petAdoptionRequest
);

// Update Adoption Request Status
router.put(
    "/adoption-requests/:requestId", auth(), validateRequest(petValidationSchema.adoptionRequestSchema), PetController.adoptionRequestStatusUpdate
)



export const petRoutes = router;