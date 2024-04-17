import { Organization } from '@prisma/client'
import { OrgsRepository } from '@/repositories/orgs-repository'

export interface FetchOrgsResponse {
  orgs: Organization[]
}

export class FetchOrgsService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute() {
    const orgs = await this.orgsRepository.findMany()

    return { orgs }
  }
}
