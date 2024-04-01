import prisma from "../../../shared/prisma"


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

export const petServices = {
    addPetIntoDb
}