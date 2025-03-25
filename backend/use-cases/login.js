const { invalidCredentials, emailNotValidated } = require("../services/errors");
const { getUserByEmail } = require("../database/crud/users");
const { getPassword } = require("../database/crud/users");
const { validatePassword } = require("../services/crypto");
const { generateToken } = require("../services/JWT");

async function login(email, plainPassword){
    console.log(email)
    const user = await getUserByEmail(email);

    if(!user){
        invalidCredentials();
    }

    const password = await getPassword(email);

    const valid = await validatePassword(plainPassword, password.password);

    if(!valid){
        invalidCredentials();
    }

    const token = generateToken ({
        id: user.id,
        name: user.name,
        email: user.email,
    });

    return token;
}

module.exports = {
    login,
};