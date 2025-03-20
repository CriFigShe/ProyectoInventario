function invalidCredentials(){
    throw{
        status: 400,
        code: "INVALID_CREDENTIALS",
        message: "Las credenciales son invalidas",
    };
}

function emailNotValidated() {
    throw {
        status: 400,
        code: "EMAIL_NOT_VALIDATED",
        message: "El email no ha sido validado",
    };
}

function notAuthenticated(){
    throw{
        status: 401,
        code: "NOT_AUTHENTICATED",
        message: "Debe enviar el token en el header 'Authorization'",
    };
}

function unauthorizedUser() {
    throw{
        status: 403,
        code: "UNAUTHORIZED",
        message: "El usuario no esta autorizado para hacer esta acción",
    };
}

function notFound(){
    throw{
        status: 404,
        code: "RESOUCE_NOT_FOUND",
        message: "El recurso no existe",
    };
}

function invalidValidationCode(){
    throw{
        status: 400,
        code: "INVALID_VALIDATION_CODE",
        message: "El codigo de validación no es valido",
    };
}

function sendError(res, err){
    res.status(err.status ?? 500).json({
        success: false,
        error: {
            code: err.code ?? "UNEXPECTED_ERROR",
            msg: err.message ?? "Ha ocurrido un error inesperado",
        },
    });
}

function handleAsyncError(controllerFn){
    return async (requestAnimationFrame, res, next) => {
        try{
            await controllerFn(requestAnimationFrame, res);
        } catch (error){
            next(error);
        }
    };
}

function emailAlreadyRegistered() {
    throw {
        status: 400,
        code: "EMAIL_ALREADY_REGISTERED",
        message: "El email ya está registrado",
    };
}

module.exports = {
    invalidCredentials,
    notAuthenticated,
    unauthorizedUser,
    notFound,
    invalidValidationCode,
    sendError,
    handleAsyncError,
    emailNotValidated,
    emailAlreadyRegistered
};