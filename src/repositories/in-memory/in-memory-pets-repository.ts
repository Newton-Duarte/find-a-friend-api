import { randomUUID } from 'node:crypto'
import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'

export const CREATE_PET_MOCK: Prisma.PetUncheckedCreateInput = {
  name: 'ORG 1',
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
    }

    this.pets.push(pet)

    return pet
  }

  async findById(id: string) {
    const org = this.pets.find((org) => org.id === id)

    return org || null
  }
}
