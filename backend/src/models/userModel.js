const { Schema, model } = require('mongoose')

const userSchema = Schema({
  profileId: {
    type: String,
    required: true,
    unique: true,
  },
  address: String,
})

const User = model('User', userSchema)

module.exports = User
