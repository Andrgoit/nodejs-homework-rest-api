const express = require("express");

const Joi = require("joi");

const router = express.Router();

const contacts = require("../../models/contacts");

const { HttpError } = require("../../helpers/");

// создаем правила валидации
const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
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
});

router.post("/", async (req, res, next) => {
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
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removedContact = await contacts.removeContact(contactId);

    if (!removedContact) {
      throw HttpError(404, "Not found");
    }
    res.json({ message: "contact deleted" });

    // status:204 тело (message) не отправляет
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
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
});

module.exports = router;
