import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Create Org (E2E)', () => {
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
      .send({
        name: 'Cascão',
        description: 'Gato Cascão',
        type: 'CAT',
        size: 'LARGE',
        age: 'AGED',
        ambient: 'MEDIUM',
        independence_level: 'HIGH',
        energy_level: 'MEDIUM',
        organization_id: organization.id,
        adoption_requirements: [],
      })

    expect(response.statusCode).toBe(201)
  })
})
