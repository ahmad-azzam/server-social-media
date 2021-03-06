const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 5
    },
    profilePicture: {
        type: String,
        default: ''
    },
    coverPicture: {
        type: String,
        default: ''
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    desc: {
        type: String,
        max: 50,
        default: ''
    },
    city: {
        type: String,
        max: 50,
        default: ''
    },
    from: {
        type: String,
        max: 50,
        default: ''
    },
    relationShip: {
        type: Number,
        enum: [1, 2, 3]
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', UserSchema)