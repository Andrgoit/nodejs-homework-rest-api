const express = require("express");
const router = express.Router();
const {
  validateRegister,
  validateLogin,
  authenticate,
  upload,
  validateVerificationEmail,
} = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/auth");

router.post("/register", validateRegister, ctrlWrapper(ctrl.register));

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.post(
  "/verify",
  validateVerificationEmail,
  ctrlWrapper(ctrl.resendVerifyEmail)
);

router.post("/login", validateLogin, ctrlWrapper(ctrl.login));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
