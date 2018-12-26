const Validator = require('validator');
const isEmpty = require('./isEmpty');
const messages = require('../config/messages');

module.exports = function profileValidation(data) {
  let errors = {};
  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = messages.profile.invalidurl.youtube;
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = messages.profile.invalidurl.facebook;
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = messages.profile.invalidurl.twitter;
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = messages.profile.invalidurl.instagram;
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
