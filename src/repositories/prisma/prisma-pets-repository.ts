import { prisma } from '@/lib/prisma'
import {
  CreatePetInput,
  FindManyByCityParams,
  PetsRepository,
} from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async create({
    name,
    description,
    type,
    age,
    size,
    ambient,
    energy_level,
    independence_level,
    organization_id,
    adoption_requirements = [],
  }: CreatePetInput) {
    const pet = await prisma.pet.create({
      data: {
        name,
        description,
        type,
        age,
        size,
        ambient,
        energy_level,
        independence_level,
        organization_id,
        adoption_requirements: {
          createMany: {
            data:
              adoption_requirements?.map((requirements) => ({
                description: requirements,
              })) || [],
          },
        },
      },
      include: {
        adoption_requirements: true,
      },
    })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
      include: {
        adoption_requirements: true,
      },
    })

    return pet
  }

  async findManyByCity({
    city,
    page,
    age,
    size,
    energyLevel,
    independencyLevel,
  }: FindManyByCityParams) {
    const filters = {
      age: age || undefined,
      size: size || undefined,
      energyLevel: energyLevel || undefined,
      independencyLevel: independencyLevel || undefined,
    }

    const pet = await prisma.pet.findMany({
      where: {
        ...filters,
        organization: {
          city,
        },
      },
      skip: (page - 1) * 20,
      take: 20,
    })

    return pet
  }
}
