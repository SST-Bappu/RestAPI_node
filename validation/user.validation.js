const Joi = require("joi");

const schema = {
  fName: Joi.string()
    .trim()
    .lowercase()
    .min(2)
    .max(55)
    .regex(/^[a-z ,.'-]+$/i),
  userName: Joi.string()
    .trim()
    .lowercase()
    .min(2)
    .max(30)
    .regex(/^[a-z ,.'-]+$/i),
  email: Joi.string()
    .regex(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    .lowercase()
    .min(3)
    .max(62),
  contactNo: Joi.string(),

  password: Joi.string()
    .min(8)
    .regex(
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
    ),
};

const registerDataValidate = (data) => {
  const schemaValidate = Joi.object({
    fname: schema.fName.required(),
    uname: schema.userName.required(),
    email: schema.email.required(),
    contactno: schema.contactNo.required(),
    password: schema.password.required(),
  }).unknown();
  return schemaValidate.validate(data);
};
const loginDataValidate = (data) => {
  const schemaValidate = Joi.object({
    email: schema.email.required(),
    password: schema.password.required(),
  }).unknown();
  return schemaValidate.validate(data);
};

module.exports = {
  registerDataValidate,
  loginDataValidate,
};
