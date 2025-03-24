const { getConection } = require("../connection.js");

const db = getConection();

async function addEvent(event){
    const stmt = `INSERT INTO events(id, name, date, description) VALUES (?, ?, ?, ?)`;

    await db.execute(stmt, [
        event.id,
        event.name,
        event.date,
        event.description
    ]);
}

async function deleteEvent(id){
    const stmt = `DELETE FROM events WHERE id = ?`;

    await db.execute(stmt, [
        id
    ]);
}

async function updateEvent(event){
    const stmt = `UPDATE events SET name = ?, date = ?, description = ? WHERE id = ?`;

    await db.execute(stmt, [
        event.name,
        event.date,
        event.description,
        event.id
    ]);
}

async function getEventById(eventId){
    const stmt = `SELECT * FROM events WHERE id = ? GROUP BY id`;

    const [eventRows] = await db.execute(stmt, [eventId]);

    if(eventRows.length === 0){
        return null;
    }

    const event = eventRows[0];

    return event;
}

async function getAllEvents(){
    const stmt = `SELECT * FROM events ORDER BY name DESC`;

    const [rows] = await db.execute(stmt);
    return rows;
}

module.exports = {
    addEvent,
    deleteEvent,
    updateEvent,
    getEventById,
    getAllEvents
};