const { Schema, model } = require('mongoose')

const media = new Schema({
  date: {
    type: String,
    require: true
  },
  path_file: {
    type: String,
    require: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }


})

module.exports = model('media', media)