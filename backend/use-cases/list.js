const { getAllProducts } = require("../database/crud/products");
const { getAllEvents } = require("../database/crud/events");

async function listProducts(){
    const products = await getAllProducts();

    return products;
}

async function listEvents(){
    const events = await getAllEvents();

    return events;
}

module.exports = {
    listProducts,
    listEvents
};