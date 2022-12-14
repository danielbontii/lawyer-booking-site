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

const validateLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateProfileUpdate = Joi.object({
  dob: Joi.date().allow(""),
  firstName: Joi.string().allow(""),
  lastName: Joi.string().allow(""),
  otherNames: Joi.string().allow(""),
  summary: Joi.string().max(255).allow(""),
  phoneNumber: Joi.string().allow(""),
  daily_charge: Joi.string().allow(""),
});

const validateAddReview = Joi.object({
  lawyerId: Joi.string().required(),
  reviewerId: Joi.string().required(),
  rating: Joi.number().required(),
  review: Joi.string().allow(""),
});

const validateBooking = Joi.object({
  caseTitle: Joi.string().max(255).required(),
  caseDescription: Joi.string().max(750).allow(""),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  amount: Joi.number().required(),
  clientId: Joi.string().required(),
  lawyerId: Joi.string().required()
})

module.exports = {
  validateRegistration,
  validateLogin,
  validateProfileUpdate,
  validateAddReview,
  validateBooking
};
