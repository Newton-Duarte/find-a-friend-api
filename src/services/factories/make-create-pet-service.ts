import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { CreatePetService } from '../create-pet'

export function makeCreatePetService() {
  const orgsRepository = new PrismaOrgsRepository()
  const petsRepository = new PrismaPetsRepository()
  const service = new CreatePetService(orgsRepository, petsRepository)

  return service
}
