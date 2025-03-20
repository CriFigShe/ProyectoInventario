const { getConection } = require("../connection.js");

const db = getConection();

async function addProduct(product){
    const stmt = `INSERT INTO products(id, name, type, stock, cost, pvp, notes, userId, supplierId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    await db.execute(stmt, [
        product.id,
        product.name,
        product.type,
        product.stock,
        product.cost,
        product.pvp,
        product.notes,
        product.userId,
        product.supplierId
    ]);
}

async function deleteProduct(id){
    const stmt = `DELETE FROM products WHERE id = ?`;

    await db.execute(stmt, [id]);
}

async function updateProduct(product){
    const stmt = `UPDATE products SET name = ?, type = ?, stock = ?, cost = ?, pvp = ?, notes = ?, userId = ?, supplierId = ? WHERE id = ?`;

    await db.execute(stmt, [
        product.name,
        product.type,
        product.stock,
        product.cost,
        product.pvp,
        product.notes,
        product.userId,
        product.supplierId,
        product.id
    ]);
}

async function getProductById(id){
    const stmt = `SELECT * FROM products WHERE id = ?`;

    const [productRows] = await db.execute(stmt, [id]);

    if(productRows === 0){
        return null;
    }

    const product = productRows[0];

    return product;
}

async function getAllProducts(){
    const stmt = `SELECT * FROM products ORDER BY name DESC`;

    const [rows] = await db.execute(stmt);
    return rows;
}

module.exports = {
    addProduct,
    deleteProduct,
    updateProduct,
    getProductById,
    getAllProducts
};