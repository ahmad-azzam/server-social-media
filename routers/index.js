const router = require("express").Router();
const userRoute = require('./user');
const authRoute = require('./auth');
const postRoute = require('./post');
const { authentication } = require("../middlewares/auth");

router.use('/', authRoute)

router.use(authentication)
router.use('/user', userRoute)
router.use('/post', postRoute)

module.exports = router

