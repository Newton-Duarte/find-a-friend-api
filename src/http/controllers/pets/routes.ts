import { FastifyInstance } from 'fastify'
import { create } from './create'
import { search } from './search'
import { getById } from './get-by-id'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets', search)
  app.get('/pets/:id', getById)
  app.post('/pets', create)
}
