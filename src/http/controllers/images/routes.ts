import { FastifyInstance } from 'fastify'
import { getImage } from './get-image'

export async function imagesRoutes(app: FastifyInstance) {
  app.get('/images/:name', getImage)
}
