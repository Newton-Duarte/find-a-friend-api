import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrgService } from './create-org'

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgService

describe('Create Org', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgService(orgsRepository)
  })

  it('should be able to create an organization', async () => {
    const { org } = await sut.execute({
      name: 'Org 1',
      description: 'org description',
      phone: '82999999999',
    })

    expect(org.id).toEqual(expect.any(String))
    expect(org.phone).toEqual(org.phone)
  })
})
