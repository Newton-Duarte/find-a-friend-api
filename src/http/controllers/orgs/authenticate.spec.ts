import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Authenticate (E2E)', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to create and authenticate with an organization', async () => {
    await request(app.server).post('/orgs').send({
      name: 'John Doe ORG',
      owner_name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      phone: '82999999999',
      description: 'Org description',
      street_name: '',
      street_number: '',
      neighborhood: '',
      city: 'Maceió',
      postal_code: '57035552',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('token')
    expect(response.body.token).toEqual(expect.any(String))
  })
})
