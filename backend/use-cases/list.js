const { getAllProducts } = require("../database/crud/products");
const { getAllEvents } = require("../database/crud/events");
const { getAllSales } = require("../database/crud/sales");
const { getAllSuppliers } = require("../database/crud/suppliers");
const { getAllUsers } = require("../database/crud/users");

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

async function listSuppliers(){
    const suppliers = await getAllSuppliers();

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