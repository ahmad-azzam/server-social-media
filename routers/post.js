const PostController = require('../controllers/post')
const { checkOwnerPost } = require('../middlewares/auth')

const router = require('express').Router()

router.post('/create', PostController.createPost)
router.get('/timeline-post', PostController.timelinePost)
router.get('/:id', PostController.getPost)
router.put('/:id', checkOwnerPost, PostController.updatePost)
router.delete('/:id', checkOwnerPost, PostController.deletePost)
router.put('/:id/like', PostController.likePost)


module.exports = router