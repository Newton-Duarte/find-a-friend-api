import { CreateOrgService } from '../create-org'

export function makeCreateOrg() {
  const orgsRepository = new PrismaOrgsRepository()
  const createOrgService = new CreateOrgService(orgsRepository)

  return createOrgService
}
