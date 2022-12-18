const Contact = require("../../models/contact");

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = req.body;
  const result = await Contact.findByIdAndUpdate(contactId, updatedContact, {
    new: true,
  });
  // по умолчанию findByIdAndUpdate возвращает "старый вариант"
  // нужно добаить третьим аргументом {new:true} - тогда возвращаться будет
  // обновленный обьект
  return res.json(result);
};

module.exports = updateContact;
