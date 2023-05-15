const { Campaign } = require('../../../models')
const mongoose = require('mongoose')

const addCampaignController = async (req, res) => {
  const { title, description } = req.body
  const { _id } = req.userData
  const userId = mongoose.Types.ObjectId(_id)

  try {
    const newCampaign = await Campaign.create({
      title,
      description,
      owner: userId,
      thumbnailId: req.file.filename,
    })
    // const currentUser = await User.findById(_id)
    // await currentUser.campaigns.push(newCampaign)
    // await currentUser.save()
    res.send(newCampaign)
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = addCampaignController
