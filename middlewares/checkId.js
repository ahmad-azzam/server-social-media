const User = require('../models/User');

async function checkIdInDatabase(req, res, next) {
    try {
        const id = req.params.id
        const result = await User.findById(id)
        if (result) next()
        else throw { name: 'Invalid Id' }
    } catch (err) {
        next(err)
    }
}

module.exports = { checkIdInDatabase }