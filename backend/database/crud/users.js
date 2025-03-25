const { getConection } = require("../connection.js");

const db = getConection();


//funciona
async function saveUser(user){
    const stmt = `INSERT INTO users(id, name, password, email) VALUES (?, ?, ?, ?)`;

    await db.execute(stmt, [
        user.id,
        user.name,
        user.password,
        user.email
    ]);
}

async function getUserById(userId){
    const stmt = `SELECT * FROM users WHERE users.id = ? GROUP BY users.id`;

    const [userRows] = await db.execute(stmt, [userId]);

    if(userRows.length === 0){
        return null;
    }

    const user = userRows[0];

    return user;
}

async function updateUser(user){
    const stmt = `UPDATE users SET name = ?, password = ?, email = ? WHERE id = ?`;

    await db.execute(stmt, [
        user.name,
        user.password,
        user.email,
        user.id,
    ]);
}

async function deleteUser(userId) {
    const statement = `
    DELETE FROM users
    WHERE id = ?
    `;
    await db.execute(statement, [userId]);
}

//Funciones utilizadas en el login
async function getPassword(email){
    const stmt = `SELECT password FROM users WHERE email = ?`;

    const [rows] = await db.execute(stmt, [email]);

    return rows[0];
}

async function getUserByEmail(email) {
    const statement = `
      SELECT *
      FROM users
      WHERE users.email = ?
    `;
    const [rows] = await db.execute(statement, [email]);

    return rows[0];
}

module.exports = {
    saveUser,
    getUserById,
    getPassword,
    updateUser,
    getUserByEmail,
    deleteUser
};