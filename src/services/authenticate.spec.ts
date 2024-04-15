import {
  CREATE_ORG_MOCK,
  InMemoryOrgsRepository,
} from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateService } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateService

describe('Authenticate', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateService(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    await orgsRepository.create({
      ...CREATE_ORG_MOCK,
      email: 'org1@example.com',
      password: await hash('123456', 6),
    })

    const response = await sut.execute({
      email: 'org1@example.com',
      password: '123456',
    })

    expect(response.organization.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong credentials', async () => {
    await expect(() =>
      sut.execute({
        email: 'wrong-email@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
