const Joi = require("joi");

const userAuthSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const userSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});

module.exports = {
  userAuthSchema,
  userSubscriptionSchema,
};
