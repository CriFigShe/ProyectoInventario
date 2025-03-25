const { emailAlreadyRegistered } = require("../services/errors");
const { getUserByEmail, saveUser } = require("../database/crud/users");
const { hashPassword, generateUUID, generateValidationCode } = require("../services/crypto");
const { getTimestampMinutesFromNow } = require("../services/time");

async function registerUser(userData){
    // const oldUser = await getUserByEmail(userData.email);
    // if(oldUser){
    //     emailAlreadyRegistered();
    // }

    const hashedPassword = await hashPassword(userData.password);
    const newUserId = generateUUID();

    const user = {
        ...userData,
        id: newUserId,
        password: hashedPassword,
    };

    await saveUser(user);
}

module.exports = {
    registerUser,
};