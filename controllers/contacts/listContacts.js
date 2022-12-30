const Contact = require("../../models/contact");

const listContacts = async (req, res, next) => {
  try {
    // настройка пагинации
    // const { page = 1, limit = 5 } = req.query;
    // const skip = (page - 1) * limit;
    // конец настройки пагинации

    const { _id: owner } = req.user;
    const result = await Contact.find(
      { owner },
      "-createdAt -updatedAt"
    ).populate("owner", "name email");

    // ответ с пагинацией
    // const result = await Contact.find({ owner }, { skip, limit }).populate(
    //   "owner",
    //   "name email"
    // );

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
