import { OrgsRepository } from '@/repositories/orgs-repository'

export interface CreateOrgRequest {
  name: string
  phone: string
  description?: string
}

export interface CreateOrgResponse {
  org: any
}

export class CreateOrgService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(data: CreateOrgRequest) {
    const org = await this.orgsRepository.create(data)

    return { org }
  }
}
