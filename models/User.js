const {Schema, model} = require('mongoose');

const schema = new Schema({
  email: {
    type: String, 
    required: true, 
    unique: true
  },
  password: {
    type: String, 
    required: true
  },
  fullname: {
    type: String,
    required: true
  },
  isActivated: {
    type: Boolean,
    default: false
  },
  activationLink: {
    type: String
  },
  roles: [{
    type: String,
    ref: 'Role'
  }]
})

module.exports = model('User', schema)