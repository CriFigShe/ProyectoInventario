const Joi = require("joi");

module.exports = Joi.object({
    name: Joi.string(),
    password: Joi.string(),
    email: Joi.string()
});