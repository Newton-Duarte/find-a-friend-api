import {
  Animal,
  AnimalAge,
  AnimalAmbient,
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

export type CreatePetInput = {
  id?: string
  name: string
  type: Animal
  age: AnimalAge
  size: AnimalSize
  ambient: AnimalAmbient
  energy_level: EnergyLevel
  independence_level: IndependenceLevel
  description?: string | null
  organization_id: string
  adoption_requirements?: string[] | null
}

export type PetWithAdoptionRequirements = Prisma.PetGetPayload<{
  include: {
    adoption_requirements: true
  }
}>

export interface PetsRepository {
  findById(id: string): Promise<PetWithAdoptionRequirements | null>
  findManyByCity(params: FindManyByCityParams): Promise<Pet[]>
  create(data: CreatePetInput): Promise<PetWithAdoptionRequirements>
}
