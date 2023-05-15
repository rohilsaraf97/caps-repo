const { Campaign } = require('../../../models')
// const mongoose = require('mongoose')

const editCampaignController = async (req, res) => {
  const { title, description, campaignId } = req.body
  // const { _id } = req.userData
  // const userId = mongoose.Types.ObjectId(_id)

  try {
    let doc
    if (req.file)
      doc = await Campaign.findOneAndUpdate(
        { _id: campaignId },
        {
          title: title,
          description: description,
          thumbnailId: req.file.filename,
        },
        {
          new: true,
        }
      )
    else
      doc = await Campaign.findOneAndUpdate(
        { _id: campaignId },
        {
          title: title,
          description: description,
        },
        {
          new: true,
        }
      )
    // const currentUser = await User.findById(_id)
    // await currentUser.campaigns.push(newCampaign)
    // await currentUser.save()
    res.send(doc)
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = editCampaignController
