const bcrypt = require('bcryptjs')
const factory = require('../factories')
const truncate = require('../utils/truncate')

describe('User', () => {
  beforeEach(async () => truncate())

  it('should encrypt user password', async () => {
    const password = '123456'
    const user = await factory.create('User', { password: password })
    const result = await bcrypt.compare(password, user.password_hash)

    expect(result).toBe(true)
  })
})
