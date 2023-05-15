require('dotenv').config()

const config = {
  ...process.env,
  statement: 'Please sign this message to confirm your identity.',
  timeout: 60,
}

module.exports = config
