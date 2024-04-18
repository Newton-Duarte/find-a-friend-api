import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import {
  Animal,
  AnimalAge,
  AnimalAmbient,
  AnimalSize,
  EnergyLevel,
  IndependenceLevel,
} from '@prisma/client'
import { makeCreatePetService } from '@/services/factories/make-create-pet-service'
import { PetWithoutOrganizationError } from '@/services/errors/pet-without-organization-error'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    type: z.nativeEnum(Animal),
    size: z.nativeEnum(AnimalSize),
    age: z.nativeEnum(AnimalAge),
    ambient: z.nativeEnum(AnimalAmbient),
    independence_level: z.nativeEnum(IndependenceLevel),
    energy_level: z.nativeEnum(EnergyLevel),
    organization_id: z.string().uuid(),
    adoption_requirements: z.array(z.string()).optional(),
  })

  const {
    name,
    description,
    type,
    size,
    age,
    independence_level,
    energy_level,
    ambient,
    organization_id,
    adoption_requirements,
  } = requestBodySchema.parse(request.body)

  try {
    const createPetService = makeCreatePetService()

    const { pet } = await createPetService.execute({
      name,
      description,
      type,
      size,
      age,
      independence_level,
      energy_level,
      ambient,
      organization_id,
      adoption_requirements,
    })

    return reply.status(201).send({ pet })
  } catch (err) {
    if (err instanceof PetWithoutOrganizationError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
