const User = require('../models/User');
const { decodeToken } = require('../helpers/jwt');

async function authentication(req, res, next) {
    try {
        const { token } = req.headers
        const validToken = await decodeToken(token)
        const user = await User.findOne({ email: validToken.email })
        if (!user) throw { name: 'JsonWebTokenError' }
        next()
    } catch (err) {
        next(err)
    }
}

async function autherization(req, res, next) {
    try {
        const id = req.params.id
        const { token } = req.headers
        const validToken = await decodeToken(token)
        const userLogin = await User.findOne({ email: validToken.email })
        const user = await User.findById(id)
        if (userLogin.isAdmin) {
            next()
        } else {
            if (id == user.id) next()
            else throw { name: 'Forbidden' }
        }
    } catch (err) {
        next(err)
    }
}

module.exports = { authentication, autherization }