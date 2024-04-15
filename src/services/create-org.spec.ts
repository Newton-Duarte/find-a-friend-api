import {
  CREATE_ORG_MOCK,
  InMemoryOrgsRepository,
} from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrgService } from './create-org'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgService

describe('Create Org', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgService(orgsRepository)
  })

  it('should be able to create an organization', async () => {
    const { org } = await sut.execute({
      ...CREATE_ORG_MOCK,
      name: 'ORG 1',
      phone: '82 9 9999-9999',
    })

    expect(org.id).toEqual(expect.any(String))
    expect(org.phone).toEqual(org.phone)
  })

  it('should not be able to create an organization with same email', async () => {
    const { org } = await sut.execute({
      ...CREATE_ORG_MOCK,
      name: 'ORG 1',
      phone: '82 9 9999-9999',
    })

    const org1Email = org.email

    await expect(() =>
      sut.execute({
        ...CREATE_ORG_MOCK,
        name: 'ORG 2',
        email: org1Email,
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })

  it('should be able to create a password hash', async () => {
    const rawPassword = '123456'

    const { org } = await sut.execute({
      ...CREATE_ORG_MOCK,
      password: rawPassword,
      name: 'ORG 1',
      phone: '82 9 9999-9999',
    })

    expect(org.password).not.toEqual(rawPassword)
  })
})
