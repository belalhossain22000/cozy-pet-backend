import { AdoptionRequestStatus } from "@prisma/client"
import prisma from "../../../shared/prisma"


// get all pet 
const getPetFromDb = async () => {

    const result = await prisma.pet.findMany()

    return result

}


// pet add service function
const addPetIntoDb = async (payload: any) => {

    const result = await prisma.pet.create({
        data: {
            name: payload.name,
            species: payload.species,
            breed: payload.breed,
            age: payload.age,
            size: payload.size,
            location: payload.location,
            description: payload.description,
            temperament: payload.temperament,
            medicalHistory: payload.medicalHistory,
            adoptionRequirements: payload.adoptionRequirements,
        },
    });

    return result;

}

// update pet using id

const updatePete = async (id: string, data: any) => {

    // Check if the pet exists
    const isPetExist = await prisma.pet.findUnique({
        where: {
            id
        }
    });

    // Perform the update
    if (isPetExist) {
        const updatedPet = await prisma.pet.update({
            where: {
                id
            },
            data
        });

        return updatedPet;
    }
};


// pet adoption request 
const petAdoptionRequestIntoDb = async (payload: any, userId: string) => {
    const isPetExist = await prisma.pet.findUniqueOrThrow({
        where: {
            id: payload?.petId
        }
    })

    if (isPetExist) {
        const result = await prisma.adoptionRequest.create({
            data: { ...payload, userId }
        })
        return result
    }
}


// get adoption request from db

const petAdoptionRequestFromDb = async () => {


    const result = await prisma.adoptionRequest.findMany()
    return result
}


// Update Adoption Request Status
const updateAdoptionRequestStatus = async (id: string, data: { status: keyof typeof AdoptionRequestStatus }) => {

    const isRequestExist = await prisma.adoptionRequest.findUniqueOrThrow({
        where: { id }
    });

    console.log(data)
    if (isRequestExist) {
        const updatePetRequestStatus = await prisma.adoptionRequest.update({
            where: { id },
            data
        });
        return updatePetRequestStatus;
    }
};
export const petServices = {
    addPetIntoDb,
    getPetFromDb,
    updatePete,
    petAdoptionRequestIntoDb,
    petAdoptionRequestFromDb,
    updateAdoptionRequestStatus
}