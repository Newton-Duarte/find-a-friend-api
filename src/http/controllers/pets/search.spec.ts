import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Search Pet (E2E)', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to list pets by city', async () => {
    const { organization, token } = await createAndAuthenticateOrg(app)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Frajola',
        description: 'Gato Frajola',
        type: 'CAT',
        size: 'LARGE',
        age: 'AGED',
        ambient: 'MEDIUM',
        independence_level: 'HIGH',
        energy_level: 'LOW',
        organization_id: organization.id,
        adoption_requirements: [],
      })

    const response = await request(app.server)
      .get('/pets')
      .query({
        city: organization.city,
      })
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'Frajola',
      }),
    ])
  })
})
