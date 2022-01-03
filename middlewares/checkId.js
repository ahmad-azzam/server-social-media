const User = require('../models/User');

function checkIdParams(req, res, next) {
    const id = req.params.id
    if (isNaN(id)) throw { name: 'Number Id' }
    else next()
}

async function checkIdInDatabase(id) {
    try {
        await User.findById(id)
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = { checkIdParams, checkIdInDatabase }