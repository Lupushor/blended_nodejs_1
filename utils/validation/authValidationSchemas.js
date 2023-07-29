const Joi = require('joi');

const signupValidationSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginValidationSchema = Joi.object()
  .keys({
    email: signupValidationSchema.extract('email'),
    password: signupValidationSchema.extract('password'),
  });

module.exports = {
  signupValidationSchema,
  loginValidationSchema,
};