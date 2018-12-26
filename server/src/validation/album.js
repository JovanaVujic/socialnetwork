const Validator = require('validator');
const isEmpty = require('./isEmpty');
const messages = require('../config/messages');

module.exports = function albumValidation(data) {
  let errors = {};

  data.image = !isEmpty(data.image) ? data.image : '';
  data.comment = !isEmpty(data.comment) ? data.comment : '';

  if (Validator.isEmpty(data.image)) {
    errors.image = messages.album.required.image;
  }

  if (Validator.isEmpty(data.comment)) {
    errors.comment = messages.album.required.comment;
  }

  if (!Validator.isLength(data.comment, { min: 0, max: 100 })) {
    errors.comment = messages.album.length.comment;
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
