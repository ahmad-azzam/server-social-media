const router = require("express").Router();
const userRoute = require('./user');

router.use('/', userRoute)

module.exports = router

