const Contact = require("../../models/contact");
const { HttpError } = require("../../helpers/");

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = req.body;

    const result = await Contact.findByIdAndUpdate(contactId, updatedContact, {
      new: true,
    });

    if (!result) {
      throw HttpError(404, "Not found");
    }
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusContact;
