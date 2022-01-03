const jwt = require('jsonwebtoken');

async function signToken(payload) {
    const token = await new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.KEY_JWT, (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
    return token
}

async function decodeToken(token) {
    const isToken = await new Promise((resolve, reject) => {
        jwt.verify(token, process.env.KEY_JWT, (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
    return isToken
}

module.exports = { signToken, decodeToken }
