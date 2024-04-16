import { randomUUID } from 'node:crypto'
import { OrgsRepository } from '../orgs-repository'
import { Organization, Prisma } from '@prisma/client'

export const CREATE_ORG_MOCK: Prisma.OrganizationCreateInput = {
  name: 'ORG 1',
  email: 'org1@email.com',
  password: '123456',
  owner_name: 'ORG Owner',
  phone: '82999999999',
  description: '',
  street_name: '',
  street_number: '',
  neighborhood: '',
  city: '',
  postal_code: '',
}

export class InMemoryOrgsRepository implements OrgsRepository {
  public orgs: Organization[] = []

  async create(data: Prisma.OrganizationCreateInput) {
    const org: Organization = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      owner_name: data.owner_name,
      description: data.description ?? null,
      street_name: data.street_name ?? null,
      street_number: data.street_number ?? null,
      neighborhood: data.neighborhood ?? null,
      city: data.city ?? null,
      postal_code: data.postal_code ?? null,
      phone: data.phone,
      created_at: new Date(),
    }

    this.orgs.push(org)

    return org
  }

  async findById(id: string) {
    const org = this.orgs.find((org) => org.id === id)

    return org || null
  }

  async findByEmail(email: string) {
    const org = this.orgs.find((org) => org.email === email)

    return org || null
  }
}
