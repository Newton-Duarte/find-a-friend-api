import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await prisma.organization.create({
    data: {
      name: 'John Doe ORG',
      owner_name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('123456', 6),
      phone: '82999999999',
      description: 'Org description',
      street_name: '',
      street_number: '',
      neighborhood: '',
      city: 'Recife',
      postal_code: '57035552',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: '123456',
  })

  const { organization, token } = authResponse.body

  return {
    organization,
    token,
  }
}
