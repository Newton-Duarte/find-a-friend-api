import { FetchOrgsService } from '../fetch-orgs'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeFetchOrgs() {
  const orgsRepository = new PrismaOrgsRepository()
  const service = new FetchOrgsService(orgsRepository)

  return service
}
