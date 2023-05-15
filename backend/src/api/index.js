// const ErrorHandler = require('./middlewares/errorHandler')
const {
  authRouter,
  campaignRouter,
  donationRouter,
  subscriptionRouter,
} = require('./routes')
const express = require('express')
const path = require('path')

const initRoutes = ({ expressApp }) => {
  // expressApp.use('/user', User)
  expressApp.use(
    '/images',
    express.static(path.join(__dirname, '../../campaignThumbnails/'))
  )
  expressApp.use('/auth', authRouter)
  expressApp.use('/campaign', campaignRouter)
  expressApp.use('/donation', donationRouter)
  expressApp.use('/subscription', subscriptionRouter)

  // expressApp.use(ErrorHandler)
}

module.exports = initRoutes
