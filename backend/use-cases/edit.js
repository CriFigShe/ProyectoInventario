const { getUserById, updateUser } = require("../database/crud/users");
const { getProductById, updateProduct } = require("../database/crud/products");
const { getEventById, updateEvent } = require("../database/crud/events");
const { getSaleById, updateSale } = require("../database/crud/sales");
const { getSupplierById, updateSupplier } = require("../database/crud/suppliers");
const { notFound, unauthorizedUser } = require("../services/errors");

async function editUser(userId, userPayload){
    const user = await getUserById(userId);

    if(!user){
        notFound();
    }

    const updatedUser = {
        id: userId,
        name: userPayload.name || user.name,
        password: userPayload.password || user.password,
        email: userPayload.email || user.email,
    };

    await updateUser(updatedUser);
}

async function editProduct(productId, userId, payload){
    const product = await getProductById(productId);

    if(!product){
        notFound();
    }

    if(product.userId != userId){
        unauthorizedUser();
    }

    const updatedProduct = {
        id: productId,
        name: payload.name || product.name,
        type: payload.type || product.type,
        stock: payload.stock || product.stock,
        cost: payload.cost || product.cost,
        pvp: payload.pvp || product.pvp,
        notes: payload.notes || product.notes,
        userId: payload.userId,
        supplierId: payload.supplierId,
    }

    await updateProduct(updatedProduct);
}

async function editEvent(payload, eventId){
    const event = await getEventById(eventId);

    if(!event){
        notFound();
    }

    const updatedEvent = {
        id: eventId,
        name: payload.name || event.name,
        date: payload.date ||event.date,
        description: payload.description || event.description,
    }

    await updateEvent(updatedEvent);
}

async function editSale(payload, saleId){
    const sale = await getSaleById(saleId);

    if(!sale){
        notFound();
    }

    const updatedSale = {
        id: saleId,
        date: payload.date || sale.date,
        payment: payload.payment || sale.payment,
        taxes: payload.taxes || sale.taxes,
        package_price: payload.package_price || sale.package_price,
        shipping_price: payload.shipping_price || sale.shipping_price,
        profit: payload.profit || sale.profit,
    }

    await updateSale(updatedSale);
}

async function editSupplier(payload, supplierId){
    const supplier = await getSupplierById(supplierId);

    if(!supplier){
        notFound();
    }

    const updatedSupplier = {
        id: saleId,
        name: payload.name || supplier.name,
        contact: payload.contact || supplier.contact,
    }

    await updateSupplier(updatedSupplier);
}

module.exports = {
    editUser,
    editProduct,
    editEvent,
    editSale,
    editSupplier
};