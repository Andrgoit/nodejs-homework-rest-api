const { HttpError } = require("../helpers");

const validateParams = () => {
  const func = (req, res, next) => {
    const { contactId } = req.params;
    if (!contactId) {
      next(HttpError(400, "Bad Request"));
    }
    next();
  };
  return func;
};

module.exports = validateParams;
