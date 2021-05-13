const { User } = require('../../src/app/models')

describe('Authentication', () => {
  it('should sum two numbers', async () => {
    const user = await User.create({
      name: 'Raul Silva Bunicenha',
      email: 'raulbunicenha@gmail.com',
      password_hash: 'asdasldkajsdjsld'
    })

    console.log(user)

    expect(user.email).toBe('raulbunicenha@gmail.com')
  })
})
