import { randomUUID } from 'node:crypto'
import { Pet, Prisma } from '@prisma/client'
import { FindManyByCityParams, PetsRepository } from '../pets-repository'
import { InMemoryOrgsRepository } from './in-memory-orgs-repository'

export const CREATE_PET_MOCK: Prisma.PetUncheckedCreateInput = {
  name: 'PET 1',
  type: 'DOG',
  age: 'YOUNG',
  size: 'SMALL',
  ambient: 'SMALL',
  energy_level: 'LOW',
  independence_level: 'LOW',
  description: '',
  organization_id: '',
}

export class InMemoryPetsRepository implements PetsRepository {
  constructor(private orgsRepository: InMemoryOrgsRepository) {}

  public pets: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      type: data.type,
      age: data.age,
      size: data.size,
      ambient: data.ambient,
      energy_level: data.energy_level,
      independence_level: data.independence_level,
      description: data.description ?? null,
      organization_id: data.organization_id,
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
