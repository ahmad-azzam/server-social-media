const router = require('express').Router();
const UserController = require('../controllers/user');
const { autherization } = require('../middlewares/auth');
const { checkIdInDatabase } = require('../middlewares/checkId');


router.put('/:id', checkIdInDatabase, autherization, UserController.updateUser)
router.delete('/:id', checkIdInDatabase, autherization, UserController.deleteUser)
router.get('/:id', checkIdInDatabase, UserController.getUser)
router.put('/follow/:id', UserController.followUser)
router.put('/unfollow/:id', UserController.unfollowUser)

module.exports = router