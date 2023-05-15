const { Donation, User } = require('../../../models')
const mongoose = require('mongoose')
const { createNewNFT } = require('../../../services')

const addDonationController = async (req, res) => {
  const { amount, txHash, campaign_id } = req.body
  const { _id } = req.userData
  const userId = mongoose.Types.ObjectId(_id)
  const campaignId = mongoose.Types.ObjectId(campaign_id)
  const foundUser = await User.findById(userId)
  const { address } = foundUser

  try {
    const donationObj = {
      amount,
      txHash,
      donor: address,
      campaign: campaignId,
    }
    const { tokenURI, NFTtxHash } = await createNewNFT(donationObj)
    const newDonation = await Donation.create({
      ...donationObj,
      donor: userId,
      tokenURI,
      NFTtxHash,
    })
    res.send(newDonation)
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = addDonationController
