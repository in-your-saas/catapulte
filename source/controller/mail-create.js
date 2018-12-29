const Joi = require('joi');
const queue = require('../service/queue');

const schema = Joi.object()
  .keys({
    template_id: Joi.string().uuid(),
    template_name: Joi.string(),
    from: Joi.string().required(),
    to: Joi.string().required(),
    substitutions: Joi.object(),
    attachments: Joi.array().items(Joi.object().keys({
      filename: Joi.string().required(),
      cid: Joi.string().uuid().required(),
    })),
  })
  .xor('template_id', 'template_name')
  .required();

module.exports = (req, res, next) => {
  const body = Joi.validate(req.body, schema, {
    stripUnknown: {objects: true, arrays: false},
  });
  if (body.error) return next(body.error);
  return queue.add(body.value)
    .then(() => res.status(202).send())
    .catch(next);
};
