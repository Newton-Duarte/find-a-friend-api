import {
  CREATE_ORG_MOCK,
  InMemoryOrgsRepository,
} from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import {
  CREATE_PET_MOCK,
  InMemoryPetsRepository,
} from '@/repositories/in-memory/in-memory-pets-repository'
import { FetchPetsByCityService } from './fetch-pets-by-city'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: FetchPetsByCityService

describe('Fetch Pets By City', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new FetchPetsByCityService(petsRepository)
  })

  it('should be able to fetch pets by city', async () => {
    const org = await orgsRepository.create({
      ...CREATE_ORG_MOCK,
      city: 'Maceió',
    })

    await petsRepository.create({
      ...CREATE_PET_MOCK,
      organization_id: org.id,
    })

    await petsRepository.create({
      ...CREATE_PET_MOCK,
      organization_id: org.id,
    })

    const { pets } = await sut.execute({ city: 'Maceió', page: 1 })

    expect(pets.length).toBe(2)
  })

  it('should be able to fetch paginated pets by city', async () => {
    const org = await orgsRepository.create({
      ...CREATE_ORG_MOCK,
      city: 'Maceió',
    })

    for (let i = 0; i < 22; i++) {
      await petsRepository.create({
        ...CREATE_PET_MOCK,
        name: `Pet ${i + 1}`,
        organization_id: org.id,
      })
    }

    const { pets } = await sut.execute({ city: 'Maceió', page: 2 })

    expect(pets.length).toBe(2)
    expect(pets[0].name).toBe('Pet 21')
    expect(pets[1].name).toBe('Pet 22')
  })
})
