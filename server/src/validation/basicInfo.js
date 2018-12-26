const Validator = require('validator');
const isEmpty = require('./isEmpty');
const messages = require('../config/messages');

module.exports = function profileValidation(data) {
  let errors = {};

  data.info = !isEmpty(data.info) ? data.info : '';

  if (Validator.isEmpty(data.info)) {
    errors.info = messages.profile.required.info;
  }

  if (!Validator.isLength(data.info, { min: 0, max: 300 })) {
    errors.info = messages.profile.length.info;
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
