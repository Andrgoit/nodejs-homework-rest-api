const express = require("express");

const router = express.Router();

// импортируем middleware
const {
  validateParams,
  validateBody,
  validateFavorite,
} = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

// импортируем контроллеры
const ctrl = require("../../controllers/contacts");

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", validateParams, ctrlWrapper(ctrl.getContactById));

router.post("/", validateBody, ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", validateParams, ctrlWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  validateParams,
  validateBody,
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  validateParams,
  validateFavorite,
  ctrlWrapper(ctrl.updateContact)
);

module.exports = router;
