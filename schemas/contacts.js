const Joi = require("joi");

const phoneRegexp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

const contactAddSchema = Joi.object({
  name: Joi.string()
    .required(),
  email: Joi.string()
    .required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

module.exports = {
  contactAddSchema,
  contactUpdateFavoriteSchema,
};