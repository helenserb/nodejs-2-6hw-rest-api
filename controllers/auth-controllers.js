const User = require("../models/user");
const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");

const signup = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, "Email in use");
    }
    const newUser = await User.create(req.body);


    res.status(201).json({
        email: newUser.email,
        password: newUser.password,
        subscription: newUser.subscription,
    })
}

module.exports = {
    signup: ctrlWrapper(signup),
}