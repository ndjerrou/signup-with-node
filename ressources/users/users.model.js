const { model, Schema } = require('mongoose');

const userSchema = {
  username: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 20,
  },
  email: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 1000,
  },
};

const User = model('User', userSchema);

module.exports = User;
