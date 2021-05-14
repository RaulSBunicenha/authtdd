const { factory } = require('factory-girl')
const { User } = require('../src/app/models')

factory.define('User', User, {
  name: 'Raul',
  email: 'raulbunicenha@gmail.com',
  password: '1231'
})

module.exports = factory
