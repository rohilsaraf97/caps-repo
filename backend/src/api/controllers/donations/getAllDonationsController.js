const mongoose = require('mongoose')
const { Donation } = require('../../../models')

const getAllDonationsController = async (req, res) => {
  const { _id } = req.userData
  const userId = mongoose.Types.ObjectId(_id)

  const donations = await Donation.find({ donor: userId }).populate('campaign')
  try {
    res.send(donations)
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = getAllDonationsController
