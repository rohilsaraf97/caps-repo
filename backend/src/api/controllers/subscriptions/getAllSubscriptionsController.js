const mongoose = require('mongoose')
const { Subscription } = require('../../../models')

const getAllSubscriptionsController = async (req, res) => {
  const { _id } = req.userData
  const userId = mongoose.Types.ObjectId(_id)

  const subscriptions = await Subscription.find({ donor: userId }).populate({
    // deeper
    path: 'campaign',
    model: 'Campaign',
    populate: {
      // even deeper
      path: 'owner',
      model: 'User',
    },
  })
  try {
    res.send(subscriptions)
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = getAllSubscriptionsController
