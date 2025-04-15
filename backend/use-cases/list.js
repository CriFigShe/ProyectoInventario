const { getProductsByUser } = require("../database/crud/products");
const { getEventsByUser } = require("../database/crud/events");
const { getSalesByUser } = require("../database/crud/sales");
const { getSuppliersByUser } = require("../database/crud/suppliers");
const { getAllUsers } = require("../database/crud/users");

async function listProducts(userId){
    const products = await getProductsByUser(userId);

    return products;
}

async function listEvents(userId){
    const events = await getEventsByUser(userId);

    return events;
}

async function listSales(userId){
    const sales = await getSalesByUser(userId);

    return sales;
}

async function listSuppliers(userId){
    const suppliers = await getSuppliersByUser(userId);

    return suppliers;
}

async function listUsers(){
    const users = await getAllUsers();

    return users;
}

module.exports = {
    listProducts,
    listEvents,
    listSales,
    listSuppliers,
    listUsers
};