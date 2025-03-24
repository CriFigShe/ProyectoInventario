const { getAllProducts } = require("../database/crud/products");
const { getAllEvents } = require("../database/crud/events");
const { getAllSales } = require("../database/crud/sales");

async function listProducts(){
    const products = await getAllProducts();

    return products;
}

async function listEvents(){
    const events = await getAllEvents();

    return events;
}

async function listSales(){
    const sales = await getAllSales();

    return sales;
}

module.exports = {
    listProducts,
    listEvents,
    listSales
};