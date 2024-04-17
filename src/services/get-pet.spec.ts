import {
  CREATE_ORG_MOCK,
  InMemoryOrgsRepository,
} from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import {
  CREATE_PET_MOCK,
  InMemoryPetsRepository,
} from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetService } from './get-pet'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: GetPetService

describe('Get Pet', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new GetPetService(petsRepository)
  })

  it('should be able to get a pet by id', async () => {
    const org = await orgsRepository.create({
      ...CREATE_ORG_MOCK,
    })

    const createdPet = await petsRepository.create({
      ...CREATE_PET_MOCK,
      name: 'Pet By ID',
      organization_id: org.id,
    })

    const { pet } = await sut.execute({ id: createdPet.id })

    expect(pet.name).toBe('Pet By ID')
  })

  it('should not be able to get a pet by a non-existent id', async () => {
    await expect(() =>
      sut.execute({ id: 'non-existent-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
