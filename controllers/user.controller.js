const bcryptjs = require("bcryptjs");
const Joi = require("joi");
const userService = require("../services/user.services");
const db = require("../config/db-config");

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
      const result = await userService.signup(req);
      if (result) {
        return res.status(200).send({
          message: "User created successfully",
          account: {
            user: result.user,
            client: result.client,
          },
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
  const { error } = loginDataValidate(req.body);

  if (error) {
    res.status(400).json({
      message: "Invalid request",
      error: error.details[0].message,
    });
  }
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
