import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

export interface FetchPetsByCityRequest {
  city: string
  page: number
}

export interface FetchPetsByCityResponse {
  pets: Pet[]
}

export class FetchPetsByCityService {
  constructor(private petsRepository: PetsRepository) {}

  async execute(data: FetchPetsByCityRequest) {
    const pets = await this.petsRepository.findManyByCity({
      city: data.city,
      page: data.page,
    })

    return { pets }
  }
}
