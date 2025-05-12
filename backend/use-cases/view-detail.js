const { getProductById } = require("../database/crud/products");
const { getUserById } = require("../database/crud/users");
const { getEventById } = require("../database/crud/events");
const { getSaleById } = require("../database/crud/sales");
const { getSupplierById } = require("../database/crud/suppliers");
const { notFound } = require("../services/errors");

async function viewProduct(productId){
    const product = await getProductById(productId);

    if(!product){
        notFound();
    }

    const view = {
        name: product.name,
        type: product.type,
        stock: product.stock,
        cost: product.cost,
        pvp: product.cost,
        notes: product.notes,
        userId: product.userId,
        supplierId: product.supplierId,
    }

    return view;
}

async function viewEvent(eventId){
    const event = await getEventById(eventId);

    if(!event){
        notFound();
    }

    const view = {
        name: event.name,
        date: event.date,
        description: event.description,
    }

    return view;
}

async function viewSale(saleId){
    const sale = await getSaleById(saleId);

    if(!sale){
        notFound();
    }

    const view = {
        date: sale.date,
        payment: sale.payment,
        taxes: sale.taxes,
        package_price: sale.package_price,
        shipping_price: sale.shipping_price,
        profit: sale.profit,
    }

    return view;
}

async function viewSupplier(supplierId){
    const supplier = await getSupplierById(supplierId);

    if(!supplier){
        notFound();
    }

    const view = {
        name: supplier.name,
        contact: supplier.contact,
        userId: supplier.userId
    }

    return view;
}

async function viewUserById(userId){
    const user = await getUserById(userId);

    if(!user){
        notFound();
    }

    const view = {
        id: user.id,
        name: user.name,
        password: user.password,
        email: user.email,
    }
    return view;
}

module.exports = {
    viewProduct,
    viewEvent,
    viewSale,
    viewSupplier,
    viewUserById,
};