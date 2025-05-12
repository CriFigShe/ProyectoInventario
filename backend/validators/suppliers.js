const Joi = require("joi");

module.exports = Joi.object({
    name: Joi.string().required(),
    contact: Joi.string().required(),
    userId: Joi.string().required()
});