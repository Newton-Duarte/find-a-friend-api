import {
  CREATE_ORG_MOCK,
  InMemoryOrgsRepository,
} from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchOrgsService } from './fetch-orgs'

let orgsRepository: InMemoryOrgsRepository
let sut: FetchOrgsService

describe('Fetch Orgs', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new FetchOrgsService(orgsRepository)
  })

  it('should be able to fetch organizations', async () => {
    await orgsRepository.create({
      ...CREATE_ORG_MOCK,
      name: 'Org 1',
      city: 'Maceió',
    })

    await orgsRepository.create({
      ...CREATE_ORG_MOCK,
      name: 'Org 2',
      city: 'Recife',
    })

    const { orgs } = await sut.execute()

    expect(orgs.length).toBe(2)
  })
})
