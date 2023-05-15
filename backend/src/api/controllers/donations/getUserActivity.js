const mongoose = require('mongoose')
const { Donation, Subscription } = require('../../../models')

const getUserActivity = async (req, res) => {
  const { _id } = req.userData
  const userId = mongoose.Types.ObjectId(_id)

  const donations = await Donation.find({}).populate([
    {
      // deeper
      path: 'campaign',
      model: 'Campaign',
      populate: {
        // even deeper
        path: 'owner',
        model: 'User',
        match: {
          _id: userId,
        },
      },
    },
    { path: 'donor', model: 'User' },
  ])

  const donationsObj = donations.filter(function (donation) {
    return donation.campaign.owner // return only users with email matching 'type: "Gmail"' query
  })

  const subscriptions = await Subscription.find({}).populate([
    {
      // deeper
      path: 'campaign',
      model: 'Campaign',
      populate: {
        // even deeper
        path: 'owner',
        model: 'User',
        match: {
          _id: userId,
        },
      },
    },
    { path: 'donor', model: 'User' },
  ])

  const subscriptionObj = subscriptions.filter(function (subscription) {
    return subscription.campaign.owner // return only users with email matching 'type: "Gmail"' query
  })

  try {
    res.send({
      donations: donationsObj,
      subscriptions: subscriptionObj,
    })
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = getUserActivity
