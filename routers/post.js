const PostController = require('../controllers/post')
const { autherization } = require('../middlewares/auth')

const router = require('express').Router()

router.post('/create', PostController.createPost)
router.put('/:id', autherization, PostController.updatePost)

module.exports = router