const UserController = require('../controllers/user');
const router = require('express').Router();

router.post('/', UserController.register)

module.exports = router