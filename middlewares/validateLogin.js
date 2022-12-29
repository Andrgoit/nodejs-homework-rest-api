const { HttpError } = require("../helpers");

const { loginSchema } = require("../schemas/users");

const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "Bad request");
  }
  next();
};

module.exports = validateLogin;
