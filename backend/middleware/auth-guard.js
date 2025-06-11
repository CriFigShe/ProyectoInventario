const { notAuthenticated } = require("../services/errors");

function authGuard(req, res, next){
    console.log("llego al authguard")

    if(!req.currentUser){
        console.log(req.currentUser)
        notAuthenticated();
    } else {
        next();
    }
}

module.exports = {
    authGuard
};