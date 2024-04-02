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

const petAdoptionRequestIntoDb = async (payload: any) => {
    const isPetExist = await prisma.pet.findUniqueOrThrow({
        where: {
            id: payload?.petId
        }
    })
    console.log(isPetExist)
    if (isPetExist) {
        const result = await prisma.adoptionRequest.create({
            data: payload
        })
        return result
    }
}

export const petServices = {
    addPetIntoDb,
    getPetFromDb,
    updatePete,
    petAdoptionRequestIntoDb
}