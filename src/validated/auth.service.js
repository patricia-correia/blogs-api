const Joi = require('joi');

const validateBody = (body) =>
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate(body);

const validateNewUser = (body) =>
  Joi.object({
    displayName: Joi.string().min(8).required().messages({
      'string.min': '"displayName" length must be at least 8 characters long',
      'string.required': '"displayName" is required',
    }),
    email: Joi.string().email().required().messages({
      'string.email': '"email" must be a valid email',
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': '"password" length must be at least 6 characters long',
      'string.required': '"password" is required',
    }),
    image: Joi.string(),
  }).validate(body);

const validateBodyCategory = (body) =>
  Joi.object({
    name: Joi.string().required().messages({
      'string.required': '"name" is required',
    }),
  }).validate(body);

const error = 'Some required fields are missing';
const validatePost = (body) =>
Joi.object({
  title: Joi.string().required().messages({
    'any.required': error,
    'string.empty': error,
  }),
  content: Joi.string().required().messages({
    'any.required': error,
    'string.empty': error,
  }),
  categoryIds: Joi.array().required().messages({
    'any.required': 'one or more "categoryIds" not found',
    'array.empty': error,
  }),
}).validate(body);

module.exports = {
  validateBody,
  validateNewUser,
  validateBodyCategory,
  validatePost,
};