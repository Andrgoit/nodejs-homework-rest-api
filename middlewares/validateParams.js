const { HttpError } = require("../helpers");

const validateParams = (req, res, next) => {
  console.log(req);
  const { contactId } = req.params;
  if (!contactId) {
    next(HttpError(400, "Bad Request"));
  }
  next();
};

module.exports = validateParams;
