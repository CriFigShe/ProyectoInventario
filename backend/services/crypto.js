const crypto = require("crypto");
const bcrypt = require("bcryptjs");

async function hashPassword(password){
    let hashedPassword = await bcrypt.hash(password, 12);
    return hashedPassword;
}

async function validatePassword(password, hash){
    let compare = await bcrypt.compare(password, hash);
    return compare;
}

function generateValidationCode() {
    let validationCode = crypto.randomInt(100000,999999);
    return validationCode;
}

function generateUUID(){
    let uuid = crypto.randomUUID();
    return uuid;
}

module.exports = {
    hashPassword,
    validatePassword,
    generateValidationCode,
    generateUUID
};