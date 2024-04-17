import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsByCityService } from '../fetch-pets-by-city'

export function makeFetchPetsByCity() {
  const petsRepository = new PrismaPetsRepository()
  const service = new FetchPetsByCityService(petsRepository)

  return service
}
