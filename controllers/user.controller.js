const bcryptjs = require("bcryptjs");
const { response } = require("express");
const Joi = require("joi");
const userService = require("../services/user.services");
const {
  registerDataValidate,
  loginDataValidate,
} = require("../validation/user.validation");

exports.register = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({
      message: "Invalid request",
      data: req.body,
    });
  } else {
    const { error } = registerDataValidate(req.body);

    if (error) {
      res.status(400).json({
        message: "Invalid request",
        error: error.details[0].message,
      });
    } else {
      const { password } = req.body;
      const salt = bcryptjs.genSaltSync(10);
      req.body.password = bcryptjs.hashSync(password, salt);
      // bcryptjs.genSalt(10, async function (err, salt) {
      //   bcryptjs.hash(password, salt, async function (err, hash) {
      //     req.body.password = hash;
      //     console.log(hash);
      //   });
      // });
      console.log(req.body.password);
      const user = await userService.signup(req);
      if (user) {
        return res.status(200).send({
          message: "User created successfully",
          user: user,
        });
      } else {
        res.status(409).json({
          message: "There is already an user with this email",
          email: req.body.email,
        });
      }
    }
  }
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  userService.login({ email, password }, (error, result) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      message: "Success",
      data: result,
    });
  });
};

exports.userProfile = (req, res, next) => {
  return res.status(200).json({ message: "Authorized User!" });
};
