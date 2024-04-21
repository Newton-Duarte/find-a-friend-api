import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Get Pet By ID (E2E)', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to get a pet by id', async () => {
    const { organization, token } = await createAndAuthenticateOrg(app)

    const petResponse = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .field('name', 'Magali')
      .field('description', 'Gato Magali')
      .field('type', 'CAT')
      .field('size', 'LARGE')
      .field('age', 'YOUNG')
      .field('ambient', 'SMALL')
      .field('independence_level', 'LOW')
      .field('energy_level', 'LOW')
      .field('organization_id', organization.id)

    const petId = petResponse.body.pet.id
    const response = await request(app.server).get(`/pets/${petId}`).send()

    expect(response.statusCode).toBe(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        name: 'Magali',
      }),
    )
  })
})
