const { getProductById, deleteProduct } = require("../database/crud/products");
const { getEventById, deleteEvent } = require("../database/crud/events");
const { getSaleById, deleteSale } = require("../database/crud/sales");
const { getSupplierById, deleteSupplier } = require("../database/crud/suppliers");
const { notFound, unauthorizedUser } = require("../services/errors");
const { getUserById, deleteUser } = require("../database/crud/users");

async function removeUser(userId){
    const user = await getUserById(userId);

    if(!user){
        notFound();
    }

    await deleteUser(userId);
}

async function removeProduct(productId, userId){
    const product = await getProductById(productId);

    if(!product){
        notFound();
    }

    if(product.userId != userId){
        unauthorizedUser();
    }

    await deleteProduct(productId);
}

async function removeEvent(eventId){
    const event = await getEventById(eventId);

    if(!event){
        notFound();
    }

    await deleteEvent(eventId);
}

async function removeSale(saleId){
    const sale = await getSaleById(saleId);

    if(!sale){
        notFound();
    }

    await deleteSale(saleId);
}

async function removeSupplier(supplierId){
    const supplier = await getSupplierById(supplierId);

    if(!supplier){
        notFound();
    }

    await deleteSupplier(supplierId);
}

module.exports = {
    removeUser,
    removeProduct,
    removeEvent,
    removeSale,
    removeSupplier
};
