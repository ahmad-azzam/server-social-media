const User = require('../models/User');
const { decodeToken } = require('../helpers/jwt');

async function authentication(req, res, next) {
    try {
        const { token } = req.headers
        const validToken = await decodeToken(token)
        const user = User.findOne({ email: validToken.email })
        if (!user) throw { name: 'JsonWebTokenError' }
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = { authentication }