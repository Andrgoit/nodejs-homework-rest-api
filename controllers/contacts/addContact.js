const contacts = require("../../models/contacts");

const { HttpError } = require("../../helpers/");

// импортируем схему  валидации
const { addContactSchema } = require("../../schemas/contacts");

const addContact = async (req, res, next) => {
  try {
    const newContact = req.body;
    const { error } = addContactSchema.validate(newContact);

    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contacts.addContact(newContact);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
