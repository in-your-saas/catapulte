const Joi = require('joi');
const rabbit = require('../service/rabbit');

const schema = Joi.object().keys({
  template_id: Joi.string().uuid().required(),
  from: Joi.string().required(),
  to: Joi.string().required(),
  substitutions: Joi.object(),
  attachments: Joi.array().items(Joi.object().keys({
    filename: Joi.string().required(),
    cid: Joi.string().uuid().required(),
  })),
}).required();

module.exports = (req, res, next) => {
  const body = Joi.validate(req.body, schema, {
    stripUnknown: {objects: true, arrays: false},
  });
  if (body.error) return next(body.error);
  return rabbit.send(body.value)
    .then(() => res.status(202).send())
    .catch(next);
};
