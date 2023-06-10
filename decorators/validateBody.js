const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const missedName = error.message.split(" ")[0];
      next(HttpError(400, `missing required ${missedName} field`));
    }
    next()
  }
  return func;
};

module.exports = validateBody;