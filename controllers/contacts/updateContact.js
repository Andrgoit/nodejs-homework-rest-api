const { HttpError } = require("../../helpers/");

// импортируем схему  валидации
const { addContactSchema } = require("../../schemas/contacts");

const contacts = require("../../models/contacts");

const updateContact = async (req, res, next) => {
  try {
    const newContact = req.body;
    const { error } = addContactSchema.validate(newContact);

    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const updatedContact = req.body;
    const result = await contacts.updateContact(contactId, updatedContact);

    if (!result) {
      throw HttpError(404, "Not found");
    }
    return res.json(result);
  } catch (error) {
    // next(error);
    return res.json({ message: "template message" });
  }
};

module.exports = updateContact;
