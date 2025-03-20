const { generateUUID } = require("../services/crypto");
const { addProduct } = require("../database/crud/products");
const { addEvent } = require("../database/crud/events");
const { addSale } = require("../database/crud/sales");
const { addSupplier } = require("../database/crud/suppliers");

async function addProduct(currentUserId, postPayload){
    const post = {
        id: generateUUID(),
        name: postPayload.name,
        type: postPayload.type,
        stock: postPayload.stock,
        cost: postPayload.cost,
        pvp: postPayload.pvp,
        notes: postPayload.notes,
        userId: currentUserId,
    };

    await addProduct(post);
}

async function addEvent(postPayload){
    const post = {
        id: generateUUID(),
        name: postPayload.name,
        date: postPayload.date,
        description: postPayload.date,
    };

    await addEvent(post);
}

async function addSale(postPayload){
    const post = {
        id: generateUUID(),
        date: postPayload.date,
        payment: postPayload.payment,
        taxes: postPayload.taxes,
        package_price: postPayload.package_price,
        shipping_price: postPayload.shipping_price,
        profit: postPayload.profit,
    }

    await addSale(post);
}

async function addSupplier(postPayload){
    const post = {
        id: generateUUID(),
        name: postPayload.name,
        contact: postPayload.contact,
    }

    await addSupplier(post);
}

module.exports = {
    addProduct,
    addEvent,
    addSale,
    addSupplier
};