const request = require('supertest')
const factory = require('../factories')
const truncate = require('../utils/truncate')

const app = require('../../src/app')

describe('Authentication', () => {
  beforeEach(async () => {
    truncate()

    user = await factory.create('User', {
      password: '1231'
    })
  })

  it('should authenticate with valid credentials', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '1231'
      })

    expect(response.status).toBe(200)
  })

  it('should not authenticate with invalid email', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: `a${user.email}`,
        password: '1231'
      })

    expect(response.status).toBe(401)
  })

  it('should not authenticate with invalid password', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '321'
      })

    expect(response.status).toBe(401)
  })

  it('should return jwt token when authenticated', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '1231'
      })

    expect(response.body).toHaveProperty('token')
  })

  it('should be able to access private routes when authenticated', async () => {
    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer ${user.generateToken()}`)

    expect(response.status).toBe(200)
  })

  it('should not be able to access private routes without jwt token', async () => {
    const response = await request(app)
      .get('/dashboard')

    expect(response.status).toBe(401)
  })

  it('should not be able to access private routes with an invalid jwt token', async () => {
    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', 'Bearer 432123')

    expect(response.status).toBe(401)
  })
})
