const express = require("express");
const router = express.Router();
const {
  validateRegister,
  validateLogin,
  authenticate,
} = require("../../middlewares");
const ctrl = require("../../controllers/auth");

router.post("/register", validateRegister, ctrl.register);
router.post("/login", validateLogin, ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
