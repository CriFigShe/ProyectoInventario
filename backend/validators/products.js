const Joi = require("joi");

module.exports = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().required(),
    stock: Joi.number().required(),
    cost: Joi.number().required(),
    pvp: Joi.number().required(),
    notes: Joi.number().required()
});