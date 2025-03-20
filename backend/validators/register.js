const Joi = require("joi");

module.exports = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
});