const { HttpError } = require("../helpers");

// импортируем схему  валидации
const { addContactSchema } = require("../schemas/contacts");

const validateBody = (req, res, next) => {
  const newContact = req.body;
  const { error } = addContactSchema.validate(newContact);
  if (error) {
    throw HttpError(400, error.message);
  }
  next();
};

module.exports = validateBody;
