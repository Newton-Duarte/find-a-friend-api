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

  it('should be able to fetch pets by characteristics', async () => {
    const org = await orgsRepository.create({
      ...CREATE_ORG_MOCK,
      city: 'Maceió',
    })

    const characteristicsPet = await petsRepository.create({
      ...CREATE_PET_MOCK,
      age: 'YOUNG',
      size: 'MEDIUM',
      energy_level: 'HIGH',
      independence_level: 'MEDIUM',
      organization_id: org.id,
    })

    await petsRepository.create({
      ...CREATE_PET_MOCK,
      age: 'ADULT',
      organization_id: org.id,
    })

    const { pets } = await sut.execute({
      city: 'Maceió',
      page: 1,
      age: 'YOUNG',
    })

    expect(pets.length).toBe(1)
    expect(pets[0]).toEqual(
      expect.objectContaining({
        id: characteristicsPet.id,
      }),
    )
  })

  it('should be able to fetch pets by age', async () => {
    const org = await orgsRepository.create({
      ...CREATE_ORG_MOCK,
      city: 'Maceió',
    })

    await petsRepository.create({
      ...CREATE_PET_MOCK,
      age: 'YOUNG',
      organization_id: org.id,
    })

    await petsRepository.create({
      ...CREATE_PET_MOCK,
      age: 'ADULT',
      organization_id: org.id,
    })

    const { pets } = await sut.execute({
      city: 'Maceió',
      page: 1,
      age: 'YOUNG',
    })

    expect(pets.length).toBe(1)
  })

  it('should be able to fetch pets by size', async () => {
    const org = await orgsRepository.create({
      ...CREATE_ORG_MOCK,
      city: 'Maceió',
    })

    await petsRepository.create({
      ...CREATE_PET_MOCK,
      size: 'SMALL',
      organization_id: org.id,
    })

    await petsRepository.create({
      ...CREATE_PET_MOCK,
      size: 'LARGE',
      organization_id: org.id,
    })

    const { pets } = await sut.execute({
      city: 'Maceió',
      page: 1,
      size: 'LARGE',
    })

    expect(pets.length).toBe(1)
  })

  it('should be able to fetch pets by energy level', async () => {
    const org = await orgsRepository.create({
      ...CREATE_ORG_MOCK,
      city: 'Maceió',
    })

    await petsRepository.create({
      ...CREATE_PET_MOCK,
      energy_level: 'MEDIUM',
      organization_id: org.id,
    })

    await petsRepository.create({
      ...CREATE_PET_MOCK,
      energy_level: 'HIGH',
      organization_id: org.id,
    })

    const { pets } = await sut.execute({
      city: 'Maceió',
      page: 1,
      energyLevel: 'MEDIUM',
    })

    expect(pets.length).toBe(1)
  })

  it('should be able to fetch pets by independency level', async () => {
    const org = await orgsRepository.create({
      ...CREATE_ORG_MOCK,
      city: 'Maceió',
    })

    await petsRepository.create({
      ...CREATE_PET_MOCK,
      independence_level: 'LOW',
      organization_id: org.id,
    })

    await petsRepository.create({
      ...CREATE_PET_MOCK,
      independence_level: 'HIGH',
      organization_id: org.id,
    })

    const { pets } = await sut.execute({
      city: 'Maceió',
      page: 1,
      independencyLevel: 'HIGH',
    })

    expect(pets.length).toBe(1)
  })
})
