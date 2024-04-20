import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import fs from 'node:fs'
import util from 'node:util'
import { pipeline } from 'node:stream'
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

const pump = util.promisify(pipeline)

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

  const parts = request.parts()
  const petObject = {
    name: '',
    description: '',
    type: '',
    size: '',
    age: '',
    independence_level: '',
    energy_level: '',
    ambient: '',
    organization_id: '',
    images: [] as string[],
  }

  for await (const part of parts) {
    if (part.type === 'file') {
      await pump(part.file, fs.createWriteStream(`./tmp/${part.filename}`))
      petObject.images.push(part.filename)
    } else {
      const field = part.fieldname as keyof typeof petObject
      petObject[field] = part.value as never
    }
  }

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
  } = requestBodySchema.parse(petObject)

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
      images: [...petObject.images],
    })

    return reply.status(201).send({ pet })
  } catch (err) {
    if (err instanceof PetWithoutOrganizationError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
