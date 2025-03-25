const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateToken(payload){
    let secretKey = process.env.JWT_SECRET;
    let tokenJWT = jwt.sign(payload, secretKey, {
        expiresIn : "7d"
    });
    return tokenJWT;
}

function parseToken(token){
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        return payload;
    } catch {
        return null;
    }
}

module.exports = {
    generateToken,
    parseToken
};