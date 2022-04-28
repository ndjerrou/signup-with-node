const Joi = require('joi');

module.exports = function (req, res, next) {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .send({ error: true, message: error.details[0].message });
  }
  next();
};
