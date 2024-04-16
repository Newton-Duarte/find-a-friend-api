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

  async findManyByCity({ city, page }: FindManyByCityParams) {
    const pet = await prisma.pet.findMany({
      where: {
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
