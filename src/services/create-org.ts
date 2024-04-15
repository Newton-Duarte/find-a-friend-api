import { OrgsRepository } from '@/repositories/orgs-repository'
import { Organization } from '@prisma/client'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { hash } from 'bcryptjs'

export interface CreateOrgRequest {
  name: string
  phone: string
  owner_name: string
  email: string
  password: string
  description?: string | null
  street_name?: string | null
  street_number?: string | null
  neighborhood?: string | null
  city?: string | null
  postal_code?: string | null
}

export interface CreateOrgResponse {
  org: Organization
}

export class CreateOrgService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(data: CreateOrgRequest) {
    const orgWithSameEmail = await this.orgsRepository.findByEmail(data.email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const passwordHash = await hash(data.password, 6)

    const org = await this.orgsRepository.create({
      ...data,
      password: passwordHash,
    })

    return { org }
  }
}
