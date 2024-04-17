import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import {
  AnimalAge,
  AnimalSize,
  EnergyLevel,
  IndependenceLevel,
} from '@prisma/client'
import { makeFetchPetsByCity } from '@/services/factories/make-fetch-pets-by-city'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    city: z.string(),
    page: z.coerce.number().min(1).default(1),
    age: z.nativeEnum(AnimalAge).optional(),
    size: z.nativeEnum(AnimalSize).optional(),
    energyLevel: z.nativeEnum(EnergyLevel).optional(),
    independencyLevel: z.nativeEnum(IndependenceLevel).optional(),
  })

  const { city, page, age, size, energyLevel, independencyLevel } =
    requestBodySchema.parse(request.query)

  const fetchPetsService = makeFetchPetsByCity()

  const { pets } = await fetchPetsService.execute({
    city,
    page,
    age,
    size,
    energyLevel,
    independencyLevel,
  })

  return reply.send({ pets })
}
