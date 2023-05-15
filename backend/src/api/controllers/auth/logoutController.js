const logoutController = async (req, res) => {
  try {
    res.clearCookie('jwt')
    return res.sendStatus(200)
  } catch {
    return res.sendStatus(403)
  }
}

module.exports = logoutController
