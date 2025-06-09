const mysql2 = require("mysql2/promise");

let pool = null;

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE,MYSQL_PORT } = process.env;

function createPool() {
  return mysql2.createPool({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    database: MYSQL_DATABASE,
    password: MYSQL_PASSWORD,
    port: MYSQL_PORT
  });
}

function getConection() {
  if (!pool) {
    pool = createPool(MYSQL_DATABASE);
  }
  return pool;
}

module.exports = {createPool, getConection};
