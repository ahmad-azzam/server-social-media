class UserController {
    static register(req, res, next) {
        try {
            res.status(200).json({ message: 'Masuuk' })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController