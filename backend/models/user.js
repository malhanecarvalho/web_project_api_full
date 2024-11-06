const mongoose = require("mongoose");
const validator = require("validator");
const isEmail = require('validator/lib/isEmail');
const { validateHash } = require('../utils/hash');
const { BadRequestError } = require("../utils/errors/apiError");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Wrong email format',
    },
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
  },

  name: {
    type: String,
    minlength: 2,
    maxlength: 30
  },

  about: {
    type: String,
    minlength: 2,
    maxlength: 30
  },

  avatar: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'URL inválida'
    }
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .then((user) => {
      if (!user) {
        throw new BadRequestError({ statusCode: 400, message: 'Senha ou e-mail incorreto' });
      }
      return {validateHash: validateHash(password, user.password), user}
    });
};

module.exports = mongoose.model('user', userSchema);