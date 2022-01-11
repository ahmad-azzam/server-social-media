const { decodeToken } = require('../helpers/jwt');
const User = require('../models/User');

class UserController {
    static async updateUser(req, res, next) {
        try {
            const id = req.params.id
            const { username, profilePicture, coverPicture, desc, city, from } = req.body
            await User.findByIdAndUpdate(id, {
                username, profilePicture, coverPicture, desc, city, from
            })
            res.status(200).json({ message: 'Success to Update User' })
        } catch (err) {
            next(err)
        }
    }
    static async deleteUser(req, res, next) {
        try {
            const id = req.params.id
            await User.findByIdAndDelete(id)
            res.status(200).json({ message: 'Success to Delete User' })
        } catch (err) {
            next(err)
        }
    }
    static async getUser(req, res, next) {
        try {
            const id = req.params.id
            const user = await User.findById(id)
            const { password, updatedAt, createdAt, ...others } = user._doc
            res.status(200).json({ data: others })
        } catch (err) {
            next(err)
        }
    }
    static async followUser(req, res, next) {
        try {
            const { id: idUser } = req.params
            const { token } = req.headers
            const { email } = await decodeToken(token)
            const result = await User.findOne({ email })
            const idCurrentUser = result.id
            if (idUser !== idCurrentUser) {
                const user = await User.findById(idUser)
                const currentUser = await User.findById(idCurrentUser)
                if (!user.followers.includes(idCurrentUser)) {
                    await user.updateOne({ $push: { followers: idCurrentUser } })
                    await currentUser.updateOne({ $push: { following: idUser } })
                    res.status(200).json({ message: 'Success to following' })
                } else {
                    throw { name: 'Already Follow' }
                }
            } else {
                throw { name: 'Cant Follow Yourself' }
            }
        } catch (err) {
            next(err)
        }
    }
    static async unfollowUser(req, res, next) {
        try {
            const { id: idUser } = req.params
            const { token } = req.headers
            const { email } = await decodeToken(token)
            const result = await User.findOne({ email })
            const idCurrentUser = result.id
            if (idUser !== idCurrentUser) {
                const user = await User.findById(idUser)
                const currentUser = await User.findById(idCurrentUser)
                if (user.followers.includes(idCurrentUser)) {
                    await user.updateOne({ $pull: { followers: idCurrentUser } })
                    await currentUser.updateOne({ $pull: { following: idUser } })
                    res.status(200).json({ message: 'Success to unfollow' })
                } else {
                    throw { name: 'Already UnFollow' }
                }
            } else {
                throw { name: 'Cant UnFollow Yourself' }
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController