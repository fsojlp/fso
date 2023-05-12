const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const personSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 3,
    max: 25,
    unique:true
  },
  number: {
    type: String,
    require: true,
    minlength: 8,
    max: 25
  }
})
personSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Person', personSchema)