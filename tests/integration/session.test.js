const request = require('supertest')
const truncate = require('../utils/truncate')
const factory = require('../factories')

const app = require('../../src/app')

describe('Authentication', () => {
  beforeEach(async () => truncate())

  it('should authenticate with valid credentials', async () => {
    const user = await factory.create('User')

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '1231'
      })

    expect(response.status).toBe(200)
  })

  it('should not authenticate with invalid email', async () => {
    const user = await factory.create('User')

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email + '1',
        password: '1231'
      })

    expect(response.status).toBe(401)
  })

  it('should not authenticate with invalid password', async () => {
    const user = await factory.create('User')

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '321'
      })

    expect(response.status).toBe(401)
  })

  it('should return jwt token when authenticated', async () => {
    const user = await factory.create('User')

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '1231'
      })

    expect(response.body).toHaveProperty('token')
  })
})
