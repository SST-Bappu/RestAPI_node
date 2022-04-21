const db = require("../config/db-config");
const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/auth");
const { response } = require("express");
const cli = require("nodemon/lib/cli");

const User = db.users;
const Client = db.clients;

const login = async ({ email, password }, callback) => {
  const user = await User.findOne({ where: { username: email } });
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
  const isDuplicate = await User.findOne({ where: { username: email } });
  if (isDuplicate) {
    return null;
  } else {
    const data = {
      fname: req.body.fname,
      uname: req.body.uname,
      username: req.body.email,
      password: req.body.password,
      contactno: req.body.contactno,
      is_admin: req.body.is_admin,
      is_hr: req.body.is_hr,
      clientId: req.body.clientId,
    };
    pool.query(
      "call register_user(?,?,?,?,?,?,?,?)",
      [
        data.fname,
        data.uname,
        data.username,
        data.password,
        data.contactno,
        data.clientId,
        data.is_admin,
        data.is_hr,
      ],
      function (err, user) {
        if (err) {
          return { user: err };
        } else {
          return { user: user };
        }
      }
    );
    // const user = await User.create(data);
    // user.is_admin = req.body.is_admin || false;
    // user.is_hr = req.body.is_hr || false;
    // let client = null;
    // try {
    //   if (user.is_hr) {
    //     user.clientId = req.body.client;
    //     client = await Client.findOne({ where: { id: req.body.client } });
    //   }
    // } catch (err) {
    //   return null;
    // }
    // (user.is_active = true);
    // await user.save();
    // return { user: user };
  }
}
const findClient = (id) => {
  return;
};
module.exports = {
  login,
  signup,
};
