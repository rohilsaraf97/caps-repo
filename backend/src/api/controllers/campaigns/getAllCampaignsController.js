const { Campaign } = require('../../../models')

const getAllCampaignsController = async (req, res) => {
  const campaigns = await Campaign.find({}).populate('owner')
  try {
    res.send(campaigns)
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = getAllCampaignsController
