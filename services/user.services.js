const db = require("../config/db-config");
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/auth");
const { response } = require("express");

const User = db.users;
const Client = db.clients;

const login = async ({ email, password }, callback) => {
  const user = await User.findOne({ where: { email: email } });
  if (user != null) {
    if (bcrypt.compareSync(password, user.password)) {
      const token = auth.generateAccessToken(email);
      return callback(null, { ...user.toJSON(), token });
    } else {
      return callback({
        message: "Invalid Username/Password",
      });
    }
  } else {
    return callback({
      message: "Invalid Username/Password!",
    });
  }
};

async function signup(req, res, callback) {
  const { email } = req.body;
  const isDuplicate = await User.findOne({ where: { email: email } });
  if (isDuplicate) {
    return null;
  } else {
    const data = {
      fname: req.body.fname,
      uname: req.body.uname,
      email: req.body.email,
      password: req.body.password,
      contactno: req.body.contactno,
    };

    const user = await User.create(data);
    user.is_active = true;
    await user.save();
    return user;
  }
}
module.exports = {
  login,
  signup,
};
