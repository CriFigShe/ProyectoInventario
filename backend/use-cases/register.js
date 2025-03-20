const { emailAlreadyRegistered } = require("../services/errors");
const { getUserByEmail, saveUser } = require("../database/crud/users");
const { hashPassword, generateUUID, generateValidationCode } = require("../services/crypto");
const { getTimestampMinutesFromNow } = require("../services/time");

async function registerUser(userData){
    const oldUser = await getUserByEmail(userData.email);
    if(oldUser){
        emailAlreadyRegistered();
    }

    const hashedPassword = await hashPassword(userData.password);

    const randomCode = generateValidationCode();

    const newUserId = generateUUID();

    const user = {
        ...userData,
        id: newUserId,
        password: hashedPassword,
    };

    await saveUser(user);

    const expirationTimestamp = getTimestampMinutesFromNow(5);
    const validationCode = {
        id: generateUUID(),
        userId: user.id,
        code: randomCode,
        expirationTimestamp,
    };

}

module.exports = {
    registerUser,
};