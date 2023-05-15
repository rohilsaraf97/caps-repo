const express = require('express')
const Moralis = require('moralis').default
const initRoutes = require('./api')
const config = require('./config')
const loaders = require('./loaders')
const { logger } = require('./logger')
// const { User, Donation, Campaign } = require('./models')

const server = async () => {
  const app = express()

  loaders({ expressApp: app })
  initRoutes({ expressApp: app })

  await Moralis.start({
    apiKey: config.MORALIS_API_KEY,
  })

  //Making Dummy User for testing
  // await User.deleteMany()
  // await Campaign.deleteMany()
  // await Donation.deleteMany()
  // try {
  //   const testUser = await User.create({
  //     profileId: '12qwrteger',
  //   })
  //   logger.debug(testUser._id)
  //   const testCampaign = await Campaign.create({
  //     owner: testUser._id,
  //     title: 'Lorem ipsum dolor sit amet consectetur',
  //     description:
  //       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore pariatur nulla, sit perferendis itaque voluptate',
  //   })
  //   await testUser.campaigns.push(testCampaign._id)
  //   logger.debug(testCampaign)
  //   await testCampaign.populate('owner')
  //   logger.debug(testCampaign)
  //   const testDonation = await Donation.create({
  //     donor: testUser._id,
  //     amount: 12,
  //     campaign: testCampaign._id,
  //   })
  //   await testUser.donations.push(testDonation._id)
  //   await testUser.save()
  //   logger.debug(testDonation)
  //   await testDonation.populate('donor')
  //   await testDonation.populate('campaign')
  //   logger.debug(testDonation)
  //   logger.debug(testUser)
  // } catch (error) {
  //   logger.error(error)
  // }
  app.listen(config.PORT, () => {
    logger.info(`Server started at http://localhost:${config.PORT}`)
  })
}

server()
