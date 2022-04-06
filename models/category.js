const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = new Schema({
  sort_no: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model('Category', categorySchema)