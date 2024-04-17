import { Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrganizationCreateInput) {
    const org = await prisma.organization.create({
      data,
    })

    return org
  }

  async findById(id: string) {
    const org = await prisma.organization.findUnique({
      where: {
        id,
      },
    })

    return org
  }

  async findByEmail(email: string) {
    const org = await prisma.organization.findUnique({
      where: {
        email,
      },
    })

    return org
  }

  async findMany() {
    const orgs = await prisma.organization.findMany()

    return orgs
  }
}
