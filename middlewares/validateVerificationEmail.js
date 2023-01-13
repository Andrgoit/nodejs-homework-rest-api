const { HttpError } = require("../helpers");

const { verifyEmailSchema } = require("../schemas/users");

const validateVerificationEmail = (req, res, next) => {
  const { error } = verifyEmailSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "Missing required field email");
  }
  next();
};

module.exports = validateVerificationEmail;
