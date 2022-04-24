const db = require("../config/db-config");
const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/auth");
const Query = require("../queries/user.queries");

const User = db.users;

const login = async ({ email, password }, callback) => {
  const queryResult = await pool.query(Query.getUserByEmail, [email]);
  const user = queryResult.rows[0];
  if (user != null) {
    if (bcrypt.compareSync(password, user.password)) {
      const token = auth.generateAccessToken(email);
      return callback(null, { user, token });
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
    await pool.query(Query.registerUser, [
      data.fname,
      data.uname,
      data.username,
      data.contactno,
      data.password,
      data.clientId,
      data.is_admin,
      data.is_hr,
    ]);
    const user = await pool.query(Query.getUserByEmail, [data.username]);
    return { user: user.rows[0] };
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

module.exports = {
  login,
  signup,
};
