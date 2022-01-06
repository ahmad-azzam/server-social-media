const Post = require('../models/Post');

class PostController {
    static async createPost(req, res, next) {
        try {
            const { userId, desc, img } = req.body
            const post = new Post({
                userId, desc, img
            })
            const result = await post.save()
            res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }
    static async updatePost(req, res, next) {
        try {
            const id = req.params.id
            const { desc, img } = req.body
            await Post.findByIdAndUpdate(id, {
                desc, img
            })
            res.status(200).json({ message: 'Success to Update Post' })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = PostController