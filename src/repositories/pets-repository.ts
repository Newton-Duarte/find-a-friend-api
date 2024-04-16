import { Pet, Prisma } from '@prisma/client'

export type FindManyByCityParams = {
  city: string
  page: number
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  findManyByCity(params: FindManyByCityParams): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
