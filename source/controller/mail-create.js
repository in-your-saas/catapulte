const Joi = require('joi');

const userSchema = Joi.object().keys({
  email: Joi.string().email().lowercase().required(),
  name: Joi.string(),
});

const schema = Joi.object().keys({
  from: userSchema.required(),
  template: Joi.string().uuid().required(),
  recipients: Joi.array().items(Joi.object().keys({
    to: userSchema.required(),
    substitutions: Joi.object(),
  })).min(1).required(),
}).required();

module.exports = (req, res, next) => {
  const body = Joi.validate(req.body, schema, {stripUnknown: true});
  if (body.error) return next(body.error);
  return res.status(202).send();
};
