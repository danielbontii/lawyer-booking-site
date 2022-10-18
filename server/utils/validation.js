const Joi = require("joi");

const validateRegistration = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/)
    .min(8)
    .max(16)
    .required()
    .messages({
      "string.pattern.base": "Please match the given password format",
    }),
  confirmPassword: Joi.ref("password"),
  userType: Joi.string().required(),
  dob: Joi.date().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  otherNames: Joi.string().allow(""),
  summary: Joi.string().max(255).allow(""),
  phoneNumber: Joi.string().required(),
}).with("password", "confirmPassword");

module.exports = {
  validateRegistration,
};
