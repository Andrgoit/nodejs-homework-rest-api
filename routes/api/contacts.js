const express = require("express");

const router = express.Router();

// импортируем middleware
const { validateParams } = require("../../middlewares");

// импортируем контроллеры
const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.listContacts);

router.get("/:contactId", validateParams(), ctrl.getContactById);

router.post("/", ctrl.addContact);

router.delete("/:contactId", validateParams(), ctrl.removeContact);

router.put("/:contactId", validateParams(), ctrl.updateContact);

module.exports = router;
