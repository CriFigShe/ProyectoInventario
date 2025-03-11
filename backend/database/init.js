require("dotenv").config();
const {createPool} = require("./connection");
const {MYSQL_DATABASE} = process.env;
const {createTables} = require("./tables");

async function initDb() {
    const pool = createPool();
    await pool.query(`DROP DATABASE IF EXISTS ${MYSQL_DATABASE}`);
    await pool.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE}`);
    await pool.query(`USE ${MYSQL_DATABASE}`);
    await createTables(pool);
    await pool.end();
}

initDb();