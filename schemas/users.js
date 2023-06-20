const Joi = require("joi");

const userRegisterSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

module.exports = {
  userRegisterSchema,
};
