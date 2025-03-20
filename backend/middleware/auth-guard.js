const { notAuthenticated } = require("../services/errors");

function authGuard(req, res, next){
    if(!req.currentUser){
        notAuthenticated();
    } else {
        next();
    }
}

module.exports = {
    authGuard
};