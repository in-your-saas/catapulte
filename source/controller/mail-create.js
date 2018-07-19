const Joi = require('joi');
const rabbit = require('../service/rabbit');

const schema = Joi.object().keys({
  from: Joi.string().required(),
  to: Joi.string().required(),
  substitutions: Joi.object(),
}).required();

module.exports = (req, res, next) => {
  const body = Joi.validate(req.body, schema, {stripUnknown: true});
  if (body.error) return next(body.error);
  return rabbit.send(body.value)
    .then(() => res.status(202).send())
    .catch(next);
};
