import { AdoptionRequestStatus, Prisma } from "@prisma/client"
import prisma from "../../../shared/prisma"
import { IPaginationOptions } from "../../interfaces/pagination"
import { paginationHelper } from "../../../helpars/paginationHelper";
import { petSearchAbleFields } from "./pet.constant";


// get all pets from db
const getPetFromDb = async (params: any, options: IPaginationOptions) => {
    const { page, limit, skip } = paginationHelper.calculatePagination(options);
    const { searchTerm, ...filterData } = params;

    const andConditions: Prisma.PetWhereInput[] = [];

    if (params.searchTerm) {
        andConditions.push({
            OR: ['name', 'species', 'breed', 'location'].map(field => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    };

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        })
    };

    const whereConditions: Prisma.PetWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.pet.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder ? {
            [options.sortBy]: options.sortOrder
        } : {
            createdAt: 'desc'
        },
        select: {
            id: true,
            name: true,
            species: true,
            breed: true,
            age: true,
            size: true,
            location: true,
            description: true,
            temperament: true,
            medicalHistory: true,
            adoptionRequirements: true,
            createdAt: true,
            updatedAt: true,
        }
    });

    const total = await prisma.pet.count({
        where: whereConditions
    });

    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
}

const getSinglePetFromDb = async (id: string) => {
    // Check if the pet exists
    const isPetExist = await prisma.pet.findUniqueOrThrow({
        where: {
            id
        }
    });
    if (isPetExist) {
        return isPetExist
    }
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

    console.log(isRequestExist)

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
    updateAdoptionRequestStatus,
    getSinglePetFromDb
}