async function createTables(pool) {
  await pool.query(`CREATE TABLE users(
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
    )`);

  await pool.query(`CREATE TABLE suppliers(
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact TEXT NOT NULL,
    userId VARCHAR(100),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )`);

  await pool.query(`CREATE TABLE products(
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(100) NOT NULL,
    stock INT NOT NULL,
    cost FLOAT NOT NULL,
    pvp FLOAT NOT NULL,
    notes VARCHAR(255),
    userId VARCHAR(100),
    supplierId VARCHAR(100),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (supplierId) REFERENCES suppliers(id) ON DELETE CASCADE
    )`);

  await pool.query(`CREATE TABLE sales(
    id VARCHAR(100) PRIMARY KEY,
    date DATE NOT NULL,
    payment VARCHAR(100) NOT NULL,
    taxes FLOAT NOT NULL,
    package_price FLOAT NOT NULL,
    shipping_price FLOAT NOT NULL,
    profit FLOAT NOT NULL,
    userId VARCHAR(100),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )`);

  await pool.query(`CREATE TABLE product_sales(
    id VARCHAR(100) PRIMARY KEY,
    product_id VARCHAR(100),
    sales_id VARCHAR(100),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (sales_id) REFERENCES sales(id) ON DELETE CASCADE
    )`);

  await pool.query(`CREATE TABLE events(
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR (100) NOT NULL,
    date DATE NOT NULL,
    description VARCHAR(255),
    userId VARCHAR(100),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )`);
}

module.exports = { createTables };
