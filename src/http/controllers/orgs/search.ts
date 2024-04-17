import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchOrgs } from '@/services/factories/make-fetch-orgs'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const fetchOrgsService = makeFetchOrgs()

  const { orgs } = await fetchOrgsService.execute()

  return reply.send({ orgs })
}
