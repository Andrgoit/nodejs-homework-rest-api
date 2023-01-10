const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const User = require("../../models/user");
const { HttpError } = require("../../helpers/");

const register = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email);
  const hashingPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    password: hashingPassword,
    avatarURL,
  });

  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
      subscription: newUser.subscription,
      avatar: newUser.avatarURL,
    },
  });
};

module.exports = register;
