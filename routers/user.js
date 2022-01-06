const router = require('express').Router();
const UserController = require('../controllers/user');
const { autherization } = require('../middlewares/auth');
const { checkIdInDatabase } = require('../middlewares/checkId');


router.put('/user/:id', checkIdInDatabase, autherization, UserController.updateUser)
router.delete('/user/:id', checkIdInDatabase, autherization, UserController.deleteUser)
router.get('/user/:id', checkIdInDatabase, UserController.getUser)
router.put('/follow/:id', UserController.followUser)
router.put('/unfollow/:id', UserController.unfollowUser)

module.exports = router