const Validator = require('validator');
const isEmpty = require('./isEmpty');
const messages = require('../config/messages');

module.exports = function experienceValidation(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';
  data.to = !isEmpty(data.to) ? data.to : '';

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

  if (!Validator.isEmpty(data.from) && !Validator.isEmpty(data.to) && Validator.isAfter(data.from, data.to)) {
    errors.to = messages.experience.greater.dataFrom;
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
