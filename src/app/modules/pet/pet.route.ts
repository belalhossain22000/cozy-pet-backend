
import express, { NextFunction, Request, Response } from 'express';
import { PetController } from './pet.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { petValidationSchema } from './pet.validation';
import { Role } from '@prisma/client';



const router = express.Router();

// get pet  
router.get(
    "/pets",
     PetController.getAllPet
);
// get pet  
router.get(
    "/pets/:id", PetController.getSingePet
);

// add pet request
router.post(
    "/pets", auth(Role.ADMIN), validateRequest(petValidationSchema.petAddValidationSchema), PetController.AddPet
);

// update pet
router.put(
    "/pets/:petId", auth(Role.ADMIN), validateRequest(petValidationSchema.updatePetValidationSchema), PetController.updatePet
);

// Update Adoption Request Status
router.delete(
    "/pets/delete/:petId", auth(Role.ADMIN),  PetController.deletePet
)

// get pet adoption request
router.get(
    "/adoption-requests", auth(Role.ADMIN), PetController.getPetAdoptionRequest
);
// add pet adoption  request
router.post(
    "/adoption-request", auth(Role.ADMIN,Role.USER), validateRequest(petValidationSchema.petOwnershipExperienceSchema), PetController.petAdoptionRequest
);

// Update Adoption Request Status
router.put(
    "/adoption-requests/:requestId", auth(Role.ADMIN), validateRequest(petValidationSchema.adoptionRequestSchema), PetController.adoptionRequestStatusUpdate
)






export const petRoutes = router;