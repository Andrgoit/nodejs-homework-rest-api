const { HttpError } = require("../helpers");
const { isValidObjectId } = require("mongoose");

const validateParams = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(HttpError(404, "Invalid id"));
  }
  next();
};

module.exports = validateParams;
