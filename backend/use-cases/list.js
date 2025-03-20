const { getAllProducts } = require("../database/crud/products");

async function listProducts(){
    const posts = await getAllProducts();

    return posts;
}

module.exports = {
    listProducts
};