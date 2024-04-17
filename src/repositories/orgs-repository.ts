import { Organization, Prisma } from '@prisma/client'

export interface OrgsRepository {
  findById(id: string): Promise<Organization | null>
  findByEmail(email: string): Promise<Organization | null>
  findMany(): Promise<Organization[]>
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>
}
