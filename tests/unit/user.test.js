const bcrypt = require('bcryptjs')
const { User } = require('../../src/app/models')
const truncate = require('../utils/truncate')

describe('User', () => {
  beforeEach(async () => truncate())

  it('should encrypt user password', async () => {
    const password = '123456'
    const user = await User.create({ name: 'Raul', email: 'raulbunicenha@gmail.com', password: password })
    const result = await bcrypt.compare(password, user.password_hash)

    expect(result).toBe(true)
  })
})
