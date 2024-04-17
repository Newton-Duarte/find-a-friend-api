import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetPetServiceRequest {
  id: string
}

interface GetPetServiceResponse {
  pet: Pet
}

export class GetPetService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ id }: GetPetServiceRequest): Promise<GetPetServiceResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return { pet }
  }
}
