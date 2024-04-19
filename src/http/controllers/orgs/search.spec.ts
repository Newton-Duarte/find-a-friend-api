import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Search Org (E2E)', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to list organizations', async () => {
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

    await request(app.server).post('/orgs').send({
      name: 'Jane Doe ORG',
      owner_name: 'Jane Doe',
      email: 'janedoe@example.com',
      password: '123456',
      phone: '82999999999',
      description: 'Org description',
      street_name: '',
      street_number: '',
      neighborhood: '',
      city: 'Maceió',
      postal_code: '57035552',
    })

    const response = await request(app.server).get('/orgs')

    expect(response.statusCode).toBe(200)
    expect(response.body.orgs).toHaveLength(2)
    expect(response.body.orgs[0]).toEqual(
      expect.objectContaining({
        name: 'John Doe ORG',
      }),
    )
    expect(response.body.orgs[1]).toEqual(
      expect.objectContaining({
        name: 'Jane Doe ORG',
      }),
    )
  })
})
