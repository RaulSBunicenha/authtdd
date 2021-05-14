const { User } = require('../models')

class SessionControler {
  async store (req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })

    if (!user) return res.status(401).json({ message: 'User not found' })
    if (!(await user.checkPassword(password))) return res.status(401).json({ message: 'User not found' })

    const token = user.generateToken()
    res.status(200).send({ user, token })
  }
}

module.exports = new SessionControler()
