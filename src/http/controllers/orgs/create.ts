import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateOrgService } from '@/services/factories/make-create-org-service'
import { OrgAlreadyExistsError } from '@/services/errors/org-already-exists-error'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    name: z.string(),
    owner_name: z.string(),
    email: z.string().email(),
    password: z.string(),
    phone: z.string(),
    description: z.string().nullable(),
    street_name: z.string().nullable(),
    street_number: z.string().nullable(),
    neighborhood: z.string().nullable(),
    city: z.string().nullable(),
    postal_code: z.string().nullable(),
  })

  const {
    name,
    owner_name,
    email,
    password,
    phone,
    description,
    street_name,
    street_number,
    neighborhood,
    city,
    postal_code,
  } = requestBodySchema.parse(request.body)

  try {
    const createOrgService = makeCreateOrgService()

    const { org } = await createOrgService.execute({
      name,
      owner_name,
      email,
      password,
      phone,
      description,
      street_name,
      street_number,
      neighborhood,
      city,
      postal_code,
    })

    return reply.status(201).send({ org })
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
