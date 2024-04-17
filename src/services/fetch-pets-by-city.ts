import {
  AnimalAge,
  AnimalSize,
  EnergyLevel,
  IndependenceLevel,
  Pet,
} from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

export interface FetchPetsByCityRequest {
  city: string
  page: number
  age?: AnimalAge
  size?: AnimalSize
  energyLevel?: EnergyLevel
  independencyLevel?: IndependenceLevel
}

export interface FetchPetsByCityResponse {
  pets: Pet[]
}

export class FetchPetsByCityService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    page,
    age,
    size,
    energyLevel,
    independencyLevel,
  }: FetchPetsByCityRequest) {
    const pets = await this.petsRepository.findManyByCity({
      city,
      page,
      age,
      size,
      energyLevel,
      independencyLevel,
    })

    return { pets }
  }
}
