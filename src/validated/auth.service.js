const Joi = require('joi');

const validateBody = (body) =>
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate(body);

module.exports = {
  validateBody,
};