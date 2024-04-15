import { OrgsRepository } from '@/repositories/orgs-repository'
import { Organization } from '@prisma/client'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'

interface AuthenticateServiceRequest {
  email: string
  password: string
}

interface AuthenticateServiceResponse {
  organization: Organization
}

export class AuthenticateService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(
    data: AuthenticateServiceRequest,
  ): Promise<AuthenticateServiceResponse> {
    const org = await this.orgsRepository.findByEmail(data.email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(data.password, org.password)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { organization: org }
  }
}
