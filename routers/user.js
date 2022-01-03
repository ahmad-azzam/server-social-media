const UserController = require('../controllers/user');
const { authentication } = require('../middlewares/auth');
const { checkIdParams } = require('../middlewares/checkId');
const router = require('express').Router();

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)
router.put('/user/:id', UserController.updateUser)

module.exports = router