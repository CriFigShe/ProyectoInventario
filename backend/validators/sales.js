const Joi = require("joi");

module.exports = Joi.object({
    date: Joi.date().required(),
    payment: Joi.string().valid("Tarjeta", "Efectivo", "Transferencia", "Bizum").required(),
    taxes: Joi.number().precision(2).required(),
    package_price: Joi.number().precision(2).required(),
    shipping_price: Joi.number().precision(2).required(),
    profit: Joi.number().precision(2).required()
});