const Moralis = require('moralis').default

const config = require('../../../config/index.js')

const requestConfig = {
  domain: config.APP_DOMAIN,
  statement: config.statement,
  uri: config.REACT_URL,
  timeout: config.timeout,
}

const requestMessageController = async (req, res) => {
  const { address, chain, network } = req.body
  try {
    const message = await Moralis.Auth.requestMessage({
      address,
      chain,
      // network,
      ...requestConfig,
    })
    res.status(200).json(message)
  } catch (error) {
    res.status(400).json({ error: error.message })
    console.error(error)
  }
}

module.exports = requestMessageController
