const { HttpError } = require("../helpers");

// импортируем схему  валидации
const { updateFavoriteSchema } = require("../schemas/contacts");

const validateFavorite = (req, res, next) => {
  const { error } = updateFavoriteSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing field favorite");
  }
  next();
};

module.exports = validateFavorite;
