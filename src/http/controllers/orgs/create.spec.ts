import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Create Org (E2E)', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to create an organization', async () => {
    const response = await request(app.server).post('/orgs').send({
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

    expect(response.statusCode).toBe(201)
  })
})
