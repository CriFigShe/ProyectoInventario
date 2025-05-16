const { getConection } = require ("../connection.js");

const db = getConection();

async function addProductToSale(productSale){
    const stmt = `INSERT INTO product_sales (id, product_id, sales_id) VALUES (?, ?, ?)` ;

    await db.execute(stmt, [
        productSale.id,
        productSale.product_id,
        productSale.sales_id,
    ]);
}

async function getProductsBySale(saleId){
   const stmt = `SELECT ps.*, p.name, p.type FROM product_sales ps JOIN products p ON ps.product_id = p.id WHERE ps.sales_id = ?`;

    const [rows] = await db.execute(stmt, [saleId]);
    return rows;
}

module.exports = {
    addProductToSale,
    getProductsBySale
}