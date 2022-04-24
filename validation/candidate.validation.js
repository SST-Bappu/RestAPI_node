const Joi = require("joi");
const schema = require("./schema.validation");
const candidateDataValidate = (data) => {
  const schemaValidate = Joi.object({
    fname: schema.fName.required(),
    email: schema.email.required(),
    contactno: schema.contactNo.required(),
    notice_period: schema.normalString.required(),
    exp_ctc: schema.integerNumber.required(),
  }).unknown();
  return schemaValidate.validate(data);
};

module.exports = {
  candidateDataValidate,
};
