const Joi = require("joi");

module.exports = Joi.object({
    name: Joi.string().required(),
    date: Joi.date().required(),
    description: Joi.string(),
    userId: Joi.string().required()
});