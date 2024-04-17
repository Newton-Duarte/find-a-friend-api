import {
  AnimalAge,
  AnimalSize,
  EnergyLevel,
  IndependenceLevel,
  Pet,
  Prisma,
} from '@prisma/client'

export type FindManyByCityParams = {
  city: string
  page: number
  age?: AnimalAge
  size?: AnimalSize
  energyLevel?: EnergyLevel
  independencyLevel?: IndependenceLevel
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  findManyByCity(params: FindManyByCityParams): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
