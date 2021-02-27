const db = require("../../data/dbConfig");

module.exports = {
    insert,
    findBy,
    findById
}

function findBy(username) {
    return db("users")
        .where(username)
        .first()
}

function findById(id) {
    return db("users")
        .where({id})
        .first()
}

async function insert(user) {
    const [ id ] = await db("users").insert(user, "id");
    return findById(id)
}