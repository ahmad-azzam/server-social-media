const { hashPassword, comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const User = require('../models/User');

class AuthController {
    static async register(req, res, next) {
        try {
            const { username, email, password } = req.body
            const passwordHash = await hashPassword(password)
            const user = new User({
                username,
                email,
                password: passwordHash
            })
            const result = await user.save()
            res.status(200).json({ data: result })
        } catch (err) {
            next(err)
        }
    }
    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) throw { name: 'Authentication' }
            const validPassword = await comparePassword(password, user.password)
            if (!validPassword) throw { name: 'Authentication' }
            if (user && validPassword) {
                const token = await signToken({ email: user.email })
                res.status(200).json({ token })
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = AuthController