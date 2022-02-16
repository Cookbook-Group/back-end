const mongoose = require('../db/connection')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "/image/icon_avatar.png",
    },
    coverPicture: {
        type: String,
        default:"/image/foodCover.jpeg",
    },
    googleId: String,
    isAdmin: {
        type: Boolean,
        default: false,
    },
    followers: {
        type: Array,
        default: [],
    },
    followings: {
        type: Array,
        default: [],
    },
},
{ timestamps: true }
)

const User = mongoose.model('User', userSchema)

module.exports = User