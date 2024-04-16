import {
  CREATE_ORG_MOCK,
  InMemoryOrgsRepository,
} from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetService } from './create-pet'
import {
  CREATE_PET_MOCK,
  InMemoryPetsRepository,
} from '@/repositories/in-memory/in-memory-pets-repository'
import { PetWithoutOrganizationError } from './errors/pet-without-organization-error'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: CreatePetService

describe('Create Pet', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetService(orgsRepository, petsRepository)
  })

  it('should be able to create a pet from an organization', async () => {
    const org = await orgsRepository.create({
      ...CREATE_ORG_MOCK,
    })

    const { pet } = await sut.execute({
      ...CREATE_PET_MOCK,
      name: 'Pet 1',
      organization_id: org.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to create a pet without organization', async () => {
    await expect(() =>
      sut.execute({
        ...CREATE_PET_MOCK,
        name: 'Pet Without Organization',
        organization_id: '',
      }),
    ).rejects.toBeInstanceOf(PetWithoutOrganizationError)
  })
})
