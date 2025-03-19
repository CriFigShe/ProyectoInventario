const { getConection } = require("../connection.js");

const db = getConection();

async function saveUser(user){
    const stmt = `INSERT INTO users(id, name, password) VALUES (?, ?, ?)`;

    await db.execute(stmt, [
        user.id,
        user.name,
        user.password
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

async function getPassword(name){
    const stmt = `SELECT password FROM users WHERE name = ?`;

    const [rows] = await db.execute(stmt, [email]);

    return rows[0];
}

async function updateUser(user){
    const stmt = `UPDATE users SET name = ?, password = ? WHERE id = ?`;

    await db.execute(stmt, [
        user.name,
        user.password,
        user.id
    ]);
}

module.exports = {
    saveUser,
    getUserById,
    getPassword,
    updateUser
};