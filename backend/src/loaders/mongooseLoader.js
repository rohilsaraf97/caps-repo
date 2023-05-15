const mongoose = require('mongoose')
const config = require('../config')

const mongooseLoader = async () => {
  const connection = await mongoose.connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: config.MONGO_USER,
    pass: config.MONGO_PASS,
  })
  return connection.connection.db
}
module.exports = mongooseLoader
