const { getConection } = require("../database/connection");

async function listSaleProducts(saleId) {
  const db = getConection();

  const [rows] = await db.execute(`
    SELECT sp.*, p.name, p.type
    FROM sales_products sp
    JOIN products p ON sp.product_id = p.id
    WHERE sp.sale_id = ?
  `, [saleId]);

  return rows;
}

module.exports = { listSaleProducts };
