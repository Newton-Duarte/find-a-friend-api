import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { create } from './create'
import { search } from './search'

export async function orgsRoutes(app: FastifyInstance) {
  app.get('/orgs', search)
  app.post('/orgs', create)
  app.post('/sessions', authenticate)
}
