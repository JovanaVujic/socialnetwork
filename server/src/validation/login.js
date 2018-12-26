const Validator = require('validator');
const isEmpty = require('./isEmpty');
const messages = require('../config/messages');

module.exports = function loginValidation(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (Validator.isEmpty(data.username)) {
    errors.username = messages.login.required.username;
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = messages.login.required.password;
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
