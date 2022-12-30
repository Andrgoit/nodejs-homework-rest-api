const { HttpError } = require("../../helpers/");

const getCurrent = (req, res, next) => {
  try {
    const { name, email, subscription } = req.user;
    res.json({ name, email, subscription });
  } catch {
    next(HttpError(401));
  }
};

module.exports = getCurrent;
