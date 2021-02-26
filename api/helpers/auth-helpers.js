const bcryptjs = require("bcryptjs");

const jwt = require("jsonwebtoken");

const jwtSecret = require("../config/secrets");

function hash(password) {
    const rounds = process.env.BCRYPT_ROUNDS || 8

    const hashedPassword = bcryptjs.hashSync(password, rounds)

    return hashedPassword
}

function makeToken(user) {
    const payload = { username: user.username, subject: user.id }
    const options = { expiresIn: "1 hour"}

    return jwt.sign(payload, jwtSecret, options)
}


module.exports = {
    hash,
    makeToken
}