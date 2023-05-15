const { logger } = require('../../logger')

require('dotenv').config()

const ErrorHandler = (err, req, res) => {
  const errStatus = err.status || 500
  const errMessage = err.error || 'Something went wrong'
  logger.error(errMessage, { errorStack: err.stack })
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {},
  })
}

module.exports = ErrorHandler
