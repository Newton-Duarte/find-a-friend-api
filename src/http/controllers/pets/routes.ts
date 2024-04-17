import { FastifyInstance } from 'fastify'
import { create } from './create'
import { search } from './search'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets', search)
  app.post('/pets', create)
}
