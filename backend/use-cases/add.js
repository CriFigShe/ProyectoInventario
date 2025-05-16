const { generateUUID } = require("../services/crypto");
const { addProduct } = require("../database/crud/products");
const { addEvent } = require("../database/crud/events");
const { addSale } = require("../database/crud/sales");
const { addSupplier } = require("../database/crud/suppliers");

async function createProduct(postPayload) {
  const post = {
    id: generateUUID(),
    name: postPayload.name,
    type: postPayload.type,
    stock: postPayload.stock,
    cost: postPayload.cost,
    pvp: postPayload.pvp,
    notes: postPayload.notes,
    userId: postPayload.userId,
    supplierId: postPayload.supplierId,
  };

  await addProduct(post);
}

async function createEvent(postPayload) {
  const post = {
    id: generateUUID(),
    name: postPayload.name,
    date: postPayload.date,
    description: postPayload.date,
    userId: postPayload.userId,
  };

  await addEvent(post);
}

async function createSale(postPayload) {
  const post = {
    id: generateUUID(),
    date: postPayload.date,
    payment: postPayload.payment,
    taxes: postPayload.taxes,
    package_price: postPayload.package_price,
    shipping_price: postPayload.shipping_price,
    profit: postPayload.profit,
    userId: postPayload.userId,
  };

  await addSale(post);

  for (const productId of postPayload.products) {
    console.log("Insertando relación venta-producto:", sale.id, productId);
    await addSaleProduct(sale.id, productId);
  }
}

async function createSupplier(postPayload) {
  const post = {
    id: generateUUID(),
    name: postPayload.name,
    contact: postPayload.contact,
    userId: postPayload.userId,
  };

  await addSupplier(post);
}

async function addSaleProduct(saleId, productId) {
  const stmt = `INSERT INTO product_sales (sale_id, product_id) VALUES (?, ?)`;
  await db.execute(stmt, [saleId, productId]);
}

module.exports = {
  createProduct,
  createEvent,
  createSale,
  createSupplier,
};
