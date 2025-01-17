const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const User = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const resizeAvatar = async (avatar) => {
  Jimp.read(avatar)
    .then((image) => {
      return image.resize(250, 250).write(avatar);
    })
    .catch((error) => {
      console.log(error);
    });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const avatarName = `${_id}_${originalname}`;

  try {
    const resultUpload = path.join(avatarsDir, avatarName);
    await fs.rename(tempUpload, resultUpload);
    await resizeAvatar(resultUpload);
    const avatarURL = path.join("avatars", avatarName);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
