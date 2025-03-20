const { sendError } = require("../services/errors");

function validateBody(schema){
    return (req, res, next) => {
        const result = schema.validate(req.body);
        if(result.error){
            sendError(res, {
                status: 400,
                code: "VALIDATION_SCHEMA",
                message: result.error.details.map((err) => err.message)[0],
            });
        } else {
            next();
        }
    };
}

module.exports = {
    validateBody
};