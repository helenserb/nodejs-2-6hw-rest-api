const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar');
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const User = require("../models/user");
const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");

const avatarsDir = path.resolve("public", "avatars");

const signup = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, "Email in use");
    }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email)
    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
    });


    res.status(201).json({
        user: {
        email: newUser.email,
        subscription: newUser.subscription,
        }
    })
}

const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong");
    }

    const { _id: id } = user;

    const payload = {
        id,
    }

    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "23h", });
    await User.findByIdAndUpdate(id, {token})

    const { subscription } = user;
    
    res.json({
      token,
      user: {
        email,
        subscription,
      },
    });
}

const getCurrent = async (req, res) => {
    const { email, subscription} = req.user;
    res.json({
        email,
        subscription,
    })
}

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" })
    
    res.status(204).json();
}

const updateSubscriptionStatus = async (req, res) => {
  const { _id, email } = req.user;
  const user = await User.findOne({ email });
  const { subscription } = req.body;
  await User.findByIdAndUpdate(_id, { subscription: subscription });
  res.json({
    user: {
      email,
      subscription,
    },
  });
};

const updateAvatar = async (req, res) => {
    const { _id} = req.user;
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarsDir, filename);
  await Jimp.read(oldPath).then((avatar) => avatar.resize(250, 250).write(oldPath)).catch((err) => console.error(err));

  await fs.rename(oldPath, newPath);
  const avatarURL = path.join("avatars", filename);
  await User.findOneAndUpdate(_id, { avatarURL });
  res.json({
    avatarURL,
  })
}

module.exports = {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscriptionStatus: ctrlWrapper(updateSubscriptionStatus),
  updateAvatar: ctrlWrapper(updateAvatar),
};