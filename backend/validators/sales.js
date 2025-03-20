const Joi = require("joi");

module.exports = Joi.object({
    date: Joi.date().required(),
    payment: Joi.string().valid("Tarjeta", "Efectivo", "Transferencia", "Bizum").required(),
    taxes: Joi.number().required(),
    package_price: Joi.number().required(),
    shipping_price: Joi.number().required(),
    profit: Joi.number().required()
});