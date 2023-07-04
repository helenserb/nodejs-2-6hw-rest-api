const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar');
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { nanoid } = require("nanoid");

const User = require("../models/user");
const { HttpError, sendEmail } = require("../helpers");
const { ctrlWrapper } = require("../decorators");

const avatarsDir = path.resolve("public", "avatars");
const { SECRET_KEY, BASE_URL } = process.env;

const signup = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, "Email in use");
    }
  const verificationToken = nanoid();
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email)
    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click to verify email</a>`,
  };

  await sendEmail(verifyEmail);

    res.status(201).json({
        user: {
        email: newUser.email,
        subscription: newUser.subscription,
        }
    })
}

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  res.json({
    message: "Verification successful",
  });
};

const resendVerify = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Click to verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verification email sent",
  });
};

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

  fs.rename(oldPath, newPath);
  const avatarURL = path.join("avatars", filename);
  await User.findOneAndUpdate(_id, { avatarURL });
  res.json({
    avatarURL,
  })
}

module.exports = {
  signup: ctrlWrapper(signup),
  verify: ctrlWrapper(verify),
  resendVerify: ctrlWrapper(resendVerify),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscriptionStatus: ctrlWrapper(updateSubscriptionStatus),
  updateAvatar: ctrlWrapper(updateAvatar),
};