const Validator = require('validator');
const isEmpty = require('./isEmpty');
const messages = require('../config/messages');

module.exports = function postValidation(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = messages.posts.length.text;
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = messages.posts.required.text;
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
