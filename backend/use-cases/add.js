const { generateUUID } = require("../services/crypto");
const { addProduct } = require("../database/crud/products");
const { addEvent } = require("../database/crud/events");
const { addSale } = require("../database/crud/sales");
const { addSupplier } = require("../database/crud/suppliers");

async function createProduct(postPayload){
    const post = {
        id: generateUUID(),
        name: postPayload.name,
        type: postPayload.type,
        stock: postPayload.stock,
        cost: postPayload.cost,
        pvp: postPayload.pvp,
        notes: postPayload.notes,
        userId: postPayload.userId,
        supplierId: postPayload.supplierId
    };

    await addProduct(post);
}

async function createEvent(postPayload){
    const post = {
        id: generateUUID(),
        name: postPayload.name,
        date: postPayload.date,
        description: postPayload.date,
        userId: postPayload.userId
    };

    await addEvent(post);
}

async function createSale(postPayload){
    console.log(postPayload);
    const post = {
        id: generateUUID(),
        date: postPayload.date,
        payment: postPayload.payment,
        taxes: postPayload.taxes,
        package_price: postPayload.package_price,
        shipping_price: postPayload.shipping_price,
        profit: postPayload.profit,
        userId: postPayload.userId
    }

    await addSale(post);
}

async function createSupplier(postPayload){
    const post = {
        id: generateUUID(),
        name: postPayload.name,
        contact: postPayload.contact,
        userId: postPayload.userId
    }

    await addSupplier(post);
}

module.exports = {
    createProduct,
    createEvent,
    createSale,
    createSupplier
};