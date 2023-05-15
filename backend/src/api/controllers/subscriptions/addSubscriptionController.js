const { User, Subscription } = require('../../../models')
const mongoose = require('mongoose')
const { createNewNFT } = require('../../../services')

const addSubscriptionController = async (req, res) => {
  const { amount, txHash, campaign_id, months } = req.body
  const { _id } = req.userData
  const userId = mongoose.Types.ObjectId(_id)
  const campaignId = mongoose.Types.ObjectId(campaign_id)
  const foundUser = await User.findById(userId)
  const { address } = foundUser

  try {
    const subscriptionObj = {
      amount,
      txHash,
      months,
      donor: address,
      campaign: campaignId,
    }
    const { tokenURI, NFTtxHash } = await createNewNFT(subscriptionObj)
    const newSubscription = await Subscription.create({
      ...subscriptionObj,
      donor: userId,
      tokenURI,
      NFTtxHash,
    })
    res.send(newSubscription)
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = addSubscriptionController
