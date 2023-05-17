const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    unique: true,
    require: true,
    minlength: 3,
  },
  passwordHash: String,
  blogs: Object
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    //delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)