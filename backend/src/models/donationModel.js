const { Schema, model } = require('mongoose')

const donationSchema = Schema({
  donor: { type: Schema.Types.ObjectId, ref: 'User' },
  amount: {
    type: Number,
    min: [0, 'amount should be greater than 0'],
  },
  txHash: String,
  campaign: { type: Schema.Types.ObjectId, ref: 'Campaign' },
  tokenURI: String,
  NFTtxHash: String,
})

const Donation = model('Donation', donationSchema)

module.exports = Donation
