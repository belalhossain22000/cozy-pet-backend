import { z } from "zod";

const petAddValidationSchema = z.object({
    name: z.string({
        required_error: "Name is required!"
    }),
    photo: z.string({
        required_error: "photo url is required!"
    }),
    gender: z.string({
        required_error: "gender is required!"
    }),
    species: z.string({
        required_error: "Species is required!"
    }),
    breed: z.string({
        required_error: "Breed is required!"
    }),
    age: z.number().int().positive(),
    size: z.string({
        required_error: "Size is required!"
    }),
    location: z.string({
        required_error: "Location is required!"
    }),
    description: z.string({
        required_error: "Description is required!"
    }),
    temperament: z.string({
        required_error: "Temperament is required!"
    }),
    medicalHistory: z.string({
        required_error: "Medical history is required!"
    }),
    adoptionRequirements: z.string({
        required_error: "Adoption requirements are required!"
    }),
});


const updatePetValidationSchema = z.object({
    name: z.string().optional(),
    species: z.string().optional(),
    breed: z.string().optional(),
    age: z.number().int().positive().optional(),
    size: z.string().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
    temperament: z.string().optional(),
    medicalHistory: z.string().optional(),
    adoptionRequirements: z.string().optional(),
});

const petOwnershipExperienceSchema = z.object({
    petId: z.string({
        required_error: "Pet ID is required!"
    }),
    petOwnershipExperience: z.string({
        required_error: "Pet ownership experience is required!"
    }),
});

const AdoptionRequestStatus = z.enum(["PENDING", "APPROVED", "REJECTED"]);

const adoptionRequestSchema = z.object({
    status: AdoptionRequestStatus,
});

export const  petValidationSchema={
    petAddValidationSchema,
    updatePetValidationSchema,
    petOwnershipExperienceSchema,
    adoptionRequestSchema
};
