import { randomUUID } from 'node:crypto'
import {
  CreatePetInput,
  FindManyByCityParams,
  PetWithAdoptionRequirements,
  PetsRepository,
} from '../pets-repository'
import { InMemoryOrgsRepository } from './in-memory-orgs-repository'

export const CREATE_PET_MOCK: CreatePetInput = {
  name: 'PET 1',
  type: 'DOG',
  age: 'YOUNG',
  size: 'SMALL',
  ambient: 'SMALL',
  energy_level: 'LOW',
  independence_level: 'LOW',
  description: '',
  organization_id: '',
  adoption_requirements: [],
}

export class InMemoryPetsRepository implements PetsRepository {
  constructor(private orgsRepository: InMemoryOrgsRepository) {}

  public pets: PetWithAdoptionRequirements[] = []

  async create({
    id,
    name,
    type,
    age,
    size,
    ambient,
    energy_level,
    independence_level,
    description,
    organization_id,
    adoption_requirements = [],
  }: CreatePetInput) {
    const petId = id ?? randomUUID()

    const pet = {
      id: petId,
      name,
      type,
      age,
      size,
      ambient,
      energy_level,
      independence_level,
      description: description ?? null,
      organization_id,
      adoption_requirements:
        adoption_requirements?.map((requirement) => ({
          id: randomUUID(),
          description: requirement,
          pet_id: petId,
        })) || [],
      created_at: new Date(),
    }

    this.pets.push(pet)

    return pet
  }

  async findById(id: string) {
    const pet = this.pets.find((pet) => pet.id === id)

    return pet || null
  }

  async findManyByCity({
    city,
    page,
    age,
    size,
    energyLevel,
    independencyLevel,
  }: FindManyByCityParams) {
    const findPets = this.pets
      .filter((pet) => {
        const petOrg = this.orgsRepository.orgs.find(
          (org) => org.id === pet.organization_id,
        )

        return petOrg?.city === city
      })
      .filter((petInCity) => {
        return (
          petInCity.age.includes(age || '') &&
          petInCity.size.includes(size || '') &&
          petInCity.energy_level.includes(energyLevel || '') &&
          petInCity.independence_level.includes(independencyLevel || '')
        )
      })
      .slice((page - 1) * 20, page * 20)

    return findPets
  }
}
