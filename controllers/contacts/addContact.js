const Contact = require("../../models/contact");

const addContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const newContact = req.body;
  const result = await Contact.create({ ...newContact, owner });
  return res.status(201).json(result);
};

module.exports = addContact;
