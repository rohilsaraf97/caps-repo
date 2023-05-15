const { Schema, model } = require('mongoose')

const subscriptionSchema = Schema({
  donor: { type: Schema.Types.ObjectId, ref: 'User' },
  amount: {
    type: Number,
    min: [0, 'amount should be greater than 0'],
  },
  months: {
    type: Number,
    min: [0, 'amount should be greater than 0'],
  },
  txHash: String,
  campaign: { type: Schema.Types.ObjectId, ref: 'Campaign' },
  tokenURI: String,
  NFTtxHash: String,
})

const Subscription = model('Subscription', subscriptionSchema)

module.exports = Subscription
