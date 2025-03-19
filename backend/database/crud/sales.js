const { getConection } = require("../connection.js");

const db = getConection();

async function addSale(sale){
    const stmt = `INSERT INTO sales(id, date, payment, taxes, package_price, shipping_price, profit) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    await db.execute(stmt, [
        sale.id,
        sale.date,
        sale.payment,
        sale.taxes,
        sale.package_price,
        sale.shipping_price,
        sale.profit
    ]);
}

async function deleteSale(id){
    const stmt = `DELETE FROM sales WHERE id = ?`;

    await db.execute(stmt, [id]);
}

async function updateSale(sale){
    const stmt = `UPDATE sales SET date = ?, payment = ?, taxes = ?, package_price = ?, shipping_price = ?, profit = ? WHERE id = ?`;

    await db.execute(stmt, [
        sale.date,
        sale.payment,
        sale.taxes,
        sale.package_price,
        sale.shipping_price,
        sale.profit,
        sale.id
    ]);
}

async function getSaleById(id){
    const stmt = `SELECT * FROM sales WHERE id = ? GROUP BY id`;

    const [saleRows] = await db.execute(stmt, [id]);

    if(saleRows === 0){
        return null;
    }

    const sale = saleRows[0];

    return sale;
}

module.exports = {
    addSale,
    deleteSale,
    updateSale,
    getSaleById
};