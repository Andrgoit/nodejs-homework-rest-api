const contacts = require("../../models/contacts");

const { HttpError } = require("../../helpers/");

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);

    if (!result) {
      // первый вариант "создания" ошибки. обратить внимание на return
      // return res.status(404).json({ message: "Not found" });

      // второй вариант создания ошибки
      // const error = new Error("Not found");
      // error.status = 404;
      // throw error;

      // третий вариант создания ошибки
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    // первый вариант "создания" ошибки.
    // res.status(500).json({ message: "Server error" });

    // второй вариант создания ошибки
    // const { status = 500, message = "Server error" } = error;
    // res.status(status).json({ message });

    // третий вариант создания ошибки
    // усли в next передать error он будет искать функцию с 4мя аргументами
    // в нашем случае это в файле app.js строка 21
    next(error);
  }
};

module.exports = getContactById;
