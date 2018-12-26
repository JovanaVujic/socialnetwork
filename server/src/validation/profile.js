const Validator = require('validator');
const isEmpty = require('./isEmpty');
const messages = require('../config/messages');

module.exports = function profileValidation(data) {
  let errors = {};

  data.info = !isEmpty(data.info) ? data.info : '';

  if (Validator.isEmpty(data.info)) {
    errors.info = messages.profile.required.info;
  }

  if (!Validator.isLength(data.info, { max: 300 })) {
    errors.info = messages.profile.length.info;
  }

  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';
  data.to = !isEmpty(data.to) ? data.to : '';

  data.validateExperience = data.validateExperience == 'true' ? true : false;
  data.validateSocials = data.validateSocials == 'true' ? true : false;

  if (data.validateExperience) {
    if (Validator.isEmpty(data.title)) {
      errors.title = messages.experience.required.title;
    }

    if (Validator.isEmpty(data.company)) {
      errors.company = messages.experience.required.company;
    }

    if (Validator.isEmpty(data.from)) {
      errors.from = messages.experience.required.from;
    }

    if (!data.current) {
      if (Validator.isEmpty(data.to)) {
        errors.to = messages.experience.required.to;
      }
    }
  }

  if (data.validateSocials) {
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
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
