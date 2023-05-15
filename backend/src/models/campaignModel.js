const { Schema, model } = require('mongoose')

const campaignSchema = Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnailId: { type: String, required: true },
})

const Campaign = model('Campaign', campaignSchema)

module.exports = Campaign
