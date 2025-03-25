const { notAuthenticated } = require("../services/errors");

function authGuard(req, res, next){
    console.log(req.currentUser)
    if(!req.currentUser){
        notAuthenticated();
    } else {
        next();
    }
}

module.exports = {
    authGuard
};