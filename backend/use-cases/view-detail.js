const { getProductById } = require("../database/crud/products");
const { notFound } = require("../services/errors");

async function viewProduct(productId){
    const product = await getProductById(productId);

    if(!post){
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

module.exports = {
    viewProduct,
};