const Joi = require("joi");

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string()
    .regex(/^(\d{3}) \d{3}-\d{4}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .required(),
});

module.exports = {
  contactAddSchema,
};