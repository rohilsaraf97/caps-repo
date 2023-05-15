const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { logger, morganMiddleware } = require('../logger')

// import { logger } from '../logger/logger.js'

const loaders = async ({ app }) => {
  try {
    app.use(
      cors({
        origin: 'http://localhost:3000',
        credentials: true,
      })
    )
    app.use(express.json())
    app.use(cookieParser())
    app.use(
      express.urlencoded({
        extended: false,
      })
    )
    app.use(morganMiddleware)
    return app
  } catch (err) {
    logger.error(err.stack)
  }
}

module.exports = loaders
