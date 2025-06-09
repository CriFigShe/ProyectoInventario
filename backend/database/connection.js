const mysql2 = require("mysql2/promise");

let pool = null;

const { MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE,MYSQLPORT } = process.env;

function createPool(database) {
  return mysql2.createPool({
    host: MYSQLHOST,
    user: MYSQLUSER,
    database: MYSQLDATABASE,
    password: MYSQLPASSWORD,
    port: MYSQLPORT
  });
}

function getConection() {
  if (!pool) {
    pool = createPool(MYSQLDATABASE);
  }
  return pool;
}

module.exports = {createPool, getConection};
