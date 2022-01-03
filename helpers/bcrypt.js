const bcrypt = require('bcrypt');

async function hashPassword(password) {
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, Number(process.env.SALT), (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
    return hashedPassword
}

async function comparePassword(password, passwordUser) {
    const isCompare = await new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordUser, (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
    return isCompare
}

module.exports = { hashPassword, comparePassword }