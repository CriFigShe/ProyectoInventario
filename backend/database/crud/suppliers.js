const { getConection } = require("../connection.js");

const db = getConection();

async function addSupplier(supplier){
    const stmt = `INSERT INTO suppliers(id, name, contact) VALUES (?, ?, ?)`;

    await db.execute(stmt, [
        supplier.id,
        supplier.name,
        supplier.contact
    ]);
}

async function deleteSupplier(id){
    const stmt = `DELETE FROM suppliers WHERE id = ?`;

    await db.execute(stmt, [
        id
    ]);
}

async function updateSupplier(supplier){
    const stmt = `UPDATE suppliers SET name = ?, contact = ? WHERE id = ?`;

    await db.execute(stmt, [
        supplier.name,
        supplier.contact,
        supplier.id
    ]);
}

async function getSupplierById(supplierId){
    const stmt = `SELECT * FROM suppliers WHERE id = ? GROUP BY id`;

    const [supplierRows] = await db.execute(stmt, [supplierId]);

    if(supplierRows.length === 0){
        return null;
    }

    const supplier = supplierRows[0];

    return supplier;
}

module.exports = {
    addSupplier,
    deleteSupplier,
    updateSupplier,
    getSupplierById
};