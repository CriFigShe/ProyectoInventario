const mysql2 = require("mysql2/promise");

let pool = null;

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

function createPool(database) {
  return mysql2.createPool({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    database: database,
    password: MYSQL_PASSWORD,
  });
}

function getConection() {
  if (!pool) {
    pool = createPool(MYSQL_DATABASE);
  }
  return pool;
}

module.exports = {createPool, getConection};
