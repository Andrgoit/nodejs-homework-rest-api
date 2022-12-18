const Contact = require("../../models/contact");

const listContacts = async (req, res, next) => {
  try {
    const result = await Contact.find({});

    // const result = await Contact.find({}, "name email phone");
    // если после пустого объекта передать строку с перечнем полей, то только эти поля будут возвращены в ответе
    // const result = await Contact.find({}, "-email -phone"); - в таком случае в ответе придут все поля,
    // кроме указанный с тирэ "-"

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;
