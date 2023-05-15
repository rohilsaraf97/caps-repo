const { Subscription } = require('../../../models')

const deleteSubscriptionController = async (req, res) => {
  const subData = req.body
  try {
    const deletedCount = await Subscription.deleteOne({ _id: subData._id })
    res.send(deletedCount)
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = deleteSubscriptionController
