const Moralis = require('moralis').default

const config = require('../../../config/index.js')

const jwt = require('jsonwebtoken')
const { logger } = require('../../../logger')
const { User } = require('../../../models')

const verifyController = async (req, res) => {
  const { sign } = jwt

  try {
    const { message, signature } = req.body

    const { address, profileId } = (
      await Moralis.Auth.verify({
        message,
        signature,
        networkType: 'evm',
      })
    ).raw

    const user = { address, profileId, signature }

    // create user if not exists
    let foundUser
    foundUser = await User.findOne({ profileId: profileId })
    if (!foundUser) {
      foundUser = await User.create({
        profileId: profileId,
        address: address,
      })
      logger.debug(`New user created! ${foundUser}`)
    }

    // create JWT token
    // await foundUser.populate('donations')
    // await foundUser.populate('campaigns')

    const token = sign({ ...user, ...foundUser._doc }, config.AUTH_SECRET)

    // set JWT cookie
    res.cookie('jwt', token, {
      httpOnly: true,
    })

    res.status(200).json(foundUser)
  } catch (error) {
    res.status(400).json({ error: error.message })
    logger.error(error)
  }
}

module.exports = verifyController
