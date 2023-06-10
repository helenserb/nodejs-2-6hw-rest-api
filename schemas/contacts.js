const Joi = require("joi");

const phoneRegexp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

const contactAddSchema = Joi.object({
  name: Joi.string()
    .required(),
  email: Joi.string()
    .required(),
  phone: Joi.string()
    .pattern(phoneRegexp)
    .messages({"string.pattern.base": `Phone number must be in next format: (XXX) XXX-XXXX`})
    .required(),
});

module.exports = {
  contactAddSchema,
};