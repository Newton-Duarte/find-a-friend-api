import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { FindManyByCityParams, PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
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
