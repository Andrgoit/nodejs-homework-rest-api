const express = require("express");

const router = express.Router();

// импортируем middleware
const {
  validateParams,
  validateBody,
  validateFavorite,
  authenticate,
} = require("../../middlewares");

// импортируем контроллеры
const ctrl = require("../../controllers/contacts");

router.get("/", authenticate, ctrl.listContacts);

router.get("/:contactId", authenticate, validateParams, ctrl.getContactById);

router.post("/", authenticate, validateBody, ctrl.addContact);

router.delete("/:contactId", authenticate, validateParams, ctrl.removeContact);

router.put(
  "/:contactId",
  authenticate,
  validateParams,
  validateBody,
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateParams,
  validateFavorite,
  ctrl.updateContact
);

module.exports = router;
