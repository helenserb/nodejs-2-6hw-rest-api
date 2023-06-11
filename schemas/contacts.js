const Joi = require("joi");

const phoneRegexp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

const contactAddSchema = Joi.object({
  name: Joi.string()
    .required(),
  email: Joi.string()
    .required(),
  phone: Joi.string().pattern(/^[0-9]{10}$/).messages({'string.pattern.base': `Phone number must have 10 digits.`}).required(),
  favorite: Joi.boolean(),
});

const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

module.exports = {
  contactAddSchema,
  contactUpdateFavoriteSchema,
};