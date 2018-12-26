const Validator = require('validator');
const isEmpty = require('./isEmpty');
const messages = require('../config/messages');

module.exports = function signupValidation(data) {
  let errors = {};

  data.name.first = !isEmpty(data.name.first) ? data.name.first : '';
  data.name.last = !isEmpty(data.name.last) ? data.name.last : '';
  data.username = !isEmpty(data.username) ? data.username : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (Validator.isEmpty(data.name.first)) {
    errors.first = messages.signup.required.name.first;
  }

  if (Validator.isEmpty(data.name.last)) {
    errors.last = messages.signup.required.name.last;
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = messages.signup.required.username;
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = messages.signup.required.password;
  }

  if (!Validator.isLength(data.password, { min: 5, max: 20 })) {
    errors.password = messages.signup.length.password;
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = messages.signup.required.password2;
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = messages.signup.match.password2;
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
