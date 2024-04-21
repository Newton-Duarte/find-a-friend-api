import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Create Pet (E2E)', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to create a pet', async () => {
    const { organization, token } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .field('name', 'Cascão')
      .field('description', 'Gato Cascão')
      .field('type', 'CAT')
      .field('size', 'LARGE')
      .field('age', 'AGED')
      .field('ambient', 'MEDIUM')
      .field('independence_level', 'HIGH')
      .field('energy_level', 'MEDIUM')
      .field('organization_id', organization.id)

    expect(response.statusCode).toBe(201)
  })
})
