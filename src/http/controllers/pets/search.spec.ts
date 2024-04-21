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
      .field('name', 'Frajola')
      .field('description', 'Gato Frajola')
      .field('type', 'CAT')
      .field('size', 'LARGE')
      .field('age', 'AGED')
      .field('ambient', 'MEDIUM')
      .field('independence_level', 'HIGH')
      .field('energy_level', 'LOW')
      .field('organization_id', organization.id)

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
