const { parseToken } = require("../services/JWT");

function validateToken(req, res, next){
    const token = req.headers.authorization;
    console.log("validateToken - Authorization header:", token);

    if(token){
        const user = parseToken(token);
        if(user){
            req.currentUser = user;
        } else {
            req.currentUser = null;
        }
    } else {
        req.currentUser = null;
    }
    next();
};

module.exports = {
    validateToken
};