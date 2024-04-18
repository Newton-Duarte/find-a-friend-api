import {
  Animal,
  AnimalAge,
  AnimalAmbient,
  AnimalSize,
  EnergyLevel,
  IndependenceLevel,
} from '@prisma/client'
import {
  PetWithAdoptionRequirements,
  PetsRepository,
} from '@/repositories/pets-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetWithoutOrganizationError } from './errors/pet-without-organization-error'

export interface CreatePetRequest {
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

export interface CreatePetResponse {
  pet: PetWithAdoptionRequirements
}

export class CreatePetService {
  constructor(
    private orgsRepository: OrgsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute(data: CreatePetRequest) {
    const org = await this.orgsRepository.findById(data.organization_id)

    if (!org) {
      throw new PetWithoutOrganizationError()
    }

    const pet = await this.petsRepository.create(data)

    return { pet }
  }
}
