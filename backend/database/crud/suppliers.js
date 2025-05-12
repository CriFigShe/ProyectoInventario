const { getConection } = require("../connection.js");

const db = getConection();

async function addSupplier(supplier){
    const stmt = `INSERT INTO suppliers(id, name, contact, userId) VALUES (?, ?, ?, ?)`;

    await db.execute(stmt, [
        supplier.id,
        supplier.name,
        supplier.contact,
        supplier.userId
    ]);
}

async function deleteSupplier(id){
    const stmt = `DELETE FROM suppliers WHERE id = ?`;

    await db.execute(stmt, [
        id
    ]);
}

async function updateSupplier(supplier){
    const stmt = `UPDATE suppliers SET name = ?, contact = ?, userId = ? WHERE id = ?`;

    await db.execute(stmt, [
        supplier.name,
        supplier.contact,
        supplier.userId,
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

async function getSuppliersByUser(userId){
    const stmt = `SELECT * FROM suppliers WHERE userId = ?`;

    const [suppliersRows] = await db.execute(stmt, [userId]);

    if(suppliersRows === 0){
        return null;
    }

    return suppliersRows;
}

async function getAllSuppliers(){
    const stmt = `SELECT * FROM suppliers ORDER BY name DESC`;

    const [rows] = await db.execute(stmt);
    return rows;
}

module.exports = {
    addSupplier,
    deleteSupplier,
    updateSupplier,
    getAllSuppliers,
    getSupplierById,
    getSuppliersByUser
};