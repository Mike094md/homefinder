const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({

  username: {
    type: String,
    unique: true
  },
  name: String,
  lastName: String,
  email: {
    type: String,
    unique: true
  },
  passwordHash: String,
  image: String,
  properties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property'
    }
  ],
  liked: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property'
    }
  ],
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User