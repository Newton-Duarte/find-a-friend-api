import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getImage(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    name: z.string(),
  })

  const { name } = paramsSchema.parse(request.params)

  return reply.sendFile(name)
}
