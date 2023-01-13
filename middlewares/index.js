const validateParams = require("./validateParams");
const validateBody = require("./validateBody");
const validateFavorite = require("./validateFavorite");
const validateRegister = require("./validateRegister");
const validateLogin = require("./validateLogin");
const authenticate = require("./authenticate");
const upload = require("./upload");
const validateVerificationEmail = require("./validateVerificationEmail");

module.exports = {
  validateParams,
  validateBody,
  validateFavorite,
  validateRegister,
  validateLogin,
  authenticate,
  upload,
  validateVerificationEmail,
};
