const { promisify } = require('util')
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) return res.status(401).json({ message: 'Token not provided' })

  const [, token] = authHeader.split('Bearer ')

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET)
    req.userId = decoded.id
    return next()
  } catch (e) {
    return res.status(401).json({ message: 'Token is not valid' })
  }
}
