const Contact = require("../../models/contact");

const { HttpError } = require("../../helpers/");

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removedContact = await Contact.findByIdAndRemove(contactId);
    if (!removedContact) {
      throw HttpError(404, "Not found");
    }
    res.json({ message: "contact deleted" });
    // status:204 тело (message) не отправляет
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
