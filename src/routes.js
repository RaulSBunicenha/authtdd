const routes = require('express').Router()
const auth = require('./app/middleware/auth')
const SessionController = require('./app/controllers/SessionController')

routes.post('/sessions', SessionController.store)

routes.use(auth)

routes.get('/dashboard', (req, res) => {
  res.status(200).send({ message: 'Hi' })
})

module.exports = routes
