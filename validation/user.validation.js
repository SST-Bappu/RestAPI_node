const Joi = require("joi");
const schema = require("./schema.validation");
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
