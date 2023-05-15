const jwt = require('jsonwebtoken')
const config = require('../../../config')

const authenticateController = async (req, res) => {
  const token = req.cookies?.jwt
  if (!token) return res.sendStatus(403) // if the user did not send a jwt token, they are unauthorized

  try {
    const data = jwt.verify(token, config.AUTH_SECRET)
    res.json(data)
  } catch {
    return res.sendStatus(403)
  }
}

module.exports = authenticateController
