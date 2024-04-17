import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetPetService } from '@/services/factories/make-get-pet-service'
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'

export async function getById(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = requestBodySchema.parse(request.params)

  try {
    const getPetService = makeGetPetService()

    const { pet } = await getPetService.execute({
      id,
    })
    return reply.send({ pet })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
