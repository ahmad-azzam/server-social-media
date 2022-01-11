const { decodeToken } = require('../helpers/jwt');
const Post = require('../models/Post');
const User = require('../models/User');

class PostController {
    static async getPost(req, res, next) {
        try {
            const id = req.params.id
            const post = await Post.findById(id)
            res.status(200).json({ data: post })
        } catch (err) {
            next(err)
        }
    }
    static async createPost(req, res, next) {
        try {
            const { desc, img } = req.body
            const { token } = req.headers
            const validToken = await decodeToken(token)
            const user = await User.findOne({ email: validToken.email })
            const post = new Post({
                userId: user.id, desc, img
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
    static async deletePost(req, res, next) {
        try {
            const id = req.params.id
            await Post.findByIdAndDelete(id)
            res.status(200).json({ message: 'Success to Delete Post' })
        } catch (err) {
            next(err)
        }
    }
    static async likePost(req, res, next) {
        try {
            const id = req.params.id
            const { token } = req.headers
            const validToken = await decodeToken(token)
            const user = await User.findOne({ email: validToken.email })
            const post = await Post.findById(id)
            if (!post.likes.includes(user.id)) {
                await Post.findByIdAndUpdate(id, {
                    $push: {
                        likes: user.id
                    }
                })
                res.status(200).json({ message: 'The post has been liked' })
            } else {
                await Post.findByIdAndUpdate(id, {
                    $pull: {
                        likes: user.id
                    }
                })
                res.status(200).json({ message: 'The post has been unliked' })
            }
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
    static async timelinePost(req, res, next) {
        try {
            const { token } = req.headers
            const validToken = await decodeToken(token)
            const userLogin = await User.findOne({ email: validToken.email })
            console.log(userLogin.id)
            const userPost = await Post.find({ userId: userLogin.id })
            const friendPost = await Promise.all(
                userLogin.following.map(el => {
                    return Post.find({ userId: el })
                })
            )
            res.status(200).json(userPost.concat(...friendPost))
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
}

module.exports = PostController